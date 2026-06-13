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
  price: 4200,
  modules: [
    {
      id: "module-1",
      title: "Module 1: Faceless USA Channel Blueprint",
      videos: [
        {
          id: "video-1",
          title: "1. Welcome & Faceless Strategy Overview",
          duration: "10:15",
          description: "An introduction to the faceless channel ecosystem. Learn how the business model works and why targeting high-CPM USA audiences is the key to passive income.",
          videoUrl: "video-1.mp4",
        },
        {
          id: "video-2",
          title: "2. Finding High-CPM USA Niches",
          duration: "15:40",
          description: "Step-by-step framework to find niches where 1,000 views pay ₹500–₹1,500 instead of ₹20–₹50. Explore finance, tech, and luxury niches.",
          videoUrl: "video-2.mp4",
        },
      ],
    },
    {
      id: "module-2",
      title: "Module 2: AI Content Creation Machine",
      videos: [
        {
          id: "video-3",
          title: "3. Generating Scripts & Voiceovers with AI",
          duration: "18:22",
          description: "Learn to use advanced AI tools to generate highly engaging scripts and voice them over with near-perfect human clones in minutes.",
          videoUrl: "video-3.mp4",
        },
      ],
    },
    {
      id: "module-3",
      title: "Module 3: SEO, Distribution & Scaling",
      videos: [
        {
          id: "video-4",
          title: "4. YouTube SEO and Algorithm Mastery",
          duration: "12:10",
          description: "Optimize video metadata (Title, Description, Tags) to rank high on search results and command recommendation engine impressions.",
          videoUrl: "video-4.mp4",
        },
        {
          id: "video-5",
          title: "5. Monetization Framework Beyond AdSense",
          duration: "14:45",
          description: "How to stack affiliate revenue, sponsorships, and digital offers on your channels to monetize starting from your very first video.",
          videoUrl: "video-5.mp4",
        },
      ],
    },
  ],
};
