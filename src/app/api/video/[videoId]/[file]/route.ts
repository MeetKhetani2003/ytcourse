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
  segmentData: { params: Promise<{ videoId: string; file: string }> }
) {
  try {
    const { videoId, file } = await segmentData.params;

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

    // Resolve local HLS file path
    // Format is storage/videos/<videoId>/<file>
    // e.g. storage/videos/video-3/master.m3u8 or storage/videos/video-3/master0.ts
    const videoFilePath = path.join(process.cwd(), "storage", "videos", videoId, file);

    if (!fs.existsSync(videoFilePath)) {
      // If someone tries to access standard .mp4 while we only have HLS now
      return new NextResponse("File not found on disk", { status: 404 });
    }

    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
    const ext = path.extname(videoFilePath).toLowerCase();
    
    let contentType = "application/octet-stream";
    if (ext === ".m3u8") {
      contentType = "application/vnd.apple.mpegurl";
    } else if (ext === ".ts") {
      contentType = "video/MP2T";
    }

    const fileStream = fs.createReadStream(videoFilePath);
    const stream = require('stream').Readable.toWeb(fileStream) as ReadableStream;

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": contentType,
        // Cache segments for 1 year, playlists for a short time
        "Cache-Control": ext === ".ts" ? "public, max-age=31536000" : "no-cache",
        "Access-Control-Allow-Origin": "*", // Important for hls.js sometimes if external, though we are same-origin
      },
    });

  } catch (error: any) {
    console.error("Video stream error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
