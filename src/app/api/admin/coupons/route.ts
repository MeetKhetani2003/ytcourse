import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Coupon } from "@/models/Coupon";

// GET all coupons
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return NextResponse.json(coupons);
  } catch (error: any) {
    console.error("GET coupons error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST create coupon
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { code, title, discountAmount, startDate, expiryDate, active } = await req.json();

    if (!code || !title || discountAmount === undefined || !startDate || !expiryDate) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return NextResponse.json({ message: "Coupon code already exists" }, { status: 400 });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      title,
      discountAmount,
      startDate: new Date(startDate),
      expiryDate: new Date(expiryDate),
      active: active !== undefined ? active : true,
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error: any) {
    console.error("POST coupon error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
