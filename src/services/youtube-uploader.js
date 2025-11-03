/**
 * YouTube Upload Service
 * Handles video upload with ISO standards and trending tags
 */

import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';
import { formatISO8601, ISO_COUNTRIES, ISO_LANGUAGES } from '../config/iso-standards.js';

dotenv.config();

export class YouTubeUploader {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URI
    );

    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client
    });
  }

  /**
   * Set credentials from token
   */
  setCredentials(tokens) {
    this.oauth2Client.setCredentials(tokens);
  }

  /**
   * Get authentication URL
   */
  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
  }

  /**
   * Get token from authorization code
   */
  async getToken(code) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  /**
   * Upload video with ISO standards and trending tags
   */
  async uploadVideo(options) {
    const {
      videoPath,
      title,
      description,
      tags = [],
      categoryId = '28', // Science & Technology
      privacyStatus = 'public',
      language = 'en', // ISO 639-1
      defaultAudioLanguage = 'en',
      recordingDate = new Date(),
      location = null,
      regionCode = 'US' // ISO 3166-1
    } = options;

    try {
      // Validate ISO codes
      if (!ISO_LANGUAGES[language]) {
        throw new Error(`Invalid ISO 639-1 language code: ${language}`);
      }

      if (!ISO_COUNTRIES[regionCode]) {
        throw new Error(`Invalid ISO 3166-1 country code: ${regionCode}`);
      }

      // Prepare video metadata with ISO standards
      const videoMetadata = {
        snippet: {
          title: title,
          description: description,
          tags: tags,
          categoryId: categoryId,
          defaultLanguage: language,
          defaultAudioLanguage: defaultAudioLanguage
        },
        status: {
          privacyStatus: privacyStatus,
          selfDeclaredMadeForKids: false
        },
        recordingDetails: {
          recordingDate: formatISO8601(recordingDate)
        }
      };

      // Add location if provided
      if (location && location.latitude && location.longitude) {
        videoMetadata.recordingDetails.location = {
          latitude: location.latitude,
          longitude: location.longitude
        };
      }

      // Upload video
      const response = await this.youtube.videos.insert({
        part: 'snippet,status,recordingDetails',
        requestBody: videoMetadata,
        media: {
          body: fs.createReadStream(videoPath)
        }
      });

      console.log(`Video uploaded successfully!`);
      console.log(`Video ID: ${response.data.id}`);
      console.log(`Video URL: https://www.youtube.com/watch?v=${response.data.id}`);

      return {
        success: true,
        videoId: response.data.id,
        videoUrl: `https://www.youtube.com/watch?v=${response.data.id}`,
        data: response.data
      };
    } catch (error) {
      console.error('Error uploading video:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Update video metadata
   */
  async updateVideo(videoId, updates) {
    try {
      const response = await this.youtube.videos.update({
        part: 'snippet,status',
        requestBody: {
          id: videoId,
          ...updates
        }
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating video:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get video details
   */
  async getVideoDetails(videoId) {
    try {
      const response = await this.youtube.videos.list({
        part: 'snippet,status,statistics,recordingDetails',
        id: videoId
      });

      return response.data.items[0];
    } catch (error) {
      console.error('Error fetching video details:', error.message);
      return null;
    }
  }
}

export default YouTubeUploader;
