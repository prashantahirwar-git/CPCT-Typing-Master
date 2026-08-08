import { QuizQuestion } from '../data/quizQuestions';

const CACHE_KEY = 'cpct_mcq_offline_cache_v1';
const CACHE_TIMESTAMP_KEY = 'cpct_mcq_cache_timestamp';

export interface CacheInfo {
  isCached: boolean;
  count: number;
  timestamp: number | null;
  sizeKb: number;
}

/**
 * Retrieve cached questions from localStorage
 */
export const getQuestionsFromCache = (): QuizQuestion[] | null => {
  try {
    const rawData = localStorage.getItem(CACHE_KEY);
    if (!rawData) return null;
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as QuizQuestion[];
    }
  } catch (err) {
    console.error('Failed to read quiz questions from cache', err);
  }
  return null;
};

/**
 * Save questions array to localStorage
 */
export const saveQuestionsToCache = (questions: QuizQuestion[]): boolean => {
  try {
    const jsonStr = JSON.stringify(questions);
    localStorage.setItem(CACHE_KEY, jsonStr);
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    return true;
  } catch (err) {
    console.error('Failed to save quiz questions to cache', err);
    return false;
  }
};

/**
 * Clear cached quiz questions
 */
export const clearQuizCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  } catch (err) {
    console.error('Failed to clear quiz cache', err);
  }
};

/**
 * Get status info about the local cache
 */
export const getCacheInfo = (): CacheInfo => {
  try {
    const rawData = localStorage.getItem(CACHE_KEY);
    const rawTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (rawData) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        const sizeKb = Math.round(new Blob([rawData]).size / 1024);
        return {
          isCached: true,
          count: parsed.length,
          timestamp: rawTime ? parseInt(rawTime, 10) : null,
          sizeKb,
        };
      }
    }
  } catch (err) {
    console.error('Failed to parse cache info', err);
  }
  return {
    isCached: false,
    count: 0,
    timestamp: null,
    sizeKb: 0,
  };
};

/**
 * Export full MCQ set as a downloadable JSON file
 */
export const exportQuestionsJSON = (questions: QuizQuestion[], filename = 'CPCT_230_MCQs_Full_Bank.json') => {
  try {
    const jsonStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export questions JSON', err);
  }
};
