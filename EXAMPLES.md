# Usage Examples

## Quick Start Examples

### 1. Generate Content for Different Topics

#### AI/Machine Learning
```bash
node src/generate-content.js "Machine Learning Basics" "ML,AI,python,scikit-learn" "US"
```

#### Web Development
```bash
node src/generate-content.js "React Hooks Tutorial" "react,javascript,hooks,frontend" "US"
```

#### Cybersecurity
```bash
node src/generate-content.js "Ethical Hacking Guide" "cybersecurity,hacking,pentesting,security" "US"
```

#### Cloud Computing
```bash
node src/generate-content.js "AWS Tutorial" "AWS,cloud,devops,kubernetes" "US"
```

### 2. Region-Specific Content

#### India
```bash
node src/generate-content.js "Tech Jobs in India" "jobs,career,tech,india" "IN"
npm run tags IN
```

#### UK
```bash
node src/generate-content.js "UK Tech Startups" "startup,tech,UK,business" "GB"
npm run tags GB
```

#### Japan
```bash
node src/generate-content.js "AI in Japan" "AI,japan,technology,innovation" "JP"
npm run tags JP
```

### 3. Trending Tags by Category

#### Search AI Tags
```bash
npm run tags US "artificial intelligence"
```

#### Search Blockchain Tags
```bash
npm run tags US "blockchain"
```

#### Search Programming Tags
```bash
npm run tags US "python programming"
```

## Complete Upload Workflow

### Scenario 1: AI Tutorial Video

```bash
# Step 1: Generate optimized metadata
node src/generate-content.js "ChatGPT Complete Guide" "ChatGPT,AI,OpenAI,GPT-4" "US"

# Step 2: Review trending AI tags
npm run tags US "artificial intelligence"

# Step 3: Upload video
node src/upload-video.js ./videos/chatgpt-tutorial.mp4 "ChatGPT Complete Guide" "ChatGPT,AI,OpenAI,GPT-4"
```

### Scenario 2: Web Development Series

```bash
# Day 1: React Basics
node src/upload-video.js ./videos/day1-react.mp4 "React Basics" "react,javascript,tutorial"

# Day 2: React Hooks
node src/upload-video.js ./videos/day2-hooks.mp4 "React Hooks" "react,hooks,useState,useEffect"

# Day 3: React Router
node src/upload-video.js ./videos/day3-router.mp4 "React Router" "react,routing,react-router"
```

### Scenario 3: Multilingual Content

```bash
# English version
node src/generate-content.js "Python Tutorial" "python,programming,coding" "US"

# Spanish version
node src/generate-content.js "Tutorial de Python" "python,programación,código" "MX"

# French version
node src/generate-content.js "Tutoriel Python" "python,programmation,code" "FR"
```

## Advanced Usage

### Custom Content Generation Script

Create `my-content.js`:

```javascript
import { ContentGenerator } from './src/services/content-generator.js';
import { TrendingTagsService } from './src/services/trending-tags.js';

async function generateMyContent() {
  const contentGen = new ContentGenerator();
  const trendingService = new TrendingTagsService();

  // Define your topics
  const topics = [
    { title: 'AI Tutorial', keywords: ['AI', 'ML', 'python'] },
    { title: 'Web Dev Guide', keywords: ['javascript', 'react', 'nodejs'] },
    { title: 'Cloud Computing', keywords: ['AWS', 'Azure', 'cloud'] }
  ];

  for (const topic of topics) {
    const metadata = await contentGen.generateVideoMetadata(
      topic.title,
      topic.keywords,
      { regionCode: 'US' }
    );

    console.log(`\n=== ${topic.title} ===`);
    console.log(`Title: ${metadata.title}`);
    console.log(`Tags: ${metadata.tags.slice(0, 10).join(', ')}`);
  }
}

generateMyContent();
```

Run it:
```bash
node my-content.js
```

### Batch Upload Script

Create `batch-upload.js`:

```javascript
import { YouTubeUploader } from './src/services/youtube-uploader.js';
import { ContentGenerator } from './src/services/content-generator.js';
import fs from 'fs';

async function batchUpload() {
  const uploader = new YouTubeUploader();
  const contentGen = new ContentGenerator();

  // Load saved token
  const tokens = JSON.parse(fs.readFileSync('token.json', 'utf8'));
  uploader.setCredentials(tokens);

  const videos = [
    { path: './video1.mp4', topic: 'AI Basics', keywords: ['AI', 'ML'] },
    { path: './video2.mp4', topic: 'Python Tutorial', keywords: ['python', 'coding'] },
    { path: './video3.mp4', topic: 'React Guide', keywords: ['react', 'javascript'] }
  ];

  for (const video of videos) {
    const metadata = await contentGen.generateVideoMetadata(
      video.topic,
      video.keywords
    );

    const result = await uploader.uploadVideo({
      videoPath: video.path,
      ...metadata,
      privacyStatus: 'public'
    });

    console.log(`Uploaded: ${result.videoUrl}`);

    // Wait 5 seconds between uploads
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

batchUpload();
```

### Content Calendar Generator

Create `weekly-plan.js`:

```javascript
import { ContentGenerator } from './src/services/content-generator.js';
import fs from 'fs';

async function generateWeeklyPlan() {
  const contentGen = new ContentGenerator();

  // Generate 30-day calendar
  const calendar = await contentGen.generateContentCalendar(30, 'US');

  // Save to JSON
  fs.writeFileSync(
    'content-calendar.json',
    JSON.stringify(calendar, null, 2)
  );

  // Generate markdown report
  let markdown = '# Content Calendar\n\n';

  calendar.forEach(item => {
    const date = new Date(item.date).toDateString();
    markdown += `## ${date}\n\n`;
    markdown += `**Topic:** ${item.topic}\n\n`;
    markdown += `**Title:** ${item.title}\n\n`;
    markdown += `**Tags:** ${item.tags.slice(0, 10).join(', ')}\n\n`;
    markdown += '---\n\n';
  });

  fs.writeFileSync('CONTENT_CALENDAR.md', markdown);

  console.log('Generated:');
  console.log('- content-calendar.json');
  console.log('- CONTENT_CALENDAR.md');
}

generateWeeklyPlan();
```

## Integration Examples

### With Express.js Server

```javascript
import express from 'express';
import { ContentGenerator } from './src/services/content-generator.js';
import { TrendingTagsService } from './src/services/trending-tags.js';

const app = express();
const contentGen = new ContentGenerator();
const trendingService = new TrendingTagsService();

app.get('/api/generate', async (req, res) => {
  const { topic, keywords, region } = req.query;

  const metadata = await contentGen.generateVideoMetadata(
    topic,
    keywords.split(','),
    { regionCode: region || 'US' }
  );

  res.json(metadata);
});

app.get('/api/trending', async (req, res) => {
  const { region } = req.query;
  const tags = await trendingService.extractTrendingTags(region || 'US');
  res.json(tags);
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
```

### With CLI Tool

Create `cli.js`:

```javascript
#!/usr/bin/env node

import { program } from 'commander';
import { ContentGenerator } from './src/services/content-generator.js';
import { YouTubeUploader } from './src/services/youtube-uploader.js';

program
  .version('1.0.0')
  .description('YouTube Tech Content CLI');

program
  .command('generate <topic>')
  .option('-k, --keywords <keywords>', 'Comma-separated keywords')
  .option('-r, --region <region>', 'Region code', 'US')
  .action(async (topic, options) => {
    const contentGen = new ContentGenerator();
    const keywords = options.keywords ? options.keywords.split(',') : [];

    const metadata = await contentGen.generateVideoMetadata(
      topic,
      keywords,
      { regionCode: options.region }
    );

    console.log(JSON.stringify(metadata, null, 2));
  });

program
  .command('upload <video>')
  .requiredOption('-t, --topic <topic>', 'Video topic')
  .option('-k, --keywords <keywords>', 'Comma-separated keywords')
  .action(async (video, options) => {
    // Upload logic here
    console.log(`Uploading ${video}...`);
  });

program.parse();
```

## Testing Examples

### Test Content Generation

```bash
# Test with different topics
node src/generate-content.js "Kubernetes Tutorial" "k8s,docker,devops" "US"
node src/generate-content.js "Python Data Science" "python,pandas,numpy" "US"
node src/generate-content.js "Mobile App Development" "react-native,flutter" "US"
```

### Test Trending Tags

```bash
# Test different regions
npm run tags US
npm run tags IN
npm run tags GB
npm run tags JP

# Test search queries
npm run tags US "machine learning"
npm run tags US "web development"
npm run tags US "cybersecurity"
```

## Real-World Scenarios

### Tech News Channel

```bash
# Daily tech news
node src/generate-content.js "Today's Tech News - Nov 3 2025" "tech,news,technology" "US"
```

### Tutorial Channel

```bash
# Tutorial series
node src/generate-content.js "JavaScript Complete Course - Part 1" "javascript,tutorial,programming" "US"
```

### Product Review Channel

```bash
# Product review
node src/generate-content.js "MacBook Pro M4 Review" "apple,macbook,review,tech" "US"
```

### Coding Challenge Channel

```bash
# Coding challenge
node src/generate-content.js "LeetCode Problem Solving" "coding,leetcode,interview,algorithms" "US"
```

---

For more examples and updates, check the documentation!
