import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { course } from "@/config/courseConfig";
import Navbar from "@/components/Navbar";
import CoursePlayer from "@/components/CoursePlayer";

interface PageProps {
  params: Promise<{ courseSlug: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { courseSlug } = await params;

  // Verify slug matches our static course slug
  if (courseSlug !== course.slug) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  await connectDB();

  // Double check authorization
  const dbUser = await User.findById(session.user.id);
  if (!dbUser) {
    redirect("/");
  }

  const hasPurchased = dbUser.purchasedCourses.includes(course.id);
  const isAdmin = dbUser.role === "admin";

  if (!hasPurchased && !isAdmin) {
    redirect("/denied");
  }

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col relative overflow-hidden bg-radial-glow font-sans pb-16">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-20" />

      {/* Header Navbar */}
      <Navbar />


      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 mt-24 relative z-10 flex flex-col gap-6">
        
        {/* Breadcrumb row */}
        <div className="flex items-center gap-2 text-2xs uppercase tracking-wider text-secondary-text font-bold">
          <span>Student Vault</span>
          <span className="text-white/20">•</span>
          <span className="text-accent">{course.title}</span>
        </div>

        {/* Dynamic Client Player */}
        <CoursePlayer courseData={course} />
      </div>
    </div>
  );
}
