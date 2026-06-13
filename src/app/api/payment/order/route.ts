import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Razorpay from "razorpay";
import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { Payment } from "@/models/Payment";
import { Coupon } from "@/models/Coupon";
import { User } from "@/models/User";
import { course } from "@/config/courseConfig";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { couponCode, phone, city, stateName, pincode, gstin } = await req.json();

    await connectDB();

    // Double check database if course is already purchased
    const dbUser = await User.findById(session.user.id);
    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (dbUser.purchasedCourses.includes(course.id)) {
      return NextResponse.json({ message: "Course already purchased" }, { status: 400 });
    }

    let discount = 0;
    let validCouponCode = undefined;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), active: true });
      if (coupon) {
        const now = new Date();
        if (now >= coupon.startDate && now <= coupon.expiryDate) {
          discount = coupon.discountAmount;
          validCouponCode = coupon.code;
        }
      }
    }

    const finalPrice = Math.max(0, course.price - discount);

    // Create Razorpay Order
    const options = {
      amount: finalPrice * 100, // amount in paise
      currency: "INR",
      receipt: `rcpt_${dbUser._id.toString().slice(-8)}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Create a pending Payment record
    await Payment.create({
      userId: dbUser._id,
      courseId: course.id,
      amount: finalPrice,
      couponCode: validCouponCode,
      razorpayOrderId: order.id,
      status: "pending",
      phone,
      city,
      stateName,
      pincode,
      gstin,
    });


    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json({ message: "Failed to create order", error: error.message }, { status: 500 });
  }
}
