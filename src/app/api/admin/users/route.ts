import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Purchase } from "@/models/Purchase";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
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
    }));

    return NextResponse.json(formattedUsers);
  } catch (error: any) {
    console.error("GET admin users error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
