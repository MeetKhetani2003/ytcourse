import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { verifyAdminToken } from "@/lib/adminAuth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Admin routes protection
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = req.cookies.get("admin_token")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET || "some-fallback-secret-for-admin-session";
    const isAdminAuthenticated = await verifyAdminToken(token, secret);

    if (isLoginPage) {
      if (isAdminAuthenticated) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    if (!isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  }

  // 2. NextAuth protected routes (/dashboard, /course)
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/course")) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET || "some-fallback-secret-for-jwt",
    });

    // If not logged in, redirect to home page
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Course routes protection
    if (pathname.startsWith("/course")) {
      const hasPurchased = token?.purchasedCourses?.includes("youtube-course");
      const isAdmin = token?.role === "admin";

      if (!hasPurchased && !isAdmin) {
        return NextResponse.redirect(new URL("/denied", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/course/:path*"],
};
