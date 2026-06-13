import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connectDB from "@/lib/db";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
import { Purchase } from "@/models/Purchase";
import { Coupon } from "@/models/Coupon";
import { course } from "@/config/courseConfig";

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL || process.env.EMAIL_USER || "",
    pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASS || "",
  },
});

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ message: "Missing required signature fields" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ message: "Razorpay secret key not configured" }, { status: 500 });
    }

    // Verify HMAC signature
    const shasum = crypto.createHmac("sha256", keySecret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      // Mark matching payment as failed if order ID exists
      await connectDB();
      await Payment.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { status: "failed" });
      return NextResponse.json({ message: "Invalid signature, payment verification failed" }, { status: 400 });
    }

    await connectDB();

    // Find the pending payment
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id, status: "pending" });
    if (!payment) {
      // Check if it was already verified in a race condition
      const verifiedPayment = await Payment.findOne({ razorpayOrderId: razorpay_order_id, status: "completed" });
      if (verifiedPayment) {
        return NextResponse.json({ success: true, message: "Payment already verified" });
      }
      return NextResponse.json({ message: "Payment record not found or already processed" }, { status: 404 });
    }

    // Update payment record
    payment.status = "completed";
    payment.razorpayPaymentId = razorpay_payment_id;
    await payment.save();

    // Assign course to user
    const user = await User.findById(payment.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.purchasedCourses.includes(payment.courseId)) {
      user.purchasedCourses.push(payment.courseId);
      await user.save();
    }

    // Create Purchase record
    const purchase = await Purchase.create({
      userId: user._id,
      courseId: payment.courseId,
      amount: payment.amount,
      paymentId: razorpay_payment_id,
      phone: payment.phone,
      city: payment.city,
      stateName: payment.stateName,
      pincode: payment.pincode,
      gstin: payment.gstin,
      purchasedAt: new Date(),
    });

    // Update coupon usage count if applied
    if (payment.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: payment.couponCode.toUpperCase() },
        { $inc: { usageCount: 1 } }
      );
    }

    // Attempt to send Invoice Email
    try {
      const emailUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
      if (emailUser) {
        const couponDisplay = payment.couponCode ? payment.couponCode : "None";
        const originalPrice = course.price;
        const discountAmount = originalPrice - payment.amount;

        const addressLine = [payment.city, payment.stateName, payment.pincode].filter(Boolean).join(", ");

        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Invoice - ${course.title}</title>
              <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0A0B1A; color: #ffffff; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 30px auto; background: #15172C; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                .header { background: linear-gradient(135deg, #FF6A00 0%, #FF8C00 100%); padding: 30px; text-align: center; }
                .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: bold; }
                .content { padding: 30px; }
                .greeting { font-size: 16px; line-height: 1.5; color: #e2e8f0; margin-bottom: 20px; }
                .table { w-full; border-collapse: collapse; margin: 20px 0; }
                .table th, .table td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: #e2e8f0; }
                .table th { font-weight: bold; color: #94a3b8; }
                .total-row td { font-weight: bold; font-size: 18px; color: #FF6A00; }
                .button-container { text-align: center; margin-top: 30px; }
                .btn { display: inline-block; padding: 12px 30px; background: #FF6A00; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; }
                .footer { padding: 20px 30px; background: rgba(0, 0, 0, 0.2); text-align: center; font-size: 12px; color: #64748b; border-t: 1px solid rgba(255, 255, 255, 0.05); }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Payment Receipt & Invoice</h1>
                </div>
                <div class="content">
                  <p class="greeting">Hi ${user.name},</p>
                  <p class="greeting">Thank you for enrolling in the <strong>${course.title}</strong>! Your payment was verified successfully and your course access has been granted.</p>
                  
                  <table style="width: 100%;" class="table">
                    <tr>
                      <th>Description</th>
                      <th style="text-align: right;">Amount</th>
                    </tr>
                    <tr>
                      <td>${course.title} (Lifetime Access)</td>
                      <td style="text-align: right;">₹${originalPrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Discount (Coupon: ${couponDisplay})</td>
                      <td style="text-align: right;">-₹${discountAmount.toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                      <td>Total Paid</td>
                      <td style="text-align: right;">₹${payment.amount.toFixed(2)}</td>
                    </tr>
                  </table>

                  <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                    <strong>Billed To:</strong><br/>
                    Name: ${user.name}<br/>
                    Email: ${user.email}<br/>
                    Phone: ${payment.phone || "N/A"}<br/>
                    ${addressLine ? `Address: ${addressLine}<br/>` : ""}
                    ${payment.gstin ? `GSTIN/Tax ID: ${payment.gstin}<br/>` : ""}
                  </div>

                  <div style="margin-top: 15px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                    <strong>Transaction Info:</strong><br/>
                    Order ID: ${razorpay_order_id}<br/>
                    Payment ID: ${razorpay_payment_id}<br/>
                    Date: ${purchase.purchasedAt.toLocaleDateString()}<br/>
                  </div>


                  <div class="button-container">
                    <a href="http://localhost:3000/course/${course.slug}" class="btn">Go to Course Dashboard</a>
                  </div>
                </div>
                <div class="footer">
                  <p>If you have any questions, feel free to reply directly to this email or contact support.</p>
                  <p>&copy; 2026 YouTube Masterclass. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"YouTube Masterclass" <${emailUser}>`,
          to: user.email,
          subject: `Invoice & Enrollment Confirmation - ${course.title}`,
          html: htmlContent,
        });
      }
    } catch (emailErr) {
      // Log error but don't fail verification since user has already paid and access was granted
      console.error("Failed to send invoice email:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and access granted successfully",
    });
  } catch (error: any) {
    console.error("Signature verification error:", error);
    return NextResponse.json({ message: "Verification failed", error: error.message }, { status: 500 });
  }
}
