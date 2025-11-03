/**
 * Trending Tags Service
 * Fetches and analyzes trending tags for technology content
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class TrendingTagsService {
  constructor(apiKey = process.env.YOUTUBE_API_KEY) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  /**
   * Get trending technology videos
   */
  async getTrendingTechVideos(regionCode = 'US', maxResults = 50) {
    try {
      const response = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode: regionCode,
          videoCategoryId: '28', // Science & Technology
          maxResults: maxResults,
          key: this.apiKey
        }
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching trending videos:', error.message);
      return [];
    }
  }

  /**
   * Extract tags from trending videos
   */
  async extractTrendingTags(regionCode = 'US') {
    const videos = await this.getTrendingTechVideos(regionCode);
    const tagFrequency = {};

    videos.forEach(video => {
      const tags = video.snippet.tags || [];
      tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        tagFrequency[normalizedTag] = (tagFrequency[normalizedTag] || 0) + 1;
      });
    });

    // Sort by frequency
    const sortedTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));

    return sortedTags;
  }

  /**
   * Get technology-specific trending tags
   */
  getTechTrendingTags() {
    return [
      // AI & Machine Learning
      'artificial intelligence', 'AI', 'machine learning', 'deep learning',
      'neural networks', 'ChatGPT', 'GPT-4', 'LLM', 'generative AI',

      // Programming & Development
      'programming', 'coding', 'javascript', 'python', 'react',
      'node.js', 'typescript', 'web development', 'software engineering',
      'full stack', 'frontend', 'backend',

      // Cloud & DevOps
      'cloud computing', 'AWS', 'Azure', 'Google Cloud', 'kubernetes',
      'docker', 'devops', 'CI/CD', 'microservices',

      // Mobile & Apps
      'mobile development', 'iOS', 'android', 'flutter', 'react native',
      'app development',

      // Cybersecurity
      'cybersecurity', 'ethical hacking', 'penetration testing', 'security',
      'data privacy', 'encryption',

      // Emerging Tech
      'blockchain', 'cryptocurrency', 'web3', 'metaverse', 'VR', 'AR',
      'IoT', 'quantum computing', '5G',

      // General Tech
      'technology', 'tech news', 'gadgets', 'innovation', 'startup',
      'tech review', 'tutorial', 'how to', 'tech tips'
    ];
  }

  /**
   * Generate optimized tags for a video
   */
  async generateOptimizedTags(videoTopic, keywords = [], regionCode = 'US') {
    const trendingTags = await this.extractTrendingTags(regionCode);
    const techTags = this.getTechTrendingTags();

    // Combine custom keywords with trending tags
    const optimizedTags = [
      ...keywords,
      ...techTags.filter(tag =>
        videoTopic.toLowerCase().includes(tag.toLowerCase()) ||
        keywords.some(k => k.toLowerCase().includes(tag.toLowerCase()))
      ).slice(0, 10),
      ...trendingTags.slice(0, 5).map(t => t.tag)
    ];

    // Remove duplicates and limit to 500 characters total (YouTube limit)
    const uniqueTags = [...new Set(optimizedTags)];
    let totalLength = 0;
    const finalTags = [];

    for (const tag of uniqueTags) {
      if (totalLength + tag.length + 1 <= 500) {
        finalTags.push(tag);
        totalLength += tag.length + 1;
      } else {
        break;
      }
    }

    return finalTags;
  }

  /**
   * Search for trending topics
   */
  async searchTrendingTopics(query, regionCode = 'US', maxResults = 10) {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          regionCode: regionCode,
          videoCategoryId: '28',
          order: 'viewCount',
          maxResults: maxResults,
          key: this.apiKey
        }
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error searching topics:', error.message);
      return [];
    }
  }
}

export default TrendingTagsService;
