import React from 'react';
import { TestResult, UserProfile } from '../types';
import { getKeyStats, exportAllDataJSON, importAllDataJSON, resetAllData } from '../lib/storage';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar
} from 'recharts';
import {
  TrendingUp, Award, Calendar, Zap, ShieldAlert, Download, Upload, Trash2, CheckCircle2, Clock, Flame, Target
} from 'lucide-react';

interface PerformanceDashboardProps {
  profile: UserProfile;
  tests: TestResult[];
  onUpdateProfile: (profile: UserProfile) => void;
  onRefreshData: () => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  profile,
  tests,
  onUpdateProfile,
  onRefreshData
}) => {
  const [targetDays, setTargetDays] = React.useState<number>(profile.targetDays || 30);
  const [dailyGoalMins, setDailyGoalMins] = React.useState<number>(profile.dailyGoalMinutes || 30);
  const [isEditingGoal, setIsEditingGoal] = React.useState<boolean>(false);

  const keyStats = React.useMemo(() => getKeyStats(), [tests]);

  // Chart data calculation
  const chartData = React.useMemo(() => {
    return [...tests].reverse().slice(-15).map((t, idx) => ({
      name: `Test ${idx + 1}`,
      netWPM: t.netWPM,
      grossWPM: t.grossWPM,
      accuracy: t.accuracy,
      date: t.date
    }));
  }, [tests]);

  // Summary Metrics
  const bestWPM = tests.length > 0 ? Math.max(...tests.map(t => t.netWPM)) : 0;
  const avgAccuracy = tests.length > 0 ? Math.round(tests.reduce((acc, t) => acc + t.accuracy, 0) / tests.length) : 100;
  const totalMinutesSpent = Math.round(tests.reduce((acc, t) => acc + (t.timeSpentSeconds || 0), 0) / 60);

  const handleSaveGoal = () => {
    onUpdateProfile({
      ...profile,
      targetDays,
      dailyGoalMinutes: dailyGoalMins
    });
    setIsEditingGoal(false);
  };

  const handleExportJSON = () => {
    const json = exportAllDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cpct_typing_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (importAllDataJSON(content)) {
        alert('Data imported successfully!');
        onRefreshData();
      } else {
        alert('Failed to import JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all local typing records? This cannot be undone.')) {
      resetAllData();
      onRefreshData();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 20-50 Day Exam Countdown Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-500/30 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" /> 20 - 50 Days CPCT Preparation Roadmap
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Target Exam Readiness Dashboard
          </h2>
          <p className="text-xs text-blue-200/80 mt-1 max-w-lg">
            Track your speed growth trajectory towards the 30+ WPM English and 20+ WPM Hindi CPCT passing threshold.
          </p>
        </div>

        {/* Target Countdown Widget */}
        <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl flex items-center gap-4 text-xs min-w-[240px]">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Exam In</span>
            <span className="text-3xl font-extrabold text-amber-400 font-mono">{targetDays}</span>
            <span className="text-slate-300 text-[11px] font-semibold ml-1">Days</span>
          </div>

          <div className="border-l border-slate-700 pl-4 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Streak</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-current text-amber-500" /> {profile.streakDays} Days Streak
            </span>
            <button
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-[10px] text-blue-400 underline hover:text-blue-300"
            >
              Adjust Target Plan
            </button>
          </div>
        </div>
      </div>

      {/* Edit Goal Modal Inline */}
      {isEditingGoal && (
        <div className="bg-white dark:bg-slate-900 border border-blue-500 rounded-xl p-4 text-xs space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white">Adjust Your CPCT Target Plan</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-500 block mb-1">Days remaining until CPCT exam (20-50 days):</label>
              <input
                type="number"
                min={10}
                max={90}
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Daily Practice Goal (Minutes):</label>
              <input
                type="number"
                min={10}
                max={120}
                value={dailyGoalMins}
                onChange={(e) => setDailyGoalMins(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={handleSaveGoal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold"
          >
            Save Target Plan
          </button>
        </div>
      )}

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Personal Best Net WPM</span>
          <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{bestWPM}</span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {bestWPM >= 30 ? '✓ CPCT Exam Passing WPM' : 'Aim for 30+ WPM'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Average Accuracy</span>
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{avgAccuracy}%</span>
          <span className="text-[10px] text-slate-500 block mt-1">Target 95%+ precision</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Mock Tests</span>
          <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono">{tests.length}</span>
          <span className="text-[10px] text-slate-500 block mt-1">Sessions completed</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Practice Time</span>
          <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{totalMinutesSpent}m</span>
          <span className="text-[10px] text-slate-500 block mt-1">Logged on device</span>
        </div>
      </div>

      {/* Recharts Speed Growth Trend */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Speed Growth Trajectory (Gross vs Net WPM)
            </h3>
            <p className="text-xs text-slate-500">Visualizing improvement across recent tests</p>
          </div>
        </div>

        {chartData.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="netWPM" stroke="#3b82f6" strokeWidth={3} name="Net WPM" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="grossWPM" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" name="Gross WPM" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            No test records yet. Complete practice or exam sessions to view speed charts!
          </div>
        )}
      </div>

      {/* Key Accuracy Heatmap Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Key Accuracy Matrix & Weak Keys Analysis
        </h3>
        <p className="text-xs text-slate-500">
          Keys highlighted in red/amber indicate lower accuracy in past sessions.
        </p>

        <div className="flex flex-wrap gap-1.5 justify-center py-2">
          {'qwertyuiopasdfghjklzxcvbnm'.split('').map(char => {
            const stat = keyStats[char];
            const acc = stat ? stat.accuracyPercent : 100;
            let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
            if (stat) {
              if (acc < 85) bgClass = 'bg-rose-500 text-white font-bold';
              else if (acc < 93) bgClass = 'bg-amber-500 text-white font-bold';
              else bgClass = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30';
            }

            return (
              <div
                key={char}
                className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center font-mono text-xs ${bgClass}`}
                title={`Key ${char.toUpperCase()}: ${acc}% accuracy`}
              >
                <span className="font-bold">{char.toUpperCase()}</span>
                {stat && <span className="text-[8px] opacity-80">{acc}%</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Data Management Footer */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>Local Device Data Backup (No External Cloud Required)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Export Data JSON
          </button>
          <label className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer flex items-center gap-1">
            <Upload className="w-3.5 h-3.5" /> Import Backup
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
