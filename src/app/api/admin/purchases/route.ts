import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Purchase } from "@/models/Purchase";
import "@/models/User"; // Ensure User schema is loaded for Mongoose populate to resolve

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const purchases = await Purchase.find()
      .populate("userId", "name email image")
      .sort({ purchasedAt: -1 });

    return NextResponse.json(purchases);
  } catch (error: any) {
    console.error("GET admin purchases error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
