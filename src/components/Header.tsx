import React from 'react';
import appLogo from '../assets/images/cpct_app_logo_1786160308196.jpg';
import { ThemeMode, CustomThemeColors, UserProfile } from '../types';
import { ThemeSelector } from './ThemeSelector';
import { soundEngine } from '../lib/audio';
import {
  Keyboard, Award, TrendingUp, Volume2, VolumeX, HelpCircle, Gamepad2, Users, Target, UserCheck, Flame,
  Maximize2, Minimize2, HardDrive, BookOpen
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'practice' | 'exam' | 'quiz' | 'analytics' | 'warmup' | 'games' | 'leaderboard';
  onTabChange: (tab: 'practice' | 'exam' | 'quiz' | 'analytics' | 'warmup' | 'games' | 'leaderboard') => void;
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
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Sync fullscreen status on window fullscreenchange event
  React.useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  const toggleAppFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

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
    { id: 'quiz', label: 'MCQ Quiz', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'warmup', label: 'Voice Warmup', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Users className="w-4 h-4" /> }
  ] as const;

  // Dynamic theme styling per active theme mode
  const getHeaderStyles = () => {
    switch (currentTheme) {
      case 'purple':
        return {
          headerBg: 'bg-[#0c091d] text-white border-purple-900/60 shadow-xl',
          logoBg: 'bg-purple-700 border-purple-400/50 text-white shadow-purple-950/60',
          titleText: 'text-white drop-shadow-md',
          tagBg: 'bg-purple-950 border-purple-500/60 text-purple-200',
          subText: 'text-purple-300',
          navBg: 'bg-[#160f33] border-purple-800/60',
          navActive: 'bg-purple-600 text-white shadow-md shadow-purple-900/60 ring-1 ring-purple-300/40',
          navInactive: 'text-purple-200 hover:text-white hover:bg-purple-900/50',
          toolBtn: 'bg-[#1a123d] border-purple-500/60 text-white hover:bg-purple-900',
          toolIcon: 'text-purple-300 fill-purple-900',
          voiceMuted: 'border-rose-500/60 bg-[#2b101d] text-rose-200',
        };
      case 'dark':
        return {
          headerBg: 'bg-[#0f172a] text-white border-slate-800 shadow-xl',
          logoBg: 'bg-indigo-600 border-indigo-400/50 text-white shadow-indigo-950/60',
          titleText: 'text-white drop-shadow-md',
          tagBg: 'bg-indigo-950 border-indigo-500/60 text-indigo-200',
          subText: 'text-indigo-200',
          navBg: 'bg-[#1e293b] border-slate-700/80',
          navActive: 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50 ring-1 ring-indigo-300/40',
          navInactive: 'text-slate-300 hover:text-white hover:bg-slate-700/60',
          toolBtn: 'bg-slate-800 border-indigo-500/50 text-white hover:bg-indigo-950',
          toolIcon: 'text-indigo-300 fill-indigo-900',
          voiceMuted: 'border-rose-500/60 bg-rose-950/80 text-rose-200',
        };
      case 'light':
        return {
          headerBg: 'bg-white text-slate-900 border-slate-200 shadow-md',
          logoBg: 'bg-blue-600 border-blue-400/50 text-white shadow-blue-500/20',
          titleText: 'text-slate-900 font-black',
          tagBg: 'bg-blue-100 border-blue-300 text-blue-800',
          subText: 'text-slate-600',
          navBg: 'bg-slate-100 border-slate-200',
          navActive: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
          navInactive: 'text-slate-700 font-extrabold hover:text-slate-900 hover:bg-slate-200',
          toolBtn: 'bg-blue-50 border-blue-300 text-blue-950 hover:bg-blue-100',
          toolIcon: 'text-blue-600 fill-blue-100',
          voiceMuted: 'border-rose-300 bg-rose-50 text-rose-700',
        };
      case 'sepia':
        return {
          headerBg: 'bg-[#efe4d1] text-[#2c1f10] border-[#d8c7af] shadow-md',
          logoBg: 'bg-[#784e22] border-[#5e3b17] text-white shadow-amber-950/20',
          titleText: 'text-[#2c1f10] font-black',
          tagBg: 'bg-[#dccab0] border-[#bfa888] text-[#3d2a17]',
          subText: 'text-[#5a422a]',
          navBg: 'bg-[#e4d6c0] border-[#d2c0a6]',
          navActive: 'bg-[#784e22] text-white shadow-md',
          navInactive: 'text-[#4a3622] font-extrabold hover:text-[#2c1f10] hover:bg-[#d8c8b0]',
          toolBtn: 'bg-[#e6d7c2] border-[#bfa888] text-[#2c1f10] hover:bg-[#dbccb5]',
          toolIcon: 'text-[#784e22] fill-[#efe4d1]',
          voiceMuted: 'border-rose-400 bg-rose-100 text-rose-800',
        };
      case 'cyber':
        return {
          headerBg: 'bg-[#040e08] text-emerald-400 border-emerald-600/60 shadow-xl font-mono',
          logoBg: 'bg-emerald-700 border-emerald-400 text-black shadow-emerald-950/80',
          titleText: 'text-emerald-300 font-black tracking-wider',
          tagBg: 'bg-black border-emerald-500 text-emerald-400',
          subText: 'text-emerald-400',
          navBg: 'bg-[#02180c] border-emerald-800/80',
          navActive: 'bg-emerald-600 text-black font-black shadow-md shadow-emerald-950/80',
          navInactive: 'text-emerald-400 font-bold hover:text-emerald-200 hover:bg-emerald-950/80',
          toolBtn: 'bg-black border-emerald-500/80 text-emerald-300 hover:bg-emerald-950',
          toolIcon: 'text-emerald-400 fill-emerald-950',
          voiceMuted: 'border-rose-500/80 bg-black text-rose-400',
        };
      default:
        return {
          headerBg: 'bg-slate-900 text-white border-slate-800 shadow-xl',
          logoBg: 'bg-indigo-600 border-indigo-400/50 text-white',
          titleText: 'text-white',
          tagBg: 'bg-indigo-950 border-indigo-500/60 text-indigo-200',
          subText: 'text-slate-300',
          navBg: 'bg-slate-800 border-slate-700',
          navActive: 'bg-indigo-600 text-white',
          navInactive: 'text-slate-300 hover:text-white',
          toolBtn: 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700',
          toolIcon: 'text-indigo-300',
          voiceMuted: 'border-rose-500 bg-rose-950 text-rose-200',
        };
    }
  };

  const style = getHeaderStyles();

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-200 ${style.headerBg}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-3 flex flex-wrap items-center justify-between gap-1.5 sm:gap-3">
        {/* Logo & App Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-blue-400/40 shadow-md flex-shrink-0 bg-slate-900 ring-2 ring-blue-500/20">
            <img
              src={appLogo}
              alt="CPCT Typing Hub Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className={`text-base sm:text-2xl font-black tracking-wide ${style.titleText}`}>
                CPCT Typing Hub
              </h1>
              <span className={`px-2 py-0.5 rounded-md border font-extrabold text-[9px] sm:text-[10px] tracking-wide shadow-sm hidden sm:inline-block ${style.tagBg}`}>
                20-50 Days Prep
              </span>
            </div>

            {/* Profile Name, Streak Pill & Local Storage Badge */}
            <div className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs ${style.subText}`}>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-1.5 py-0.5 rounded border text-xs bg-slate-900 text-white focus:outline-none"
                    autoFocus
                  />
                  <button type="submit" className="text-emerald-400 text-[10px] font-bold hover:underline">Save</button>
                </form>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="hover:underline flex items-center gap-1 font-bold"
                >
                  <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  {profile.name}
                </button>
              )}
              <span>•</span>
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-amber-400" /> {profile.streakDays}d Streak
              </span>
              <span className="hidden sm:inline">•</span>
              <span title="All progress, custom settings and test history saved automatically in your browser - No login required!" className="hidden sm:inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-400 bg-slate-800/80 px-1.5 sm:px-2 py-0.5 rounded border border-slate-700/80">
                <HardDrive className="w-3 h-3 text-emerald-400" /> Saved Locally
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className={`flex items-center gap-1 p-1 rounded-xl border overflow-x-auto max-w-full shadow-inner ${style.navBg}`}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-black whitespace-nowrap transition-all ${
                  isActive ? style.navActive : style.navInactive
                }`}
              >
                {item.id === 'warmup' ? (
                  <Volume2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-current' : 'animate-pulse'}`} />
                ) : (
                  React.cloneElement(item.icon as React.ReactElement, { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4' })
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Theme Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleAppFullscreen}
            title={isFullscreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-xl border transition-all text-[11px] sm:text-xs font-black flex items-center gap-1 sm:gap-1.5 shadow-md active:scale-95 ${style.toolBtn}`}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${style.toolIcon}`} />
                <span className="hidden md:inline font-black">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${style.toolIcon}`} />
                <span className="hidden md:inline font-black">Fullscreen</span>
              </>
            )}
          </button>

          {/* Tutorial Button - Dynamic Theme Style */}
          <button
            onClick={onOpenTutorial}
            title="Interactive Tutorial Mode"
            className={`px-2.5 sm:px-3.5 py-1 sm:py-2 rounded-xl border transition-all text-[11px] sm:text-xs font-black flex items-center gap-1 sm:gap-2 shadow-md active:scale-95 ${style.toolBtn}`}
          >
            <HelpCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${style.toolIcon}`} />
            <span className="hidden sm:inline font-black">Tutorial</span>
          </button>

          {/* Voice / Audio Toggle Button */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio & Voice Coach' : 'Mute Audio & Voice Coach'}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-2 rounded-xl border text-[11px] sm:text-xs font-black flex items-center gap-1 sm:gap-2 transition-all active:scale-95 shadow-md ${
              isMuted ? style.voiceMuted : style.toolBtn
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
            ) : (
              <Volume2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse ${style.toolIcon}`} />
            )}
            <span className="hidden lg:inline font-black">{isMuted ? 'Voice OFF' : 'Voice ON'}</span>
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
