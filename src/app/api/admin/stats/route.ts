import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
import { Purchase } from "@/models/Purchase";
import { Coupon } from "@/models/Coupon";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    // 1. Total Revenue (from completed payments)
    const completedPayments = await Payment.find({ status: "completed" });
    const totalRevenue = completedPayments.reduce((acc, curr) => acc + curr.amount, 0);

    // 2. Monthly Revenue
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyPayments = await Payment.find({
      status: "completed",
      createdAt: { $gte: startOfMonth },
    });
    const monthlyRevenue = monthlyPayments.reduce((acc, curr) => acc + curr.amount, 0);

    // 3. Total Users (count role === "user")
    const totalUsers = await User.countDocuments({ role: "user" });

    // 4. Total Purchases
    const totalPurchases = await Purchase.countDocuments();

    // 5. Active Coupons
    const activeCoupons = await Coupon.countDocuments({ active: true, expiryDate: { $gte: now } });

    // 6. Daily revenue chart data (past 7 days)
    const dailyRevenueData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
      const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);

      const dayPayments = await Payment.find({
        status: "completed",
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      });
      const dayAmount = dayPayments.reduce((acc, curr) => acc + curr.amount, 0);

      dailyRevenueData.push({
        date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        amount: dayAmount,
      });
    }

    return NextResponse.json({
      totalRevenue,
      monthlyRevenue,
      totalUsers,
      totalPurchases,
      activeCoupons,
      dailyRevenueData,
    });
  } catch (error: any) {
    console.error("Stats API error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
