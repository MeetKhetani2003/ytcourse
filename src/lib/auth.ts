import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const adminEmail = process.env.ADMIN_EMAIL || "meetkhetani1111@gmail.com";
          const role = user.email === adminEmail ? "admin" : "user";
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            googleId: user.id,
            role,
            purchasedCourses: [],
          });
        }
      }
      return true;
    },
    async jwt({ token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        token.id = dbUser._id.toString();
        token.role = dbUser.role;
        token.purchasedCourses = dbUser.purchasedCourses;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.purchasedCourses = token.purchasedCourses;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "some-fallback-secret-for-jwt",
  pages: {
    signIn: "/",
  },
};
