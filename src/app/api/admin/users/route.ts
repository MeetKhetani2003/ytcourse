import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/adminAuth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Purchase } from "@/models/Purchase";

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

    const users = await User.find().sort({ createdAt: -1 });
    const purchases = await Purchase.find();

    const purchaseCountsMap = purchases.reduce((acc: Record<string, number>, curr) => {
      const uid = curr.userId.toString();
      acc[uid] = (acc[uid] || 0) + 1;
      return acc;
    }, {});

    const formattedUsers = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      image: u.image,
      role: u.role,
      joinDate: u.createdAt,
      purchaseCount: purchaseCountsMap[u._id.toString()] || 0,
      purchasedCourses: u.purchasedCourses || [],
    }));

    return NextResponse.json(formattedUsers);
  } catch (error: any) {
    console.error("GET admin users error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
