import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin routes protection
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    // Course routes protection
    if (pathname.startsWith("/course")) {
      // The default course has id: 'youtube-course'.
      // If user has not purchased the course and is not an admin, redirect to denied.
      const hasPurchased = token?.purchasedCourses?.includes("youtube-course");
      const isAdmin = token?.role === "admin";

      if (!hasPurchased && !isAdmin) {
        return NextResponse.redirect(new URL("/denied", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/course/:path*"],
};
