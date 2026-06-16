import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/adminAuth";
import connectDB from "@/lib/db";
import { Purchase } from "@/models/Purchase";
import "@/models/User"; // Ensure User schema is loaded for Mongoose populate to resolve

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET || "some-fallback-secret-for-admin-session";
    const isAuthenticated = await verifyAdminToken(token, secret);
    
    if (!isAuthenticated) {
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
