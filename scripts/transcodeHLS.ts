import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const STORAGE_DIR = path.join(process.cwd(), 'storage', 'videos');

async function transcodeVideo(videoId: string, inputFilename: string) {
  const inputPath = path.join(STORAGE_DIR, inputFilename);
  const outputDir = path.join(STORAGE_DIR, videoId);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'master.m3u8');

  console.log(`Starting HLS conversion for ${videoId}...`);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath, { timeout: 432000 })
      .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls'
      ])
      .output(outputPath)
      .on('end', () => {
        console.log(`Successfully converted ${videoId} to HLS!`);
        resolve(true);
      })
      .on('error', (err) => {
        console.error(`Error converting ${videoId}:`, err);
        reject(err);
      })
      .run();
  });
}

async function main() {
  console.log('Transcoding videos to HLS...');
  // Transcode module 2
  await transcodeVideo('video-3', 'module2.mp4');
  // You can add more videos here, or dynamically scan.
  console.log('Transcoding complete.');
}

main().catch(console.error);
