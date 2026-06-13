import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { course } from "@/config/courseConfig";

export async function GET(
  req: NextRequest,
  segmentData: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await segmentData.params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Connect to DB and verify if the user has purchased the course
    await connectDB();
    const dbUser = await User.findById(session.user.id);
    if (!dbUser || !dbUser.purchasedCourses.includes(course.id)) {
      return new NextResponse("Forbidden - Course not purchased", { status: 403 });
    }

    // Find video in course config
    let targetVideo = null;
    for (const mod of course.modules) {
      const found = mod.videos.find((v) => v.id === videoId);
      if (found) {
        targetVideo = found;
        break;
      }
    }

    if (!targetVideo) {
      return new NextResponse("Video not found in course modules", { status: 404 });
    }

    // Resolve local video path
    const videoFilePath = path.join(process.cwd(), "storage", "videos", targetVideo.videoUrl);

    if (!fs.existsSync(videoFilePath)) {
      return new NextResponse("Video file not found on disk", { status: 404 });
    }

    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
    const range = req.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return new NextResponse("Requested range not satisfiable", {
          status: 416,
          headers: { "Content-Range": `bytes */${fileSize}` },
        });
      }

      const chunksize = end - start + 1;
      const fileStream = fs.createReadStream(videoFilePath, { start, end });

      const stream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(stream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "video/mp4",
        },
      });
    } else {
      const fileStream = fs.createReadStream(videoFilePath);
      const stream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(stream, {
        status: 200,
        headers: {
          "Content-Length": fileSize.toString(),
          "Content-Type": "video/mp4",
        },
      });
    }
  } catch (error: any) {
    console.error("Video stream error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
