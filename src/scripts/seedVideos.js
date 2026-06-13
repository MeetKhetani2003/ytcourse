const fs = require("fs");
const path = require("path");

const base64Mp4 = "AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAr9tZGF0AAACoAYF//+///AAAAMmF2Y0MBZAAK/+EAGWdkAAqs2V+WXAWyAAADAAIAAAMAYB4kSywBAAZo6+PLIsAAAAAYc3R0cwAAAAAAAAABAAAAAQAAAgAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAACtwAAAAEAAAAUc3RjbwAAAAAAAAABAAAAMAAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTQuNjMuMTA0";
const videoBuffer = Buffer.from(base64Mp4, "base64");

const videoDir = path.join(__dirname, "..", "..", "storage", "videos");

if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
  console.log("Created directory:", videoDir);
}

const videosToSeed = ["video-1.mp4", "video-2.mp4", "video-3.mp4", "video-4.mp4", "video-5.mp4"];

videosToSeed.forEach((filename) => {
  const filePath = path.join(videoDir, filename);
  fs.writeFileSync(filePath, videoBuffer);
  console.log("Seeded video file:", filePath);
});

console.log("Video seeding complete!");
