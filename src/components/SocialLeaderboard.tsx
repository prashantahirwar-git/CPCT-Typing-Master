import React from 'react';
import { LeaderboardEntry } from '../types';
import { getStoredLeaderboard, addLeaderboardEntry, saveProfile, getStoredProfile } from '../lib/storage';
import { Trophy, Users, Plus, Award, Search, Sparkles, UserCheck, Edit3, Check, ShieldCheck, Flame } from 'lucide-react';
import { soundEngine } from '../lib/audio';

interface SocialLeaderboardProps {
  currentStudentName: string;
  onUpdateStudentName?: (name: string) => void;
}

export const SocialLeaderboard: React.FC<SocialLeaderboardProps> = ({
  currentStudentName,
  onUpdateStudentName
}) => {
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterLang, setFilterLang] = React.useState<'all' | 'english' | 'hindi'>('all');
  const [showAddModal, setShowAddModal] = React.useState(false);

  // Candidate Name Editing state
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [candidateNameInput, setCandidateNameInput] = React.useState(currentStudentName);

  // Feedback Toast state
  const [feedbackNotice, setFeedbackNotice] = React.useState<{ message: string; type: 'success' | 'info' | 'warn' } | null>(null);

  // New Score Entry state
  const [newRivalName, setNewRivalName] = React.useState(currentStudentName);
  const [newRivalWPM, setNewRivalWPM] = React.useState<number>(45);
  const [newRivalAccuracy, setNewRivalAccuracy] = React.useState<number>(98);
  const [newRivalLang, setNewRivalLang] = React.useState<'english' | 'hindi'>('english');
  const [newRivalMode, setNewRivalMode] = React.useState<string>('Simulated CPCT Exam');

  const refreshLeaderboard = React.useCallback(() => {
    setLeaderboard(getStoredLeaderboard());
  }, []);

  React.useEffect(() => {
    refreshLeaderboard();
  }, [refreshLeaderboard]);

  React.useEffect(() => {
    setCandidateNameInput(currentStudentName);
    setNewRivalName(currentStudentName);
  }, [currentStudentName]);

  const handleSaveCandidateName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = candidateNameInput.trim();
    if (trimmed && trimmed !== currentStudentName) {
      if (onUpdateStudentName) {
        onUpdateStudentName(trimmed);
      } else {
        const profile = getStoredProfile();
        saveProfile({ ...profile, name: trimmed });
      }
      setIsEditingName(false);
      soundEngine.playKeyPress();
      setFeedbackNotice({
        message: `Candidate profile name updated to "${trimmed}". Leaderboard entries updated!`,
        type: 'success'
      });
      setTimeout(() => setFeedbackNotice(null), 4000);
      refreshLeaderboard();
    } else {
      setIsEditingName(false);
    }
  };

  const handleAddScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRivalName.trim()) return;

    const studentName = newRivalName.trim();
    let grade = 'Needs Practice (<30 WPM)';
    if (newRivalWPM >= 50) grade = 'Grade A (50+ WPM)';
    else if (newRivalWPM >= 40) grade = 'Grade B (40-49 WPM)';
    else if (newRivalWPM >= 30) grade = 'Grade C (30-39 WPM)';

    const result = addLeaderboardEntry({
      id: 'lb_' + Date.now(),
      studentName,
      netWPM: newRivalWPM,
      accuracy: newRivalAccuracy,
      testMode: newRivalMode,
      language: newRivalLang,
      date: new Date().toISOString().split('T')[0],
      badge: grade
    });

    setShowAddModal(false);
    refreshLeaderboard();

    if (result.reason === 'improved') {
      soundEngine.playKeyPress();
      setFeedbackNotice({
        message: `🎉 New Personal Record for ${studentName} in ${newRivalLang.toUpperCase()}! Recorded ${newRivalWPM} WPM (${newRivalAccuracy}% Acc).`,
        type: 'success'
      });
    } else if (result.reason === 'new_entry') {
      soundEngine.playKeyPress();
      setFeedbackNotice({
        message: `✅ Added leaderboard record for ${studentName} in ${newRivalLang.toUpperCase()} (${newRivalWPM} WPM).`,
        type: 'success'
      });
    } else {
      soundEngine.playError();
      const prevWpm = result.previousEntry?.netWPM || 0;
      const prevAcc = result.previousEntry?.accuracy || 0;
      setFeedbackNotice({
        message: `ℹ️ Candidate "${studentName}" already has a higher record of ${prevWpm} WPM (${prevAcc}% Acc) in ${newRivalLang.toUpperCase()}. Existing highest record retained.`,
        type: 'info'
      });
    }
    setTimeout(() => setFeedbackNotice(null), 5000);
  };

  // Find user's best scores in English and Hindi
  const userEnglishBest = React.useMemo(() => {
    return leaderboard.find(
      e => e.studentName.toLowerCase() === currentStudentName.toLowerCase() && e.language === 'english'
    );
  }, [leaderboard, currentStudentName]);

  const userHindiBest = React.useMemo(() => {
    return leaderboard.find(
      e => e.studentName.toLowerCase() === currentStudentName.toLowerCase() && e.language === 'hindi'
    );
  }, [leaderboard, currentStudentName]);

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
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> MP CPCT Aspirant Leaderboard
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">CPCT Speed & Accuracy Rankings</h2>
          <p className="text-xs text-blue-200/80 mt-1 max-w-lg">
            Tracks only the highest speed and accuracy performance for each candidate in both English and Hindi typing!
          </p>
        </div>

        <button
          onClick={() => {
            setNewRivalName(currentStudentName);
            setShowAddModal(true);
          }}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Record / Add Candidate Score
        </button>
      </div>

      {/* Toast Notification */}
      {feedbackNotice && (
        <div className={`p-3 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-between gap-2 transition-all ${
          feedbackNotice.type === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-blue-600 text-white'
        }`}>
          <span>{feedbackNotice.message}</span>
          <button onClick={() => setFeedbackNotice(null)} className="text-white/80 hover:text-white font-bold text-sm">✕</button>
        </div>
      )}

      {/* Active Candidate Profile Name & Personal Records Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Candidate Name</span>
              {isEditingName ? (
                <form onSubmit={handleSaveCandidateName} className="flex items-center gap-2 mt-0.5">
                  <input
                    type="text"
                    value={candidateNameInput}
                    onChange={(e) => setCandidateNameInput(e.target.value)}
                    className="px-2.5 py-1 rounded-xl text-sm font-bold border border-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{currentStudentName}</h3>
                  <button
                    onClick={() => {
                      setCandidateNameInput(currentStudentName);
                      setIsEditingName(true);
                    }}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 text-[11px] font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Change Name
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold hidden md:inline">Single Record Policy:</span>
            <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Only Highest Speed Recorded
            </span>
          </div>
        </div>

        {/* Current Candidate Personal Best Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* English Best */}
          <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/50 flex items-center justify-between">
            <div>
              <span className="font-extrabold text-blue-900 dark:text-blue-300 text-xs flex items-center gap-1.5">
                🇬🇧 English Personal Best
              </span>
              {userEnglishBest ? (
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-lg font-black text-blue-600 dark:text-blue-400">
                    {userEnglishBest.netWPM} WPM
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    ({userEnglishBest.accuracy}% Acc)
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{userEnglishBest.badge}</span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 mt-0.5">No English test recorded yet. Complete a test to register!</p>
              )}
            </div>
            {userEnglishBest && (
              <span className="px-2 py-1 rounded-lg bg-blue-500 text-white font-black text-[10px]">
                RANKED
              </span>
            )}
          </div>

          {/* Hindi Best */}
          <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/50 flex items-center justify-between">
            <div>
              <span className="font-extrabold text-indigo-900 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                🇮🇳 Hindi Personal Best
              </span>
              {userHindiBest ? (
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-lg font-black text-indigo-600 dark:text-indigo-400">
                    {userHindiBest.netWPM} WPM
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    ({userHindiBest.accuracy}% Acc)
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{userHindiBest.badge}</span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 mt-0.5">No Hindi test recorded yet. Complete a test to register!</p>
              )}
            </div>
            {userHindiBest && (
              <span className="px-2 py-1 rounded-lg bg-indigo-500 text-white font-black text-[10px]">
                RANKED
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or candidate name..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-500 font-medium">Filter Language:</span>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['all', 'english', 'hindi'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setFilterLang(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filterLang === lang
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang === 'english' ? '🇬🇧 English' : lang === 'hindi' ? '🇮🇳 Hindi' : 'All'}
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
                <th className="p-4">Candidate Name</th>
                <th className="p-4">Language</th>
                <th className="p-4 text-center">Highest Net WPM</th>
                <th className="p-4 text-center">Accuracy</th>
                <th className="p-4">CPCT Grade Badge</th>
                <th className="p-4 text-right">Date Recorded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                    No leaderboard entries found for "{searchQuery || filterLang}". Complete a typing test or click "Record / Add Candidate Score"!
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry, idx) => {
                  const isCurrent = entry.studentName.toLowerCase() === currentStudentName.toLowerCase();
                  let rankBadge = <span className="font-mono text-slate-500 font-bold">#{idx + 1}</span>;
                  if (idx === 0) rankBadge = <span className="text-amber-500 font-black text-base">🥇 #1</span>;
                  else if (idx === 1) rankBadge = <span className="text-slate-400 font-black text-base">🥈 #2</span>;
                  else if (idx === 2) rankBadge = <span className="text-amber-700 font-black text-base">🥉 #3</span>;

                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-blue-50/90 dark:bg-blue-950/50 font-semibold border-l-4 border-l-blue-600'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-4 text-center">{rankBadge}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{entry.studentName}</span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-extrabold tracking-wide">
                            YOU
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-bold text-[11px] text-slate-600 dark:text-slate-300">
                        {entry.language === 'english' ? '🇬🇧 ENGLISH' : '🇮🇳 HINDI'}
                      </td>
                      <td className="p-4 text-center font-mono font-black text-blue-600 dark:text-blue-400 text-base">
                        {entry.netWPM} <span className="text-[10px] font-normal text-slate-400">WPM</span>
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {entry.accuracy}%
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          entry.netWPM >= 50
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                            : entry.netWPM >= 40
                            ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30'
                            : entry.netWPM >= 30
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300'
                        }`}>
                          {entry.badge}
                        </span>
                      </td>
                      <td className="p-4 text-right text-slate-400 text-[11px]">
                        {entry.date}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Record Candidate Score Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-900 dark:text-white space-y-4">
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" /> Record Candidate Leaderboard Score
            </h3>
            <p className="text-xs text-slate-500">
              Only a score higher than the candidate's existing record in the selected language will update their leaderboard ranking.
            </p>

            <form onSubmit={handleAddScore} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Candidate / Student Name</label>
                <input
                  type="text"
                  required
                  value={newRivalName}
                  onChange={(e) => setNewRivalName(e.target.value)}
                  placeholder="Enter candidate name..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Net Speed (WPM)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={120}
                    value={newRivalWPM}
                    onChange={(e) => setNewRivalWPM(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Accuracy (%)</label>
                  <input
                    type="number"
                    required
                    min={50}
                    max={100}
                    value={newRivalAccuracy}
                    onChange={(e) => setNewRivalAccuracy(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Test Language</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewRivalLang('english')}
                    className={`flex-1 py-2 rounded-xl border font-bold ${
                      newRivalLang === 'english' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewRivalLang('hindi')}
                    className={`flex-1 py-2 rounded-xl border font-bold ${
                      newRivalLang === 'hindi' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    🇮🇳 Hindi
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Test Mode / Source</label>
                <select
                  value={newRivalMode}
                  onChange={(e) => setNewRivalMode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="Simulated CPCT Exam">Simulated CPCT Exam</option>
                  <option value="Practice Session">Practice Session</option>
                  <option value="Local Classroom Benchmark">Local Classroom Benchmark</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md"
                >
                  Submit Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
