/**
 * ISO Standards Configuration for YouTube Content
 * ISO 639-1: Language codes
 * ISO 3166-1: Country codes
 * ISO 8601: Date and time format
 */

export const ISO_LANGUAGES = {
  en: { name: 'English', code: 'en', iso639_1: 'en' },
  es: { name: 'Spanish', code: 'es', iso639_1: 'es' },
  fr: { name: 'French', code: 'fr', iso639_1: 'fr' },
  de: { name: 'German', code: 'de', iso639_1: 'de' },
  ja: { name: 'Japanese', code: 'ja', iso639_1: 'ja' },
  zh: { name: 'Chinese', code: 'zh', iso639_1: 'zh' },
  hi: { name: 'Hindi', code: 'hi', iso639_1: 'hi' },
  ar: { name: 'Arabic', code: 'ar', iso639_1: 'ar' },
  pt: { name: 'Portuguese', code: 'pt', iso639_1: 'pt' },
  ru: { name: 'Russian', code: 'ru', iso639_1: 'ru' }
};

export const ISO_COUNTRIES = {
  US: { name: 'United States', code: 'US', iso3166_1: 'US' },
  GB: { name: 'United Kingdom', code: 'GB', iso3166_1: 'GB' },
  CA: { name: 'Canada', code: 'CA', iso3166_1: 'CA' },
  IN: { name: 'India', code: 'IN', iso3166_1: 'IN' },
  AU: { name: 'Australia', code: 'AU', iso3166_1: 'AU' },
  DE: { name: 'Germany', code: 'DE', iso3166_1: 'DE' },
  FR: { name: 'France', code: 'FR', iso3166_1: 'FR' },
  JP: { name: 'Japan', code: 'JP', iso3166_1: 'JP' },
  BR: { name: 'Brazil', code: 'BR', iso3166_1: 'BR' },
  MX: { name: 'Mexico', code: 'MX', iso3166_1: 'MX' }
};

// YouTube Category IDs (ISO-compliant structure)
export const YOUTUBE_CATEGORIES = {
  SCIENCE_TECHNOLOGY: {
    id: '28',
    name: 'Science & Technology',
    iso_category: 'TECH',
    subcategories: ['AI', 'Software', 'Hardware', 'Gaming', 'Mobile']
  },
  EDUCATION: {
    id: '27',
    name: 'Education',
    iso_category: 'EDU',
    subcategories: ['Tutorial', 'Course', 'Review']
  },
  GAMING: {
    id: '20',
    name: 'Gaming',
    iso_category: 'GAME',
    subcategories: ['Gameplay', 'Review', 'Tutorial']
  }
};

/**
 * Format date in ISO 8601 format
 * @param {Date} date - Date object
 * @returns {string} ISO 8601 formatted date
 */
export function formatISO8601(date = new Date()) {
  return date.toISOString();
}

/**
 * Validate ISO language code
 */
export function validateLanguageCode(code) {
  return ISO_LANGUAGES.hasOwnProperty(code);
}

/**
 * Validate ISO country code
 */
export function validateCountryCode(code) {
  return ISO_COUNTRIES.hasOwnProperty(code);
}

export default {
  ISO_LANGUAGES,
  ISO_COUNTRIES,
  YOUTUBE_CATEGORIES,
  formatISO8601,
  validateLanguageCode,
  validateCountryCode
};
