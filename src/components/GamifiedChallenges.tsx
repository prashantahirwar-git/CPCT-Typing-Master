import React from 'react';
import { soundEngine } from '../lib/audio';
import { Gamepad2, Flame, ShieldAlert, Trophy, Play, RotateCcw, Zap, Sparkles } from 'lucide-react';

interface GamifiedChallengesProps {
  onAwardBadge?: (badgeId: string) => void;
}

const METEOR_WORDS = [
  'cpct', 'speed', 'accuracy', 'keyboard', 'exam', 'governance', 'district', 'office',
  'mponline', 'record', 'digital', 'service', 'governor', 'certify', 'typing', 'finger',
  'home', 'anchor', 'rhythm', 'computer', 'memory', 'system', 'hardware', 'network'
];

export const GamifiedChallenges: React.FC<GamifiedChallengesProps> = ({ onAwardBadge }) => {
  const [activeGame, setActiveGame] = React.useState<'none' | 'meteor' | 'streak' | 'boss'>('none');

  // Game 1: Falling Word Defender
  const [words, setWords] = React.useState<{ id: number; text: string; top: number; left: number }[]>([]);
  const [typedInput, setTypedInput] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [lives, setLives] = React.useState(3);
  const [isGameOver, setIsGameOver] = React.useState(false);

  // Game 2: Accuracy Streak
  const [streakCount, setStreakCount] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(0);
  const [streakCharTarget, setStreakCharTarget] = React.useState('quick brown fox jumps over the lazy dog asdf jkl; 2026 cpct exam speed master');

  // Game 3: Boss Rush
  const [bossTimeLeft, setBossTimeLeft] = React.useState(60);
  const [bossText, setBossText] = React.useState('The Computer Proficiency Certification Test requires fast fingers, sharp accuracy, and steady rhythm under pressure.');
  const [bossInput, setBossInput] = React.useState('');
  const [bossHealth, setBossHealth] = React.useState(100);

  // Falling Meteor Game Loop
  React.useEffect(() => {
    if (activeGame !== 'meteor' || isGameOver) return;

    const interval = setInterval(() => {
      setWords(prev => {
        const next = prev.map(w => ({ ...w, top: w.top + 4 })).filter(w => {
          if (w.top >= 85) {
            setLives(l => {
              const nl = l - 1;
              if (nl <= 0) setIsGameOver(true);
              return Math.max(0, nl);
            });
            soundEngine.playError();
            return false;
          }
          return true;
        });

        // Spawn new word
        if (Math.random() < 0.4 && next.length < 5) {
          const randomWord = METEOR_WORDS[Math.floor(Math.random() * METEOR_WORDS.length)];
          next.push({
            id: Date.now() + Math.random(),
            text: randomWord,
            top: 0,
            left: 10 + Math.floor(Math.random() * 70)
          });
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [activeGame, isGameOver]);

  const handleMeteorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setTypedInput(val);

    const matchedIdx = words.findIndex(w => w.text === val);
    if (matchedIdx !== -1) {
      soundEngine.playKeyPress();
      setScore(s => s + 10);
      setTypedInput('');
      setWords(prev => prev.filter((_, idx) => idx !== matchedIdx));
    }
  };

  const startMeteorGame = () => {
    setActiveGame('meteor');
    setWords([]);
    setScore(0);
    setLives(3);
    setIsGameOver(false);
    setTypedInput('');
  };

  // Accuracy streak handler
  const handleStreakInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val.length === 0) return;

    const expected = streakCharTarget[val.length - 1];
    const actual = val[val.length - 1];

    if (expected === actual) {
      soundEngine.playKeyPress();
      setStreakCount(s => {
        const next = s + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      soundEngine.playError();
      setStreakCount(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900/40 via-orange-900/40 to-slate-900 border border-amber-500/30 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Gamepad2 className="w-3.5 h-3.5" /> Gamified CPCT Training
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Gamified Speed Challenges</h2>
          <p className="text-xs text-amber-200/80 mt-1 max-w-lg">
            Fun interactive typing mini-games to build rapid finger reaction time and focus under pressure.
          </p>
        </div>
      </div>

      {/* Game Mode Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Game 1 */}
        <div className={`p-5 rounded-2xl border text-left transition-all ${
          activeGame === 'meteor'
            ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
        }`}>
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 w-fit mb-3">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Falling Word Defender</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Type falling CPCT words before they reach the bottom of the screen.
          </p>
          <button
            onClick={startMeteorGame}
            className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow"
          >
            Play Word Defender
          </button>
        </div>

        {/* Game 2 */}
        <div className={`p-5 rounded-2xl border text-left transition-all ${
          activeGame === 'streak'
            ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
        }`}>
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-500 w-fit mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">100% Accuracy Streak Sprint</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Build the longest flawless typing streak without making a single mistake.
          </p>
          <button
            onClick={() => setActiveGame('streak')}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
          >
            Play Streak Challenge
          </button>
        </div>

        {/* Game 3 */}
        <div className={`p-5 rounded-2xl border text-left transition-all ${
          activeGame === 'boss'
            ? 'bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
        }`}>
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-500 w-fit mb-3">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">CPCT Boss Rush Sprint</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            60-second high-speed battle against the CPCT Examiner Boss!
          </p>
          <button
            onClick={() => setActiveGame('boss')}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow"
          >
            Fight Examiner Boss
          </button>
        </div>
      </div>

      {/* Game Canvas Area */}
      {activeGame === 'meteor' && (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 text-white relative h-96 flex flex-col justify-between shadow-2xl overflow-hidden">
          {/* HUD Header */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 relative z-10">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span>Score: <strong className="text-amber-400 text-lg">{score}</strong></span>
              <span>Lives: <strong className="text-rose-500 text-lg">{'❤️'.repeat(lives)}</strong></span>
            </div>
            <button
              onClick={startMeteorGame}
              className="text-xs text-amber-400 flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Game
            </button>
          </div>

          {/* Canvas for Falling Words */}
          <div className="relative flex-1 w-full overflow-hidden">
            {words.map(w => (
              <div
                key={w.id}
                style={{ top: `${w.top}%`, left: `${w.left}%` }}
                className="absolute px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 font-mono text-sm font-bold shadow-lg transition-all duration-300"
              >
                {w.text}
              </div>
            ))}

            {isGameOver && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-3 z-20">
                <h3 className="text-2xl font-extrabold text-rose-500">Game Over!</h3>
                <p className="text-sm text-slate-300">Final Defender Score: <strong>{score}</strong></p>
                <button
                  onClick={startMeteorGame}
                  className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          {/* Typing Input */}
          <div className="relative z-10 pt-3 border-t border-slate-800">
            <input
              type="text"
              value={typedInput}
              onChange={handleMeteorInputChange}
              disabled={isGameOver}
              autoFocus
              placeholder="Type falling word and press space/enter..."
              className="w-full p-3 rounded-xl bg-slate-900 border border-amber-500/50 text-amber-300 font-mono text-sm focus:outline-none ring-2 ring-amber-500/20"
            />
          </div>
        </div>
      )}

      {/* Game 2 Canvas: Accuracy Streak */}
      {activeGame === 'streak' && (
        <div className="bg-white dark:bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-4 text-slate-900 dark:text-white">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" /> 100% Precision Streak Challenge
              </h3>
              <p className="text-xs text-slate-500">One mistake resets streak back to 0!</p>
            </div>
            <div className="flex gap-4 text-xs font-mono">
              <span>Current Streak: <strong className="text-emerald-500 text-lg">{streakCount}</strong></span>
              <span>Best Streak: <strong className="text-blue-500 text-lg">{bestStreak}</strong></span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-base leading-relaxed">
            {streakCharTarget}
          </div>

          <input
            type="text"
            onChange={handleStreakInputChange}
            placeholder="Type without making a single error..."
            className="w-full p-3.5 rounded-xl border border-emerald-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-base focus:outline-none ring-2 ring-emerald-500/30"
          />
        </div>
      )}
    </div>
  );
};
