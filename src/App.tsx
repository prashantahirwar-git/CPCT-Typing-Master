/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeMode, CustomThemeColors, TestResult, UserProfile } from './types';
import { getStoredProfile, getStoredTests, saveProfile, isTutorialCompleted, setTutorialCompleted, DEFAULT_CUSTOM_COLORS, getStoredThemeMode, saveThemeMode } from './lib/storage';
import { Header } from './components/Header';
import { PracticeSession } from './components/PracticeSession';
import { SimulatedExamTest } from './components/SimulatedExamTest';
import { CPCTQuizSection } from './components/CPCTQuizSection';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { WarmupVoiceSection } from './components/WarmupVoiceSection';
import { GamifiedChallenges } from './components/GamifiedChallenges';
import { SocialLeaderboard } from './components/SocialLeaderboard';
import { TutorialModal } from './components/TutorialModal';
import { ScoreCertificateModal } from './components/ScoreCertificateModal';

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = React.useState<'practice' | 'exam' | 'quiz' | 'analytics' | 'warmup' | 'games' | 'leaderboard'>('practice');
  const [themeMode, setThemeModeState] = React.useState<ThemeMode>(getStoredThemeMode());
  const [customColors, setCustomColors] = React.useState<CustomThemeColors>(DEFAULT_CUSTOM_COLORS);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    saveThemeMode(mode);
  };

  // Profile & Test Data
  const [profile, setProfile] = React.useState<UserProfile>(getStoredProfile());
  const [testHistory, setTestHistory] = React.useState<TestResult[]>(getStoredTests());

  // Modals & Certificate
  const [isTutorialOpen, setIsTutorialOpen] = React.useState<boolean>(false);
  const [activeResult, setActiveResult] = React.useState<TestResult | null>(null);

  // Sync dark class on root document element
  React.useEffect(() => {
    if (themeMode === 'purple' || themeMode === 'dark' || themeMode === 'cyber') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  // Auto show tutorial for first-time users
  React.useEffect(() => {
    if (!isTutorialCompleted()) {
      setIsTutorialOpen(true);
    }
  }, []);

  const refreshData = React.useCallback(() => {
    setProfile(getStoredProfile());
    setTestHistory(getStoredTests());
  }, []);

  const handleFinishTest = (result: TestResult) => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setActiveResult(result);
    refreshData();
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    saveProfile(updated);
    setProfile(updated);
  };

  const handleUpdateProfileName = (name: string) => {
    const updated = { ...profile, name };
    saveProfile(updated);
    setProfile(updated);
  };

  // Determine outer container theme styles
  let themeStyle: React.CSSProperties = {};
  let themeClass = 'min-h-screen transition-colors duration-200 ';

  if (themeMode === 'purple') {
    themeClass += 'theme-purple bg-[#0b0819] text-[#f3ecfe] dark';
  } else if (themeMode === 'light') {
    themeClass += 'theme-light bg-slate-50 text-slate-900';
  } else if (themeMode === 'dark') {
    themeClass += 'theme-dark bg-[#080d1a] text-slate-100 dark';
  } else if (themeMode === 'sepia') {
    themeClass += 'theme-sepia bg-[#f7f0e3] text-[#2c1f10]';
  } else if (themeMode === 'cyber') {
    themeClass += 'theme-cyber bg-[#030b06] text-[#34d399] dark';
  } else if (themeMode === 'custom') {
    themeStyle = {
      backgroundColor: customColors.bg,
      color: customColors.text
    };
  }

  return (
    <div className={themeClass} style={themeStyle}>
      {/* App Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentTheme={themeMode}
        onThemeChange={setThemeMode}
        customColors={customColors}
        onCustomColorsChange={setCustomColors}
        profile={profile}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onUpdateProfileName={handleUpdateProfileName}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-8">
        {activeTab === 'practice' && (
          <PracticeSession onFinishPractice={handleFinishTest} />
        )}

        {activeTab === 'exam' && (
          <SimulatedExamTest
            studentName={profile.name}
            onExamComplete={handleFinishTest}
          />
        )}

        {activeTab === 'quiz' && (
          <CPCTQuizSection />
        )}

        {activeTab === 'analytics' && (
          <PerformanceDashboard
            profile={profile}
            tests={testHistory}
            onUpdateProfile={handleUpdateProfile}
            onRefreshData={refreshData}
          />
        )}

        {activeTab === 'warmup' && (
          <WarmupVoiceSection
            onCompleteWarmup={() => setActiveTab('exam')}
          />
        )}

        {activeTab === 'games' && (
          <GamifiedChallenges />
        )}

        {activeTab === 'leaderboard' && (
          <SocialLeaderboard currentStudentName={profile.name} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>CPCT Typing Master — Specialized 20-50 Day Exam Preparation Engine</p>
        <p className="mt-1 text-[11px] opacity-70">
          100% Local Device Storage • Zero Server Latency • Private & Offline Accessible
        </p>
      </footer>

      {/* Interactive Beginner Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onComplete={() => {
          setTutorialCompleted(true);
          setIsTutorialOpen(false);
        }}
      />

      {/* Score Certificate / Scorecard Modal */}
      <ScoreCertificateModal
        result={activeResult}
        studentName={profile.name}
        onClose={() => {
          setActiveResult(null);
          setActiveTab('analytics');
        }}
        onRetry={() => {
          setActiveResult(null);
        }}
      />
    </div>
  );
}
