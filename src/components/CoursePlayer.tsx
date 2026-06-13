"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Lock, CheckCircle2, ChevronDown, ChevronUp, FileVideo, Shield, Info } from "lucide-react";
import { Course, Video } from "@/config/courseConfig";

interface CoursePlayerProps {
  courseData: Course;
}

export default function CoursePlayer({ courseData }: CoursePlayerProps) {
  const [activeVideo, setActiveVideo] = useState<Video>(
    courseData.modules[0].videos[0]
  );
  
  // Track expanded modules in sidebar
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [courseData.modules[0].id]: true,
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  useEffect(() => {
    // CRITICAL SECURITY NOTE:
    // Browser-level video protections (such as disabling contextmenu, controlsList="nodownload", 
    // and disablePictureInPicture) provide a deterrent against casual users trying to steal content.
    // However, they can NEVER be 100% secure. Tech-savvy users can always screen-record, 
    // capture video packets from the network tab, or bypass DOM constraints via console injections.
    // The true line of defense is our secure token/session-verified API streaming endpoint (/api/video/[videoId]),
    // which prevents direct public URLs from being leaked.

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("contextmenu", handleContextMenu);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, [activeVideo]); // Re-attach when active video shifts

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-6 min-h-[calc(100vh-180px)] items-stretch">
      
      {/* LEFT: Video Player viewport & Details (8 cols on lg) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* HTML5 Secured Player Container */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#000] shadow-2xl group">
          <video
            ref={videoRef}
            key={activeVideo.id}
            src={`/api/video/${activeVideo.id}`}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            playsInline
            className="w-full h-full object-contain"
            autoPlay
          />
          
          {/* Subtle streaming overlay watermark */}
          <div className="absolute top-4 right-4 pointer-events-none select-none text-[10px] text-white/20 font-mono tracking-widest bg-black/40 px-2.5 py-1 rounded">
            SECURE STREAM
          </div>
        </div>

        {/* Video Info Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-secondary-bg/50 border border-white/5 shadow-xl flex flex-col gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-black text-white">
              {activeVideo.title}
            </h1>
            <p className="text-xs text-accent font-semibold mt-1">
              Playing from: {courseData.title}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed font-sans">
            {activeVideo.description}
          </p>

          {/* Security Disclaimer Box */}
          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-2.5 text-orange-400 text-2xs mt-2 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-0.5">Content Protection Watermark:</strong>
              This video is encrypted and streamed dynamically using Range responses from a secure vault. Right-click, picture-in-picture, and download commands have been restricted.
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT: Module Sidebar (4 cols on lg) */}
      <div className="lg:col-span-4 flex flex-col gap-4.5">
        <div className="p-5 rounded-2xl bg-secondary-bg/50 border border-white/5 shadow-xl h-full flex flex-col">
          <div className="pb-4 border-b border-white/5 mb-4">
            <h3 className="font-display font-extrabold text-white text-base">Course Curriculum</h3>
            <span className="text-[10px] text-secondary-text">
              {courseData.modules.length} Modules • {courseData.modules.reduce((acc, m) => acc + m.videos.length, 0)} Lectures
            </span>
          </div>

          {/* Modules Scroll List */}
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3.5 max-h-[500px] lg:max-h-[600px] no-scrollbar">
            {courseData.modules.map((mod, modIdx) => {
              const isExpanded = !!expandedModules[mod.id];
              return (
                <div
                  key={mod.id}
                  className="rounded-xl border border-white/5 bg-[#0A0B1A]/40 overflow-hidden"
                >
                  {/* Module Accordion Header */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center justify-between p-4 bg-white/2 hover:bg-white/5 transition-colors text-left font-display font-bold text-xs sm:text-sm text-white cursor-pointer"
                  >
                    <div className="flex flex-col gap-0.5 max-w-[80%]">
                      <span className="text-accent text-[10px] uppercase font-bold tracking-wider">
                        Module {modIdx + 1}
                      </span>
                      <span className="truncate">{mod.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white/60 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/60 shrink-0" />
                    )}
                  </button>

                  {/* Videos Sub-list */}
                  {isExpanded && (
                    <div className="border-t border-white/5 bg-secondary-bg/20 p-2 flex flex-col gap-1">
                      {mod.videos.map((vid) => {
                        const isActive = vid.id === activeVideo.id;
                        return (
                          <button
                            key={vid.id}
                            onClick={() => setActiveVideo(vid)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all text-xs cursor-pointer ${
                              isActive
                                ? "bg-accent/15 border border-accent/25 text-white"
                                : "hover:bg-white/5 text-secondary-text"
                            }`}
                          >
                            <div className={`p-1.5 rounded-md shrink-0 ${
                              isActive ? "bg-accent text-white" : "bg-white/5 text-secondary-text"
                            }`}>
                              <FileVideo className="w-3.5 h-3.5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold truncate ${isActive ? "text-white" : "text-white/80"}`}>
                                {vid.title}
                              </p>
                              <span className="text-[10px] text-secondary-text font-mono mt-0.5 block">
                                Duration: {vid.duration}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
