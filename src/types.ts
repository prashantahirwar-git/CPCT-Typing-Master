export type ThemeMode = 'purple' | 'dark' | 'light' | 'sepia' | 'cyber' | 'custom';

export interface CustomThemeColors {
  bg: string;
  card: string;
  text: string;
  primary: string;
  accent: string;
  border: string;
}

export type TestLanguage = 'english' | 'hindi';
export type BackspaceMode = 'allowed' | 'restricted' | 'penalized';

export interface TestResult {
  id: string;
  date: string; // ISO date string
  timestamp: number;
  mode: 'simulated_exam' | 'practice' | 'game' | 'weak_keys';
  language: TestLanguage;
  durationSeconds: number;
  timeSpentSeconds: number;
  passageTitle: string;
  totalCharsTyped: number;
  correctCharsTyped: number;
  uncorrectedErrors: number;
  correctedErrors: number;
  backspaceCount: number;
  grossWPM: number;
  netWPM: number;
  accuracy: number;
  cpctGrade: 'Grade A (50+ WPM)' | 'Grade B (40-49 WPM)' | 'Grade C (30-39 WPM)' | 'Needs Practice (<30 WPM)';
  passedCPCT: boolean;
  keyLatencyMs?: Record<string, number>;
  keyErrors?: Record<string, number>;
}

export interface UserProfile {
  id: string;
  name: string;
  targetDays: number; // e.g. 30 days
  examDate?: string;
  dailyGoalMinutes: number;
  streakDays: number;
  lastPracticeDate: string;
  unlockedBadges: string[];
}

export interface KeyStat {
  key: string;
  totalTyped: number;
  errorCount: number;
  avgLatencyMs: number;
  accuracyPercent: number;
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  netWPM: number;
  accuracy: number;
  testMode: string;
  language: TestLanguage;
  date: string;
  badge: string;
}

export interface WarmupStep {
  id: number;
  title: string;
  instruction: string;
  voiceText: string;
  durationSeconds: number;
  targetKeys?: string[];
  fingerFocus?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  reqDescription: string;
}
