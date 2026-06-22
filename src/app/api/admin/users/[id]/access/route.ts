import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/adminAuth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Purchase } from "@/models/Purchase";

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET || "some-fallback-secret-for-admin-session";
    const isAuthenticated = await verifyAdminToken(token, secret);
    
    if (!isAuthenticated) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { courseId, action } = body;
    
    if (!courseId || !action || !["grant", "revoke"].includes(action)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (action === "grant") {
      if (!user.purchasedCourses.includes(courseId)) {
        user.purchasedCourses.push(courseId);
        await user.save();
        
        await Purchase.create({
            userId: user._id,
            courseId,
            amount: 0,
            paymentId: `manual_admin_${Date.now()}`
        });
      }
    } else if (action === "revoke") {
      user.purchasedCourses = user.purchasedCourses.filter((id: string) => id !== courseId);
      await user.save();
      
      // We can also remove the manual purchases or all purchases for this course,
      // but modifying user.purchasedCourses is sufficient for access control.
      await Purchase.deleteMany({ userId: user._id, courseId });
    }

    return NextResponse.json({ message: "Success", purchasedCourses: user.purchasedCourses });
  } catch (error: any) {
    console.error("Admin user access error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
