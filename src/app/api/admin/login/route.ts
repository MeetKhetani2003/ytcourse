import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const envUsername = process.env.ADMIN_USERNAME || "admin";
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envPassword) {
      console.error("ADMIN_PASSWORD is not configured in environment variables.");
      return NextResponse.json(
        { message: "Authentication is not configured on the server." },
        { status: 500 }
      );
    }

    if (username === envUsername && password === envPassword) {
      const secret = process.env.ADMIN_SESSION_SECRET || "some-fallback-secret-for-admin-session";
      const token = await signAdminToken(username, secret, 86400); // 1 day session

      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 86400, // 1 day
      });

      return response;
    }

    return NextResponse.json(
      { message: "Invalid username or password." },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Admin Login API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
