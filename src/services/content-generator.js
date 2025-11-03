/**
 * Content Generator Service
 * Generates technology content ideas and descriptions
 */

import { TrendingTagsService } from './trending-tags.js';
import { formatISO8601 } from '../config/iso-standards.js';

export class ContentGenerator {
  constructor() {
    this.trendingService = new TrendingTagsService();
  }

  /**
   * Generate tech content ideas based on trends
   */
  async generateContentIdeas(category = 'technology', regionCode = 'US') {
    const trendingTopics = await this.trendingService.searchTrendingTopics(
      category,
      regionCode,
      20
    );

    const ideas = trendingTopics.map(item => ({
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.high.url
    }));

    return ideas;
  }

  /**
   * Generate video metadata with ISO standards
   */
  async generateVideoMetadata(topic, keywords = [], options = {}) {
    const {
      language = 'en',
      regionCode = 'US',
      categoryId = '28'
    } = options;

    // Get optimized tags
    const tags = await this.trendingService.generateOptimizedTags(
      topic,
      keywords,
      regionCode
    );

    // Generate title (max 100 characters)
    const title = this.generateTitle(topic);

    // Generate description
    const description = this.generateDescription(topic, tags);

    return {
      title: title.substring(0, 100),
      description: description.substring(0, 5000),
      tags: tags.slice(0, 500), // YouTube allows max 500 characters
      categoryId,
      language,
      regionCode,
      recordingDate: formatISO8601(),
      metadata: {
        isoLanguage: language,
        isoCountry: regionCode,
        isoTimestamp: formatISO8601()
      }
    };
  }

  /**
   * Generate engaging title
   */
  generateTitle(topic) {
    const templates = [
      `${topic} - Complete Guide 2025`,
      `How to Master ${topic} in 2025`,
      `${topic} Tutorial for Beginners`,
      `Everything You Need to Know About ${topic}`,
      `${topic} Explained in 10 Minutes`,
      `Top 10 ${topic} Tips and Tricks`,
      `${topic} - Step by Step Tutorial`,
      `Ultimate ${topic} Guide`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Generate comprehensive description
   */
  generateDescription(topic, tags) {
    const timestamp = formatISO8601();

    return `Welcome to our comprehensive guide on ${topic}!

In this video, we'll cover everything you need to know about ${topic}, including:
- Key concepts and fundamentals
- Practical tips and best practices
- Real-world examples and use cases
- Common mistakes to avoid
- Latest trends and updates

📚 CHAPTERS:
00:00 - Introduction
01:00 - Overview
03:00 - Main Content
08:00 - Examples
10:00 - Conclusion

🔗 RELATED TOPICS:
${tags.slice(0, 10).map(tag => `- ${tag}`).join('\n')}

👍 If you found this helpful, please like, comment, and subscribe for more tech content!

🔔 Turn on notifications to stay updated with our latest videos.

📅 Published: ${timestamp}

#technology #tutorial #tech ${tags.slice(0, 5).map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}

---
This content follows ISO standards:
- Language: ISO 639-1
- Country: ISO 3166-1
- Timestamp: ISO 8601
`;
  }

  /**
   * Generate content calendar
   */
  async generateContentCalendar(days = 7, regionCode = 'US') {
    const categories = [
      'artificial intelligence',
      'web development',
      'cybersecurity',
      'cloud computing',
      'mobile development',
      'data science',
      'blockchain'
    ];

    const calendar = [];

    for (let i = 0; i < days; i++) {
      const category = categories[i % categories.length];
      const date = new Date();
      date.setDate(date.getDate() + i);

      const metadata = await this.generateVideoMetadata(category, [], {
        regionCode
      });

      calendar.push({
        date: formatISO8601(date),
        topic: category,
        ...metadata
      });
    }

    return calendar;
  }

  /**
   * Technology content templates
   */
  getTechContentTemplates() {
    return [
      {
        type: 'Tutorial',
        structure: [
          'Introduction',
          'Prerequisites',
          'Step-by-step guide',
          'Examples',
          'Common errors',
          'Conclusion'
        ]
      },
      {
        type: 'Review',
        structure: [
          'Introduction',
          'Features overview',
          'Pros and cons',
          'Comparison',
          'Final verdict'
        ]
      },
      {
        type: 'News/Updates',
        structure: [
          'Breaking news',
          'Key features',
          'Impact analysis',
          'Expert opinion',
          'What\'s next'
        ]
      },
      {
        type: 'How-To',
        structure: [
          'Problem statement',
          'Solution overview',
          'Implementation',
          'Testing',
          'Tips and tricks'
        ]
      }
    ];
  }
}

export default ContentGenerator;
