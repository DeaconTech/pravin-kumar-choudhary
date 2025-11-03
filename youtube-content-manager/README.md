# YouTube Technology Content Manager

A modern web application for creating and managing YouTube technology content with ISO-compliant standards and trending tags.

## Features

### 🎯 Core Functionality
- **Video Metadata Management**: Create comprehensive video metadata including title, description, and tags
- **ISO Standards Compliance**:
  - ISO 8601 for date/time formatting
  - ISO 639-1 for language codes
- **Trending Technology Tags**: Pre-populated categories including:
  - AI & Machine Learning
  - Web Development
  - Cloud & DevOps
  - Blockchain & Web3
  - Mobile Development
  - Data Science
  - Cybersecurity
  - Programming

### 📊 Smart Features
- **Character Counters**: Real-time tracking for YouTube limits
  - Title: 100 characters max
  - Description: 5000 characters max
  - Tags: 15 tags max, 500 characters total
- **Tag Optimizer**: Smart suggestions from trending tech categories
- **Export Functionality**: Copy-ready format for YouTube Studio
- **Live Preview**: See your content before publishing
- **Multi-language Support**: 8 major languages with ISO 639-1 codes

### 🎨 User Experience
- Clean, modern interface with Tailwind CSS
- Responsive design for all screen sizes
- Intuitive tag management with one-click additions
- Real-time validation and feedback
- Collapsible trending tag categories

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd youtube-content-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Usage Guide

### Creating Content

1. **Enter Video Details**:
   - Add a compelling title (max 100 characters)
   - Write a detailed description (max 5000 characters)
   - Select your content language (ISO 639-1 compliant)
   - Choose visibility (Public, Unlisted, or Private)
   - Set publish date and time (ISO 8601 format)

2. **Add Tags**:
   - Browse trending tags by category
   - Click to add trending tags instantly
   - Add custom tags manually
   - Maximum 15 tags, 500 characters total
   - Remove tags by clicking the × button

3. **Preview & Export**:
   - Review your content in the preview panel
   - Click "Copy for YouTube Studio" to export
   - Paste directly into YouTube Studio

### Trending Tag Categories

- **AI & Machine Learning**: AI, MachineLearning, DeepLearning, NeuralNetworks, ChatGPT, LLM, GenerativeAI
- **Web Development**: WebDev, JavaScript, TypeScript, React, NextJS, Frontend, Backend, FullStack
- **Cloud & DevOps**: Cloud, AWS, Azure, Docker, Kubernetes, DevOps, CI/CD, Microservices
- **Blockchain & Web3**: Blockchain, Web3, Cryptocurrency, Ethereum, SmartContracts, NFT, DeFi
- **Mobile Development**: MobileDev, iOS, Android, ReactNative, Flutter, SwiftUI, Kotlin
- **Data Science**: DataScience, BigData, Analytics, Python, DataEngineering, SQL, Visualization
- **Cybersecurity**: Cybersecurity, InfoSec, Hacking, PenTesting, Security, Privacy, Encryption
- **Programming**: Programming, Coding, SoftwareEngineering, CleanCode, Algorithms, DataStructures

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Standards**: ISO 8601, ISO 639-1
- **Storage**: Browser Local Storage (future enhancement)

## ISO Standards Compliance

### ISO 8601 (Date and Time)
All dates and times are formatted according to ISO 8601 standard:
- Format: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Example: `2025-11-03T10:30:00.000Z`
- Timezone aware with UTC support

### ISO 639-1 (Language Codes)
Language selection uses ISO 639-1 two-letter codes:
- English: `en`
- Spanish: `es`
- French: `fr`
- German: `de`
- Hindi: `hi`
- Chinese: `zh`
- Japanese: `ja`
- Portuguese: `pt`

## YouTube Limits

The application enforces YouTube's content limits:
- **Title**: 100 characters maximum
- **Description**: 5000 characters maximum
- **Tags**: 15 tags maximum, 500 characters total
- **Hashtags**: First 3 hashtags appear above title

## Future Enhancements

- [ ] Local storage persistence
- [ ] Content templates
- [ ] SEO score calculator
- [ ] Thumbnail preview
- [ ] Multi-video batch management
- [ ] Analytics integration
- [ ] A/B testing for titles
- [ ] Keyword research tools
- [ ] Competitor analysis
- [ ] Scheduled publishing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your YouTube content creation!

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ for content creators
