#!/usr/bin/env node

/**
 * Content Generation Script
 * Generate content ideas and metadata
 */

import { ContentGenerator } from './services/content-generator.js';
import { TrendingTagsService } from './services/trending-tags.js';

async function generateContent() {
  const contentGen = new ContentGenerator();
  const trendingService = new TrendingTagsService();

  const topic = process.argv[2] || 'Artificial Intelligence';
  const keywords = process.argv[3] ? process.argv[3].split(',') : [];
  const regionCode = process.argv[4] || 'US';

  console.log('\n========================================');
  console.log('Content Generator');
  console.log('========================================\n');
  console.log(`Topic: ${topic}`);
  console.log(`Keywords: ${keywords.join(', ') || 'None'}`);
  console.log(`Region: ${regionCode}`);
  console.log('\n========================================\n');

  // Generate metadata
  console.log('Generating video metadata...\n');
  const metadata = await contentGen.generateVideoMetadata(topic, keywords, {
    language: 'en',
    regionCode: regionCode
  });

  console.log('TITLE:');
  console.log('------');
  console.log(metadata.title);

  console.log('\n\nDESCRIPTION:');
  console.log('------------');
  console.log(metadata.description);

  console.log('\n\nTAGS:');
  console.log('-----');
  console.log(metadata.tags.join(', '));

  console.log('\n\nISO METADATA:');
  console.log('-------------');
  console.log(JSON.stringify(metadata.metadata, null, 2));

  // Get trending tags
  console.log('\n\nTRENDING TAGS:');
  console.log('--------------');
  const trendingTags = await trendingService.extractTrendingTags(regionCode);
  console.log(trendingTags.slice(0, 15).map(t => `${t.tag} (${t.count})`).join(', '));

  // Content templates
  console.log('\n\nCONTENT TEMPLATES:');
  console.log('------------------');
  const templates = contentGen.getTechContentTemplates();
  templates.forEach(template => {
    console.log(`\n${template.type}:`);
    template.structure.forEach((step, i) => {
      console.log(`  ${i + 1}. ${step}`);
    });
  });

  // Content calendar
  console.log('\n\n7-DAY CONTENT CALENDAR:');
  console.log('----------------------');
  const calendar = await contentGen.generateContentCalendar(7, regionCode);
  calendar.forEach((item, i) => {
    console.log(`\nDay ${i + 1} - ${new Date(item.date).toDateString()}`);
    console.log(`  Topic: ${item.topic}`);
    console.log(`  Title: ${item.title}`);
  });

  console.log('\n========================================\n');
}

generateContent().catch(console.error);
