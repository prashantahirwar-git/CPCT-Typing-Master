import React from 'react';
import { ThemeMode, CustomThemeColors } from '../types';
import { Sun, Moon, Palette, Terminal, Settings } from 'lucide-react';
import { DEFAULT_CUSTOM_COLORS } from '../lib/storage';

interface ThemeSelectorProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  customColors: CustomThemeColors;
  onCustomColorsChange: (colors: CustomThemeColors) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  customColors,
  onCustomColorsChange
}) => {
  const [showCustomModal, setShowCustomModal] = React.useState(false);

  const themes: { id: ThemeMode; name: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'light', name: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" />, desc: 'Crisp paper contrast' },
    { id: 'dark', name: 'Dark', icon: <Moon className="w-4 h-4 text-indigo-400" />, desc: 'Eye-friendly midnight' },
    { id: 'sepia', name: 'Sepia', icon: <Palette className="w-4 h-4 text-amber-700" />, desc: 'Warm reading tone' },
    { id: 'cyber', name: 'Cyber', icon: <Terminal className="w-4 h-4 text-emerald-400" />, desc: 'Retro matrix terminal' },
    { id: 'custom', name: 'Custom', icon: <Settings className="w-4 h-4 text-blue-400" />, desc: 'User-defined palette' }
  ];

  const handleColorChange = (key: keyof CustomThemeColors, value: string) => {
    onCustomColorsChange({
      ...customColors,
      [key]: value
    });
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        {themes.map((t) => {
          const isSelected = currentTheme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                onThemeChange(t.id);
                if (t.id === 'custom') setShowCustomModal(true);
              }}
              title={t.desc}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Theme Color Picker Modal */}
      {showCustomModal && currentTheme === 'custom' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-100 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-400" />
                Custom Theme Color Generator
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Tailor the colors to fit your eyesight or custom desk setup.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-slate-800/60 p-2.5 rounded-lg">
                <span className="text-slate-300">Background Color</span>
                <input
                  type="color"
                  value={customColors.bg}
                  onChange={(e) => handleColorChange('bg', e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>

              <div className="flex justify-between items-center bg-slate-800/60 p-2.5 rounded-lg">
                <span className="text-slate-300">Card / Container Color</span>
                <input
                  type="color"
                  value={customColors.card}
                  onChange={(e) => handleColorChange('card', e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>

              <div className="flex justify-between items-center bg-slate-800/60 p-2.5 rounded-lg">
                <span className="text-slate-300">Text Color</span>
                <input
                  type="color"
                  value={customColors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>

              <div className="flex justify-between items-center bg-slate-800/60 p-2.5 rounded-lg">
                <span className="text-slate-300">Primary Accent</span>
                <input
                  type="color"
                  value={customColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>

              <div className="flex justify-between items-center bg-slate-800/60 p-2.5 rounded-lg">
                <span className="text-slate-300">Secondary Accent</span>
                <input
                  type="color"
                  value={customColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              <button
                onClick={() => onCustomColorsChange(DEFAULT_CUSTOM_COLORS)}
                className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Reset Defaults
              </button>
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500"
              >
                Apply Custom Palette
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
