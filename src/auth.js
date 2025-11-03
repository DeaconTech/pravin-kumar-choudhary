#!/usr/bin/env node

/**
 * YouTube OAuth Authentication Helper
 * Run this to authenticate with YouTube API
 */

import { YouTubeUploader } from './services/youtube-uploader.js';
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function authenticate() {
  const uploader = new YouTubeUploader();

  // Get authorization URL
  const authUrl = uploader.getAuthUrl();

  console.log('\n========================================');
  console.log('YouTube Authentication');
  console.log('========================================\n');
  console.log('Visit this URL to authorize the application:\n');
  console.log(authUrl);
  console.log('\n========================================\n');

  // Get authorization code from user
  rl.question('Enter the authorization code: ', async (code) => {
    try {
      const tokens = await uploader.getToken(code);

      // Save tokens
      fs.writeFileSync('token.json', JSON.stringify(tokens, null, 2));

      console.log('\n✓ Authentication successful!');
      console.log('✓ Token saved to token.json');
      console.log('\nYou can now upload videos using the upload script.');

      rl.close();
    } catch (error) {
      console.error('\n✗ Authentication failed:', error.message);
      rl.close();
    }
  });
}

authenticate();
