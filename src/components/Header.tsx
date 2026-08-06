import React from 'react';
import { ThemeMode, CustomThemeColors, UserProfile } from '../types';
import { ThemeSelector } from './ThemeSelector';
import { soundEngine } from '../lib/audio';
import {
  Keyboard, Award, TrendingUp, Volume2, VolumeX, HelpCircle, Gamepad2, Users, Target, UserCheck, Flame
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'practice' | 'exam' | 'analytics' | 'warmup' | 'games' | 'leaderboard';
  onTabChange: (tab: 'practice' | 'exam' | 'analytics' | 'warmup' | 'games' | 'leaderboard') => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  customColors: CustomThemeColors;
  onCustomColorsChange: (colors: CustomThemeColors) => void;
  profile: UserProfile;
  onOpenTutorial: () => void;
  onUpdateProfileName: (name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  currentTheme,
  onThemeChange,
  customColors,
  onCustomColorsChange,
  profile,
  onOpenTutorial,
  onUpdateProfileName
}) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [nameInput, setNameInput] = React.useState(profile.name);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setSoundEnabled(!next);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateProfileName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  const navItems = [
    { id: 'practice', label: 'Practice', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'exam', label: 'Simulated Exam', icon: <Award className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'warmup', label: 'Voice Warmup', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Users className="w-4 h-4" /> }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & App Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                CPCT Typing Master
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                20-50 Days Prep
              </span>
            </div>

            {/* Profile Name & Streak Pill */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    autoFocus
                  />
                  <button type="submit" className="text-blue-500 text-[10px] font-bold">Save</button>
                </form>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="hover:underline flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                  {profile.name}
                </button>
              )}
              <span>•</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5 fill-current text-amber-500" /> {profile.streakDays}d Streak
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Theme Selector */}
        <div className="flex items-center gap-2">
          {/* Tutorial Button */}
          <button
            onClick={onOpenTutorial}
            title="Interactive Tutorial Mode"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-medium flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span className="hidden lg:inline">Tutorial</span>
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Theme Selector */}
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
            customColors={customColors}
            onCustomColorsChange={onCustomColorsChange}
          />
        </div>
      </div>
    </header>
  );
};
