# YouTube Tech Content Generator

A comprehensive system for creating and posting technology content to YouTube with proper ISO standards and trending tags.

## Features

- **ISO Standards Compliance**
  - ISO 639-1: Language codes
  - ISO 3166-1: Country codes
  - ISO 8601: Date and time format

- **Trending Tags System**
  - Fetch real-time trending tags from YouTube
  - Predefined tech-specific tags
  - Optimized tag generation for better reach

- **Content Generation**
  - Automated metadata generation
  - Content calendar planning
  - Multiple content templates
  - SEO-optimized titles and descriptions

- **YouTube Integration**
  - Direct video upload
  - Metadata management
  - OAuth2 authentication

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
```

## Configuration

Edit `.env` file with your YouTube API credentials:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CLIENT_ID=your_client_id_here
YOUTUBE_CLIENT_SECRET=your_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3000/oauth2callback
```

### Getting YouTube API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/oauth2callback`
6. Copy Client ID and Client Secret to `.env`

## Usage

### 1. Generate Content Ideas

```bash
npm run generate

# With custom topic
node src/generate-content.js "Artificial Intelligence" "AI,ML,neural-networks" "US"
```

This will generate:
- Optimized title
- SEO-friendly description
- Trending tags
- ISO-compliant metadata
- 7-day content calendar
- Content templates

### 2. Get Trending Tags

```bash
npm run tags

# For specific region
npm run tags IN

# Search for specific topics
npm run tags US "machine learning"
```

### 3. Authenticate with YouTube

```bash
node src/auth.js
```

Follow the URL, authorize the app, and paste the code.

### 4. Upload Video

```bash
npm run upload ./video.mp4 "AI Tutorial" "AI,machine-learning,python"
```

Full command:
```bash
node src/upload-video.js <video-path> <topic> <keywords>
```

## Project Structure

```
youtube-tech-content-generator/
├── src/
│   ├── config/
│   │   └── iso-standards.js      # ISO standards configuration
│   ├── services/
│   │   ├── content-generator.js  # Content generation logic
│   │   ├── trending-tags.js      # Trending tags fetcher
│   │   └── youtube-uploader.js   # YouTube API integration
│   ├── auth.js                   # Authentication helper
│   ├── generate-content.js       # Content generation script
│   ├── trending-tags.js          # Trending tags script
│   ├── upload-video.js           # Video upload script
│   └── index.js                  # Main entry point
├── .env.example                  # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## ISO Standards Implementation

### Language Codes (ISO 639-1)
```javascript
{
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  zh: 'Chinese',
  hi: 'Hindi',
  // ... more
}
```

### Country Codes (ISO 3166-1)
```javascript
{
  US: 'United States',
  GB: 'United Kingdom',
  IN: 'India',
  CA: 'Canada',
  // ... more
}
```

### Date/Time (ISO 8601)
```javascript
// Format: 2025-11-03T12:30:00.000Z
formatISO8601(new Date())
```

## Content Generation Examples

### Example 1: AI Tutorial

```bash
node src/generate-content.js "ChatGPT Tutorial" "AI,ChatGPT,OpenAI"
```

Output:
- Title: "ChatGPT Tutorial - Complete Guide 2025"
- Description with chapters, timestamps, and trending hashtags
- 50+ relevant tags
- ISO-compliant metadata

### Example 2: Content Calendar

Generates 7-day content plan with:
- Daily topics
- Optimized titles
- Trending tags for each day
- ISO timestamps

## Trending Tags Categories

### AI & Machine Learning
- artificial intelligence, AI, machine learning, deep learning, neural networks, ChatGPT, GPT-4, LLM, generative AI

### Programming & Development
- programming, coding, javascript, python, react, node.js, typescript, web development, software engineering

### Cloud & DevOps
- cloud computing, AWS, Azure, Google Cloud, kubernetes, docker, devops, CI/CD

### Cybersecurity
- cybersecurity, ethical hacking, penetration testing, security, data privacy

### Emerging Tech
- blockchain, cryptocurrency, web3, metaverse, VR, AR, IoT, quantum computing

## Video Upload Metadata Structure

```javascript
{
  snippet: {
    title: "Your Video Title (max 100 chars)",
    description: "Full description (max 5000 chars)",
    tags: ["tag1", "tag2", ...], // max 500 chars total
    categoryId: "28", // Science & Technology
    defaultLanguage: "en", // ISO 639-1
    defaultAudioLanguage: "en"
  },
  status: {
    privacyStatus: "public" // or "private", "unlisted"
  },
  recordingDetails: {
    recordingDate: "2025-11-03T12:30:00.000Z" // ISO 8601
  }
}
```

## Best Practices

1. **Title Optimization**
   - Keep under 100 characters
   - Include main keyword
   - Add year (2025) for freshness
   - Use numbers when relevant

2. **Description**
   - Include timestamps
   - Add related topics
   - Use hashtags (max 15)
   - Include ISO metadata

3. **Tags**
   - Mix broad and specific tags
   - Include trending tags
   - Stay under 500 characters
   - Use both single words and phrases

4. **Upload Schedule**
   - Use content calendar
   - Maintain consistency
   - Post during peak hours
   - Track performance

## API Rate Limits

YouTube API quotas:
- Default: 10,000 units/day
- Video upload: 1,600 units
- Search: 100 units
- Video list: 1 unit

Plan your uploads accordingly!

## Troubleshooting

### Authentication Issues
```bash
# Remove old token and re-authenticate
rm token.json
node src/auth.js
```

### API Quota Exceeded
- Wait 24 hours for quota reset
- Request quota increase in Google Cloud Console

### Video Upload Fails
- Check video format (MP4 recommended)
- Verify file size (max 256GB or 12 hours)
- Ensure proper authentication

## Examples

### Full Workflow

```bash
# 1. Generate content metadata
node src/generate-content.js "Python Tutorial" "python,programming,coding" "US"

# 2. Check trending tags
npm run tags US

# 3. Authenticate (first time only)
node src/auth.js

# 4. Upload video
node src/upload-video.js ./my-video.mp4 "Python Tutorial" "python,programming,coding"
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

## Resources

- [YouTube Data API](https://developers.google.com/youtube/v3)
- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- [ISO 3166-1 Country Codes](https://en.wikipedia.org/wiki/ISO_3166-1)
- [ISO 8601 Date/Time Format](https://en.wikipedia.org/wiki/ISO_8601)

## Author

pravin-kumar-choudhary

---

Made with dedication for content creators
