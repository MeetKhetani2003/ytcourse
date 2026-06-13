import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Coupon } from "@/models/Coupon";
import { course } from "@/config/courseConfig";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: "Coupon code is required" }, { status: 400 });
    }

    await connectDB();

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Coupon code not found" }, { status: 404 });
    }

    if (!coupon.active) {
      return NextResponse.json({ valid: false, message: "Coupon is inactive" }, { status: 400 });
    }

    const now = new Date();
    if (now < coupon.startDate) {
      return NextResponse.json({ valid: false, message: "Coupon promotion has not started yet" }, { status: 400 });
    }

    if (now > coupon.expiryDate) {
      // Dynamic deactivation if expired
      if (coupon.active) {
        coupon.active = false;
        await coupon.save();
      }
      return NextResponse.json({ valid: false, message: "Coupon has expired" }, { status: 400 });
    }

    const discount = coupon.discountAmount;
    const finalPrice = Math.max(0, course.price - discount);

    return NextResponse.json({
      valid: true,
      title: coupon.title,
      originalPrice: course.price,
      discount,
      finalPrice,
    });
  } catch (error: any) {
    console.error("Coupon apply error:", error);
    return NextResponse.json({ valid: false, message: "Internal server error" }, { status: 500 });
  }
}
