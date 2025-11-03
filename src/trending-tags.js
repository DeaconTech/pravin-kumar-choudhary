#!/usr/bin/env node

/**
 * Trending Tags Script
 * Fetch and display trending tags
 */

import { TrendingTagsService } from './services/trending-tags.js';

async function showTrendingTags() {
  const regionCode = process.argv[2] || 'US';
  const trendingService = new TrendingTagsService();

  console.log('\n========================================');
  console.log(`Trending Tags - ${regionCode}`);
  console.log('========================================\n');

  // Get trending tags from actual videos
  console.log('Fetching trending technology videos...\n');
  const trendingTags = await trendingService.extractTrendingTags(regionCode);

  console.log('TOP 30 TRENDING TAGS:');
  console.log('---------------------\n');
  trendingTags.slice(0, 30).forEach((item, index) => {
    console.log(`${(index + 1).toString().padStart(2)}. ${item.tag.padEnd(30)} (${item.count} videos)`);
  });

  // Show predefined tech tags
  console.log('\n\nPREDEFINED TECH TAGS:');
  console.log('--------------------\n');
  const techTags = trendingService.getTechTrendingTags();

  const categories = {
    'AI & ML': techTags.slice(0, 9),
    'Programming': techTags.slice(9, 21),
    'Cloud & DevOps': techTags.slice(21, 30),
    'Mobile': techTags.slice(30, 36),
    'Security': techTags.slice(36, 42),
    'Emerging Tech': techTags.slice(42, 51),
    'General': techTags.slice(51)
  };

  for (const [category, tags] of Object.entries(categories)) {
    console.log(`\n${category}:`);
    console.log(tags.map(tag => `  - ${tag}`).join('\n'));
  }

  // Search for specific topics
  if (process.argv[3]) {
    const searchQuery = process.argv[3];
    console.log(`\n\nSEARCH RESULTS FOR "${searchQuery}":"`);
    console.log('--------------------------------\n');

    const results = await trendingService.searchTrendingTopics(searchQuery, regionCode, 10);
    results.forEach((item, index) => {
      console.log(`${index + 1}. ${item.snippet.title}`);
      console.log(`   Channel: ${item.snippet.channelTitle}`);
      console.log(`   Published: ${new Date(item.snippet.publishedAt).toDateString()}\n`);
    });
  }

  console.log('========================================\n');
  console.log('Usage: npm run tags [region-code] [search-query]');
  console.log('Example: npm run tags US "artificial intelligence"\n');
}

showTrendingTags().catch(console.error);
