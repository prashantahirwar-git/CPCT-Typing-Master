import React from 'react';
import { LeaderboardEntry } from '../types';
import { getStoredLeaderboard, addLeaderboardEntry } from '../lib/storage';
import { Trophy, Users, Plus, Award, Download, Upload, Search, Sparkles } from 'lucide-react';

interface SocialLeaderboardProps {
  currentStudentName: string;
}

export const SocialLeaderboard: React.FC<SocialLeaderboardProps> = ({ currentStudentName }) => {
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterLang, setFilterLang] = React.useState<'all' | 'english' | 'hindi'>('all');
  const [showAddModal, setShowAddModal] = React.useState(false);

  // New Rival Entry state
  const [newRivalName, setNewRivalName] = React.useState('');
  const [newRivalWPM, setNewRivalWPM] = React.useState<number>(40);
  const [newRivalAccuracy, setNewRivalAccuracy] = React.useState<number>(96);
  const [newRivalLang, setNewRivalLang] = React.useState<'english' | 'hindi'>('english');

  const refreshLeaderboard = React.useCallback(() => {
    setLeaderboard(getStoredLeaderboard());
  }, []);

  React.useEffect(() => {
    refreshLeaderboard();
  }, [refreshLeaderboard]);

  const handleAddRival = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRivalName.trim()) return;

    let grade = 'Grade C (30-39 WPM)';
    if (newRivalWPM >= 50) grade = 'Grade A (50+ WPM)';
    else if (newRivalWPM >= 40) grade = 'Grade B (40-49 WPM)';
    else if (newRivalWPM < 30) grade = 'Needs Practice (<30 WPM)';

    addLeaderboardEntry({
      id: 'lb_rival_' + Date.now(),
      studentName: newRivalName.trim(),
      netWPM: newRivalWPM,
      accuracy: newRivalAccuracy,
      testMode: 'Local Classroom Benchmark',
      language: newRivalLang,
      date: new Date().toISOString().split('T')[0],
      badge: grade
    });

    setNewRivalName('');
    setShowAddModal(false);
    refreshLeaderboard();
  };

  const filteredEntries = React.useMemo(() => {
    return leaderboard.filter(e => {
      const matchName = e.studentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLang = filterLang === 'all' || e.language === filterLang;
      return matchName && matchLang;
    });
  }, [leaderboard, searchQuery, filterLang]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-500/30 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" /> Local & Classroom Social Leaderboard
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">CPCT Aspirant Rankings</h2>
          <p className="text-xs text-blue-200/80 mt-1 max-w-lg">
            Friendly peer competition tracked entirely on your local device for maximum privacy and zero latency.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Rival / Classmate Score
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-500 font-medium">Language:</span>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['all', 'english', 'hindi'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setFilterLang(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filterLang === lang
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 w-16 text-center">Rank</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Language</th>
                <th className="p-4 text-center">Net WPM</th>
                <th className="p-4 text-center">Accuracy</th>
                <th className="p-4">CPCT Grade Badge</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredEntries.map((entry, idx) => {
                const isCurrent = entry.studentName.toLowerCase() === currentStudentName.toLowerCase();
                let rankBadge = <span className="font-mono text-slate-500">#{idx + 1}</span>;
                if (idx === 0) rankBadge = <span className="text-amber-500 font-bold text-base">🥇 #1</span>;
                else if (idx === 1) rankBadge = <span className="text-slate-400 font-bold text-base">🥈 #2</span>;
                else if (idx === 2) rankBadge = <span className="text-amber-700 font-bold text-base">🥉 #3</span>;

                return (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-4 text-center">{rankBadge}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {entry.studentName}
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[9px] font-bold">
                          YOU
                        </span>
                      )}
                    </td>
                    <td className="p-4 uppercase text-[10px] font-bold text-slate-500">
                      {entry.language}
                    </td>
                    <td className="p-4 text-center font-mono font-extrabold text-blue-600 dark:text-blue-400 text-base">
                      {entry.netWPM} <span className="text-[10px] font-normal">WPM</span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {entry.accuracy}%
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 text-[10px]">
                        {entry.badge}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-400 text-[11px]">
                      {entry.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Rival Score Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-900 dark:text-white space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" /> Add Classmate / Rival Score
            </h3>
            <p className="text-xs text-slate-500">
              Record a peer score on this device to simulate classroom ranking!
            </p>

            <form onSubmit={handleAddRival} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={newRivalName}
                  onChange={(e) => setNewRivalName(e.target.value)}
                  placeholder="e.g. Ankit Verma"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Net WPM</label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={120}
                    value={newRivalWPM}
                    onChange={(e) => setNewRivalWPM(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Accuracy (%)</label>
                  <input
                    type="number"
                    required
                    min={50}
                    max={100}
                    value={newRivalAccuracy}
                    onChange={(e) => setNewRivalAccuracy(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Test Language</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewRivalLang('english')}
                    className={`flex-1 py-2 rounded-xl border font-bold ${
                      newRivalLang === 'english' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewRivalLang('hindi')}
                    className={`flex-1 py-2 rounded-xl border font-bold ${
                      newRivalLang === 'hindi' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Hindi
                  </button>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save Rival Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
