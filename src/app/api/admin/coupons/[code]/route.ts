import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/adminAuth";
import connectDB from "@/lib/db";
import { Coupon } from "@/models/Coupon";

// PUT edit coupon
export async function PUT(
  req: Request,
  segmentData: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await segmentData.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET || "some-fallback-secret-for-admin-session";
    const isAuthenticated = await verifyAdminToken(token, secret);
    
    if (!isAuthenticated) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { title, discountAmount, startDate, expiryDate, active } = await req.json();

    await connectDB();

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    if (title !== undefined) coupon.title = title;
    if (discountAmount !== undefined) coupon.discountAmount = discountAmount;
    if (startDate !== undefined) coupon.startDate = new Date(startDate);
    if (expiryDate !== undefined) coupon.expiryDate = new Date(expiryDate);
    if (active !== undefined) coupon.active = active;

    await coupon.save();
    return NextResponse.json(coupon);
  } catch (error: any) {
    console.error("PUT coupon error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

// DELETE coupon
export async function DELETE(
  req: Request,
  segmentData: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await segmentData.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET || "some-fallback-secret-for-admin-session";
    const isAuthenticated = await verifyAdminToken(token, secret);
    
    if (!isAuthenticated) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const result = await Coupon.findOneAndDelete({ code: code.toUpperCase() });

    if (!result) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Coupon deleted successfully" });
  } catch (error: any) {
    console.error("DELETE coupon error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
