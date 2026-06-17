export interface Video {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string; // The file name inside storage/videos/
}

export interface Module {
  id: string;
  title: string;
  videos: Video[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  price: number;
  modules: Module[];
}

export const course: Course = {
  id: "youtube-course",
  title: "YouTube Masterclass",
  slug: "youtube-masterclass",
  price: 3200,
  modules: [
    {
      id: "module-1",
      title: "Module 1: Getting Started",
      videos: [
        {
          id: "video-1",
          title: "1. Course Introduction",
          duration: "TBD",
          description: "Welcome to the course! An introduction to what you'll be learning.",
          videoUrl: "intro.webm",
        },
        {
          id: "video-2",
          title: "2. Module 1",
          duration: "TBD",
          description: "Diving into the first module.",
          videoUrl: "module1.webm",
        },
      ],
    },
    {
      id: "module-2",
      title: "Module 2",
      videos: [
        {
          id: "video-3",
          title: "1. Module 2",
          duration: "TBD",
          description: "Diving into the second module.",
          videoUrl: "module2.mp4",
        },
      ],
    },
  ],
};
