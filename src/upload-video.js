#!/usr/bin/env node

/**
 * Upload Video Script
 * Upload a video to YouTube with generated metadata
 */

import { YouTubeUploader } from './services/youtube-uploader.js';
import { ContentGenerator } from './services/content-generator.js';
import fs from 'fs';
import path from 'path';

async function uploadVideo() {
  // Check if token exists
  if (!fs.existsSync('token.json')) {
    console.error('\n✗ Not authenticated. Run: node src/auth.js');
    process.exit(1);
  }

  // Load token
  const tokens = JSON.parse(fs.readFileSync('token.json', 'utf8'));

  // Get video path from command line
  const videoPath = process.argv[2];

  if (!videoPath) {
    console.log('\nUsage: npm run upload <video-path> [topic] [keywords...]');
    console.log('\nExample:');
    console.log('  npm run upload ./video.mp4 "AI Tutorial" AI,machine-learning,python');
    process.exit(1);
  }

  if (!fs.existsSync(videoPath)) {
    console.error(`\n✗ Video file not found: ${videoPath}`);
    process.exit(1);
  }

  // Get topic and keywords
  const topic = process.argv[3] || 'Technology Tutorial';
  const keywords = process.argv[4] ? process.argv[4].split(',') : [];

  console.log('\n========================================');
  console.log('YouTube Video Upload');
  console.log('========================================\n');
  console.log(`Video: ${videoPath}`);
  console.log(`Topic: ${topic}`);
  console.log(`Keywords: ${keywords.join(', ')}`);
  console.log('\nGenerating metadata...\n');

  // Generate metadata
  const contentGen = new ContentGenerator();
  const metadata = await contentGen.generateVideoMetadata(topic, keywords, {
    language: 'en',
    regionCode: 'US'
  });

  console.log('Generated Metadata:');
  console.log('------------------');
  console.log(`Title: ${metadata.title}`);
  console.log(`Tags: ${metadata.tags.length} tags`);
  console.log(`Language: ${metadata.language} (ISO 639-1)`);
  console.log(`Region: ${metadata.regionCode} (ISO 3166-1)`);
  console.log('\nUploading to YouTube...\n');

  // Initialize uploader and set credentials
  const uploader = new YouTubeUploader();
  uploader.setCredentials(tokens);

  // Upload video
  const result = await uploader.uploadVideo({
    videoPath: videoPath,
    title: metadata.title,
    description: metadata.description,
    tags: metadata.tags,
    categoryId: metadata.categoryId,
    language: metadata.language,
    regionCode: metadata.regionCode,
    privacyStatus: 'public'
  });

  if (result.success) {
    console.log('\n✓ Upload successful!');
    console.log(`\nVideo URL: ${result.videoUrl}`);
    console.log(`Video ID: ${result.videoId}`);
  } else {
    console.error('\n✗ Upload failed:', result.error);
  }
}

uploadVideo().catch(console.error);
