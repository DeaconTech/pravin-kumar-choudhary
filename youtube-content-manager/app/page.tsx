"use client"

import { useState } from "react"

interface VideoContent {
  title: string
  description: string
  tags: string[]
  category: string
  language: string
  publishDate: string
  visibility: string
}

const TRENDING_TAGS = {
  "AI & Machine Learning": ["AI", "MachineLearning", "DeepLearning", "NeuralNetworks", "ChatGPT", "LLM", "GenerativeAI"],
  "Web Development": ["WebDev", "JavaScript", "TypeScript", "React", "NextJS", "Frontend", "Backend", "FullStack"],
  "Cloud & DevOps": ["Cloud", "AWS", "Azure", "Docker", "Kubernetes", "DevOps", "CI/CD", "Microservices"],
  "Blockchain & Web3": ["Blockchain", "Web3", "Cryptocurrency", "Ethereum", "SmartContracts", "NFT", "DeFi"],
  "Mobile Development": ["MobileDev", "iOS", "Android", "ReactNative", "Flutter", "SwiftUI", "Kotlin"],
  "Data Science": ["DataScience", "BigData", "Analytics", "Python", "DataEngineering", "SQL", "Visualization"],
  "Cybersecurity": ["Cybersecurity", "InfoSec", "Hacking", "PenTesting", "Security", "Privacy", "Encryption"],
  "Programming": ["Programming", "Coding", "SoftwareEngineering", "CleanCode", "Algorithms", "DataStructures"]
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "pt", name: "Portuguese" }
]

export default function Home() {
  const now = new Date()
  const initialDate = now.toISOString().slice(0, 16)
  
  const [content, setContent] = useState<VideoContent>({
    title: "",
    description: "",
    tags: [],
    category: "Science & Technology",
    language: "en",
    publishDate: initialDate,
    visibility: "public"
  })
  
  const [tagInput, setTagInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const addTag = (tag: string) => {
    if (tag && !content.tags.includes(tag) && content.tags.length < 15) {
      setContent({ ...content, tags: [...content.tags, tag] })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setContent({ ...content, tags: content.tags.filter(tag => tag !== tagToRemove) })
  }

  const getTotalTagsLength = () => {
    return content.tags.join(" #").length + content.tags.length
  }

  const exportContent = () => {
    const isoTimestamp = new Date(content.publishDate).toISOString()
    const languageCode = LANGUAGES.find(l => l.code === content.language)?.code || "en"
    
    const exportText = `
YOUTUBE VIDEO METADATA
======================

Title: ${content.title}
(${content.title.length}/100 characters)

Description:
${content.description}
(${content.description.length}/5000 characters)

Tags: #${content.tags.join(" #")}
(${content.tags.length}/15 tags, ${getTotalTagsLength()}/500 characters)

Category: ${content.category}
Language: ${languageCode} (ISO 639-1)
Publish Date: ${isoTimestamp} (ISO 8601)
Visibility: ${content.visibility}

======================
Generated: ${new Date().toISOString()}
    `.trim()
    
    navigator.clipboard.writeText(exportText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">YouTube Content Manager</h1>
          <p className="text-slate-600">Create technology content with ISO standards and trending tags</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Video Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title <span className="text-slate-400">({content.title.length}/100)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    placeholder="Enter your video title..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description <span className="text-slate-400">({content.description.length}/5000)</span>
                  </label>
                  <textarea
                    maxLength={5000}
                    value={content.description}
                    onChange={(e) => setContent({ ...content, description: e.target.value })}
                    placeholder="Describe your video content..."
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Language (ISO 639-1)
                    </label>
                    <select
                      value={content.language}
                      onChange={(e) => setContent({ ...content, language: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Visibility
                    </label>
                    <select
                      value={content.visibility}
                      onChange={(e) => setContent({ ...content, visibility: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="public">Public</option>
                      <option value="unlisted">Unlisted</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Publish Date (ISO 8601)
                  </label>
                  <input
                    type="datetime-local"
                    value={content.publishDate}
                    onChange={(e) => setContent({ ...content, publishDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    ISO 8601: {content.publishDate ? new Date(content.publishDate).toISOString() : "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags Management Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Tags <span className="text-slate-400 text-sm">({content.tags.length}/15 tags, {getTotalTagsLength()}/500 chars)</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag(tagInput)}
                    placeholder="Add custom tag..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={() => addTag(tagInput)}
                    disabled={content.tags.length >= 15}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add
                  </button>
                </div>

                {content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Tags Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Trending Tags</h2>
              
              <div className="space-y-4">
                {Object.entries(TRENDING_TAGS).map(([category, tags]) => (
                  <div key={category}>
                    <button
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className="w-full text-left font-medium text-slate-700 hover:text-slate-900 mb-2"
                    >
                      {category} {selectedCategory === category ? "−" : "+"}
                    </button>
                    
                    {selectedCategory === category && (
                      <div className="flex flex-wrap gap-2 ml-2">
                        {tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => addTag(tag)}
                            disabled={content.tags.includes(tag) || content.tags.length >= 15}
                            className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Export Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Export</h2>
              
              <button
                onClick={exportContent}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {copied ? "Copied to Clipboard!" : "Copy for YouTube Studio"}
              </button>
              
              <div className="mt-4 p-4 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1">
                <p className="font-medium">Standards Compliance:</p>
                <p>✓ ISO 8601 (Date/Time)</p>
                <p>✓ ISO 639-1 (Language)</p>
                <p>✓ YouTube Limits</p>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Preview</h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-slate-700">Title:</p>
                  <p className="text-slate-600">{content.title || "No title yet"}</p>
                </div>
                
                <div>
                  <p className="font-medium text-slate-700">Tags:</p>
                  <p className="text-slate-600">
                    {content.tags.length > 0 ? `#${content.tags.join(" #")}` : "No tags yet"}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium text-slate-700">Language:</p>
                  <p className="text-slate-600">
                    {LANGUAGES.find(l => l.code === content.language)?.name} ({content.language})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
