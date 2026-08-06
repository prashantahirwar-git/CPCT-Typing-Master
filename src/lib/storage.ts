import { TestResult, UserProfile, LeaderboardEntry, CustomThemeColors, KeyStat, ThemeMode } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'cpct_user_profile_v1',
  TESTS: 'cpct_test_results_v1',
  LEADERBOARD: 'cpct_leaderboard_v1',
  THEME_MODE: 'cpct_theme_mode_v1',
  CUSTOM_THEME: 'cpct_custom_theme_v1',
  KEY_STATS: 'cpct_key_stats_v1',
  TUTORIAL_COMPLETED: 'cpct_tutorial_completed_v1'
};

export function getStoredThemeMode(): ThemeMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
    if (raw) return raw as ThemeMode;
  } catch (e) {
    console.error('Error reading theme mode:', e);
  }
  return 'purple';
}

export function saveThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
  } catch (e) {
    console.error('Error saving theme mode:', e);
  }
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_1',
  name: 'CPCT Aspirant',
  targetDays: 30,
  dailyGoalMinutes: 30,
  streakDays: 1,
  lastPracticeDate: new Date().toISOString().split('T')[0],
  unlockedBadges: ['first_step']
};

export const DEFAULT_CUSTOM_COLORS: CustomThemeColors = {
  bg: '#111827',
  card: '#1f2937',
  text: '#f9fafb',
  primary: '#3b82f6',
  accent: '#10b981',
  border: '#374151'
};

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', studentName: 'Aarav Sharma', netWPM: 54, accuracy: 98.2, testMode: 'Simulated CPCT Exam', language: 'english', date: '2026-08-01', badge: 'Grade A (50+ WPM)' },
  { id: '2', studentName: 'Priya Verma', netWPM: 48, accuracy: 97.5, testMode: 'Simulated CPCT Exam', language: 'english', date: '2026-08-03', badge: 'Grade B (40-49 WPM)' },
  { id: '3', studentName: 'Rahul Patel', netWPM: 42, accuracy: 96.0, testMode: 'Simulated CPCT Exam', language: 'hindi', date: '2026-08-04', badge: 'Grade B (40-49 WPM)' },
  { id: '4', studentName: 'Neha Singh', netWPM: 36, accuracy: 94.8, testMode: 'Simulated CPCT Exam', language: 'english', date: '2026-08-05', badge: 'Grade C (30-39 WPM)' },
  { id: '5', studentName: 'Vikram Joshi', netWPM: 32, accuracy: 93.1, testMode: 'Simulated CPCT Exam', language: 'hindi', date: '2026-08-05', badge: 'Grade C (30-39 WPM)' }
];

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading profile:', e);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile:', e);
  }
}

export function getStoredTests(): TestResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading tests:', e);
  }
  return [];
}

export function saveTestResult(result: TestResult): void {
  try {
    const existing = getStoredTests();
    const updated = [result, ...existing];
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(updated));

    // Update profile streak and last practice date
    const profile = getStoredProfile();
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastPracticeDate !== today) {
      const lastDate = new Date(profile.lastPracticeDate);
      const currDate = new Date(today);
      const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        profile.streakDays += 1;
      } else if (diffDays > 1) {
        profile.streakDays = 1;
      }
      profile.lastPracticeDate = today;
    }

    // Check badges
    const newBadges = new Set(profile.unlockedBadges);
    newBadges.add('first_test');
    if (result.netWPM >= 30) newBadges.add('cpct_pass');
    if (result.netWPM >= 40) newBadges.add('grade_b');
    if (result.netWPM >= 50) newBadges.add('grade_a');
    if (result.accuracy >= 98) newBadges.add('precision_master');
    if (profile.streakDays >= 7) newBadges.add('week_streak');
    
    profile.unlockedBadges = Array.from(newBadges);
    saveProfile(profile);

    // Auto add to leaderboard if exam mode
    if (result.mode === 'simulated_exam') {
      addLeaderboardEntry({
        id: 'lb_' + Date.now(),
        studentName: profile.name || 'CPCT Aspirant',
        netWPM: result.netWPM,
        accuracy: result.accuracy,
        testMode: 'Simulated CPCT Exam',
        language: result.language,
        date: today,
        badge: result.cpctGrade
      });
    }

    // Update key stats
    if (result.keyErrors || result.keyLatencyMs) {
      updateKeyStatsFromTest(result);
    }
  } catch (e) {
    console.error('Error saving test result:', e);
  }
}

export function getStoredLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading leaderboard:', e);
  }
  return INITIAL_LEADERBOARD;
}

export function addLeaderboardEntry(entry: LeaderboardEntry): void {
  try {
    const existing = getStoredLeaderboard();
    const updated = [...existing, entry].sort((a, b) => b.netWPM - a.netWPM).slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating leaderboard:', e);
  }
}

export function getKeyStats(): Record<string, KeyStat> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.KEY_STATS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading key stats:', e);
  }
  return {};
}

function updateKeyStatsFromTest(test: TestResult): void {
  const stats = getKeyStats();
  
  if (test.keyErrors) {
    Object.entries(test.keyErrors).forEach(([key, count]) => {
      const lower = key.toLowerCase();
      if (!stats[lower]) {
        stats[lower] = { key: lower, totalTyped: 0, errorCount: 0, avgLatencyMs: 250, accuracyPercent: 100 };
      }
      stats[lower].errorCount += count;
      stats[lower].totalTyped += count * 5; // estimate
      const acc = Math.max(0, Math.round(((stats[lower].totalTyped - stats[lower].errorCount) / Math.max(1, stats[lower].totalTyped)) * 100));
      stats[lower].accuracyPercent = acc;
    });
  }

  localStorage.setItem(STORAGE_KEYS.KEY_STATS, JSON.stringify(stats));
}

export function getWeakKeys(count: number = 5): string[] {
  const stats = getKeyStats();
  const entries = Object.values(stats);
  if (entries.length === 0) return ['e', 't', 'a', 'o', 'i']; // fallback default common keys
  entries.sort((a, b) => a.accuracyPercent - b.accuracyPercent);
  return entries.slice(0, count).map(s => s.key);
}

export function isTutorialCompleted(): boolean {
  return localStorage.getItem(STORAGE_KEYS.TUTORIAL_COMPLETED) === 'true';
}

export function setTutorialCompleted(completed: boolean): void {
  localStorage.setItem(STORAGE_KEYS.TUTORIAL_COMPLETED, completed ? 'true' : 'false');
}

export function exportAllDataJSON(): string {
  const data = {
    profile: getStoredProfile(),
    tests: getStoredTests(),
    leaderboard: getStoredLeaderboard(),
    keyStats: getKeyStats(),
    exportedAt: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
}

export function importAllDataJSON(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.profile) saveProfile(parsed.profile);
    if (parsed.tests) localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(parsed.tests));
    if (parsed.leaderboard) localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(parsed.leaderboard));
    if (parsed.keyStats) localStorage.setItem(STORAGE_KEYS.KEY_STATS, JSON.stringify(parsed.keyStats));
    return true;
  } catch (e) {
    console.error('Invalid JSON import:', e);
    return false;
  }
}

export function resetAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.TESTS);
  localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
  localStorage.removeItem(STORAGE_KEYS.KEY_STATS);
  localStorage.removeItem(STORAGE_KEYS.TUTORIAL_COMPLETED);
}
