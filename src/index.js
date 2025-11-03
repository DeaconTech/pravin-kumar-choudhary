#!/usr/bin/env node

/**
 * YouTube Tech Content Generator - Main Entry Point
 * Generate and post technology content with ISO standards and trending tags
 */

import { ContentGenerator } from './services/content-generator.js';
import { YouTubeUploader } from './services/youtube-uploader.js';
import { TrendingTagsService } from './services/trending-tags.js';
import dotenv from 'dotenv';

dotenv.config();

class YouTubeTechContentApp {
  constructor() {
    this.contentGen = new ContentGenerator();
    this.uploader = new YouTubeUploader();
    this.trendingService = new TrendingTagsService();
  }

  /**
   * Display menu
   */
  displayMenu() {
    console.log('\n========================================');
    console.log('YouTube Tech Content Generator');
    console.log('========================================\n');
    console.log('Available Commands:');
    console.log('  npm run generate  - Generate content ideas');
    console.log('  npm run upload    - Upload video to YouTube');
    console.log('  npm run tags      - Get trending tags');
    console.log('\n========================================\n');
  }

  /**
   * Generate content sample
   */
  async generateSample() {
    console.log('Generating content ideas...\n');

    // Generate video metadata
    const metadata = await this.contentGen.generateVideoMetadata(
      'Artificial Intelligence',
      ['AI', 'machine learning', 'neural networks', 'deep learning'],
      { language: 'en', regionCode: 'US' }
    );

    console.log('Generated Video Metadata:');
    console.log('========================\n');
    console.log(`Title: ${metadata.title}`);
    console.log(`\nDescription:\n${metadata.description}`);
    console.log(`\nTags (${metadata.tags.length}):`, metadata.tags.join(', '));
    console.log(`\nISO Standards:`);
    console.log(`  Language: ${metadata.metadata.isoLanguage} (ISO 639-1)`);
    console.log(`  Country: ${metadata.metadata.isoCountry} (ISO 3166-1)`);
    console.log(`  Timestamp: ${metadata.metadata.isoTimestamp} (ISO 8601)`);

    // Generate content calendar
    console.log('\n\nContent Calendar (7 days):');
    console.log('==========================\n');

    const calendar = await this.contentGen.generateContentCalendar(7, 'US');
    calendar.forEach((item, index) => {
      console.log(`Day ${index + 1} - ${new Date(item.date).toLocaleDateString()}`);
      console.log(`  Topic: ${item.topic}`);
      console.log(`  Title: ${item.title}`);
      console.log(`  Tags: ${item.tags.slice(0, 5).join(', ')}`);
      console.log('');
    });

    return metadata;
  }

  /**
   * Get trending tags
   */
  async getTrendingTags(regionCode = 'US') {
    console.log(`\nFetching trending tags for ${regionCode}...\n`);

    const trendingTags = await this.trendingService.extractTrendingTags(regionCode);

    console.log('Top 20 Trending Tags:');
    console.log('=====================\n');

    trendingTags.slice(0, 20).forEach((item, index) => {
      console.log(`${index + 1}. ${item.tag} (${item.count} videos)`);
    });

    console.log('\n\nPredefined Tech Trending Tags:');
    console.log('==============================\n');

    const techTags = this.trendingService.getTechTrendingTags();
    techTags.slice(0, 30).forEach((tag, index) => {
      if (index % 3 === 0) console.log('');
      process.stdout.write(`${tag.padEnd(25)}`);
    });
    console.log('\n');

    return trendingTags;
  }

  /**
   * Upload example (requires authentication)
   */
  async uploadExample(videoPath) {
    console.log('\nPreparing to upload video...\n');

    // Check if authenticated
    const authUrl = this.uploader.getAuthUrl();
    console.log('To upload videos, you need to authenticate with YouTube.');
    console.log('\nAuthentication steps:');
    console.log('1. Visit this URL:', authUrl);
    console.log('2. Grant permissions');
    console.log('3. Copy the authorization code');
    console.log('4. Run: node src/auth.js <code>');
    console.log('\nAfter authentication, you can upload videos programmatically.');

    return { authUrl };
  }

  /**
   * Main run method
   */
  async run() {
    this.displayMenu();

    const command = process.argv[2] || 'help';

    switch (command) {
      case 'generate':
        await this.generateSample();
        break;
      case 'tags':
        await this.getTrendingTags();
        break;
      case 'upload':
        await this.uploadExample();
        break;
      default:
        console.log('Run with: npm start [generate|tags|upload]');
    }
  }
}

// Run the app
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = new YouTubeTechContentApp();
  app.run().catch(console.error);
}

export default YouTubeTechContentApp;
