import React from 'react';
import { soundEngine } from '../lib/audio';
import { Gamepad2, Flame, ShieldAlert, Trophy, Play, RotateCcw, Zap, Sparkles, Clock, Target, ArrowRight, Award, ChevronRight, Keyboard } from 'lucide-react';

interface GamifiedChallengesProps {
  onAwardBadge?: (badgeId: string) => void;
}

// Word Banks for Falling Meteor Defender categorized by difficulty
const EASY_WORDS = ['cpct', 'exam', 'test', 'type', 'hand', 'fast', 'home', 'font', 'desk', 'keys', 'form', 'page', 'code', 'data', 'text'];
const MEDIUM_WORDS = ['speed', 'rhythm', 'anchor', 'finger', 'system', 'record', 'office', 'mponline', 'result', 'script', 'smooth', 'typing', 'report', 'format'];
const HARD_WORDS = ['accuracy', 'keyboard', 'district', 'governor', 'computer', 'practice', 'guidance', 'hardware', 'network', 'tactical', 'training'];
const EXTREME_WORDS = ['certification', 'mponline2026', 'government', 'proficiency', 'qualification', 'cpctmaster2026', 'typingmaster'];

// Accuracy Streak Targets by Level
const STREAK_LEVELS = [
  {
    level: 1,
    name: 'Easy: Home Row Warmup',
    timeGoal: 15,
    text: 'asdf jkl; cpct exam fast hand type home keys font test form page data text'
  },
  {
    level: 2,
    name: 'Medium: CPCT Sentences',
    timeGoal: 30,
    text: 'The CPCT typing test evaluates net speed and accuracy under 15 minutes of continuous typing.'
  },
  {
    level: 3,
    name: 'Hard: Capitals & Numbers',
    timeGoal: 45,
    text: 'In 2026, candidates must achieve 30+ Net WPM (Grade C) or 50+ Net WPM (Grade A) in English.'
  },
  {
    level: 4,
    name: 'Master: Complex Alphanumeric',
    timeGoal: 60,
    text: 'CPCT_Cert#2026 @Govt_Office - Net WPM = (Gross - Uncorrected_Errors) / 15_Minutes * 100%'
  }
];

// Boss Rush Stages
const BOSS_PHASES = [
  {
    phase: 1,
    title: 'Phase 1: Examiner Warmup',
    bossName: 'CPCT Senior Examiner',
    targetPhrase: 'Computer Proficiency Certification Test MP Online Government Exam 2026',
    timeLimit: 60,
    maxHp: 500,
  },
  {
    phase: 2,
    title: 'Phase 2: Speed Rush Surge',
    bossName: 'CPCT Chief Evaluator',
    targetPhrase: 'Net Typing Speed = Gross WPM minus Penalty for Uncorrected Misspelled Words',
    timeLimit: 45,
    maxHp: 400,
  },
  {
    phase: 3,
    title: 'Phase 3: FINAL OVERDRIVE FINISHER!',
    bossName: 'CPCT Overdrive Examiner AI',
    targetPhrase: 'Mastering 50+ WPM with 100% Accuracy unlocks Grade A Certificate for Govt Positions!',
    timeLimit: 30,
    maxHp: 300,
  }
];

export const GamifiedChallenges: React.FC<GamifiedChallengesProps> = ({ onAwardBadge }) => {
  const [activeGame, setActiveGame] = React.useState<'none' | 'meteor' | 'streak' | 'boss'>('none');

  // ==========================================
  // GAME 1: FALLING WORD DEFENDER (SMOOTH 60FPS)
  // ==========================================
  const [words, setWords] = React.useState<{ id: number; text: string; top: number; left: number; speed: number; level: number }[]>([]);
  const [typedInput, setTypedInput] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(1);
  const [lives, setLives] = React.useState(3);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [meteorGameTime, setMeteorGameTime] = React.useState(0);
  const [hasStartedTypingMeteor, setHasStartedTypingMeteor] = React.useState(false);
  const [explosions, setExplosions] = React.useState<{ id: number; left: number; top: number; text: string }[]>([]);

  // Calculate current difficulty tier based on time survived in Meteor Defender
  const meteorLevel = Math.min(4, Math.floor(meteorGameTime / 15) + 1);

  const reqRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(0);
  const lastSpawnRef = React.useRef<number>(0);

  // Initial words generator helper
  const generateInitialMeteorWords = () => {
    return [
      { id: 1, text: EASY_WORDS[0], top: 5, left: 15, speed: 7, level: 1 },
      { id: 2, text: EASY_WORDS[1], top: 18, left: 45, speed: 7, level: 1 },
      { id: 3, text: EASY_WORDS[2], top: 32, left: 75, speed: 7, level: 1 },
    ];
  };

  // Smooth 60FPS Game Loop using requestAnimationFrame
  const updateMeteorGame = (timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000; // in seconds
    lastTimeRef.current = timestamp;

    if (activeGame === 'meteor' && !isGameOver && hasStartedTypingMeteor) {
      // Update survival time
      setMeteorGameTime(t => t + delta);

      const level = Math.min(4, Math.floor(meteorGameTime / 15) + 1);
      const fallSpeedPercentPerSec = level === 1 ? 7 : level === 2 ? 11 : level === 3 ? 17 : 24;
      const spawnIntervalSec = level === 1 ? 2.2 : level === 2 ? 1.6 : level === 3 ? 1.2 : 0.8;
      const maxWords = level + 2;

      // Spawn check
      if (timestamp - lastSpawnRef.current > spawnIntervalSec * 1000) {
        lastSpawnRef.current = timestamp;
        setWords(prev => {
          if (prev.length < maxWords) {
            let pool = EASY_WORDS;
            if (level === 2) pool = [...EASY_WORDS, ...MEDIUM_WORDS];
            else if (level === 3) pool = [...MEDIUM_WORDS, ...HARD_WORDS];
            else if (level === 4) pool = [...HARD_WORDS, ...EXTREME_WORDS];

            const randomWord = pool[Math.floor(Math.random() * pool.length)];
            const newWord = {
              id: Date.now() + Math.random(),
              text: randomWord,
              top: 0,
              left: 5 + Math.floor(Math.random() * 75),
              speed: fallSpeedPercentPerSec,
              level
            };
            return [...prev, newWord];
          }
          return prev;
        });
      }

      // Update position smoothly
      setWords(prevWords => {
        const nextWords: typeof prevWords = [];
        for (const w of prevWords) {
          const newTop = w.top + w.speed * delta;
          if (newTop >= 82) {
            // Reached bottom - lose life!
            soundEngine.playError();
            setLives(l => {
              const nl = l - 1;
              if (nl <= 0) setIsGameOver(true);
              return Math.max(0, nl);
            });
            setCombo(1); // Reset combo
          } else {
            nextWords.push({ ...w, top: newTop });
          }
        }
        return nextWords;
      });

      reqRef.current = requestAnimationFrame(updateMeteorGame);
    } else if (activeGame === 'meteor' && !isGameOver && !hasStartedTypingMeteor) {
      // Waiting for first keystroke - keep loop alive
      reqRef.current = requestAnimationFrame(updateMeteorGame);
    }
  };

  React.useEffect(() => {
    if (activeGame === 'meteor' && !isGameOver) {
      lastTimeRef.current = performance.now();
      lastSpawnRef.current = performance.now();
      reqRef.current = requestAnimationFrame(updateMeteorGame);
    } else if (reqRef.current) {
      cancelAnimationFrame(reqRef.current);
    }

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [activeGame, isGameOver, meteorGameTime, hasStartedTypingMeteor]);

  // Handle Meteor Input
  const handleMeteorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setTypedInput(val);

    // Start game timer on first keypress
    if (!hasStartedTypingMeteor && val.length > 0) {
      setHasStartedTypingMeteor(true);
    }

    // Check if input matches any word exactly
    const matchedIdx = words.findIndex(w => w.text === val);
    if (matchedIdx !== -1) {
      const matched = words[matchedIdx];
      soundEngine.playKeyPress();

      // Trigger explosion animation
      setExplosions(prev => [...prev, { id: Date.now(), left: matched.left, top: matched.top, text: matched.text }]);
      setTimeout(() => {
        setExplosions(prev => prev.slice(1));
      }, 600);

      const points = 10 * matched.level * combo;
      setScore(s => s + points);
      setCombo(c => Math.min(5, c + 1));
      setTypedInput('');
      setWords(prev => prev.filter((_, idx) => idx !== matchedIdx));

      if (score + points >= 300 && onAwardBadge) {
        onAwardBadge('meteor_master');
      }
    }
  };

  const startMeteorGame = () => {
    setActiveGame('meteor');
    setWords(generateInitialMeteorWords());
    setScore(0);
    setCombo(1);
    setLives(3);
    setIsGameOver(false);
    setTypedInput('');
    setMeteorGameTime(0);
    setHasStartedTypingMeteor(false);
    setExplosions([]);
  };


  // ==========================================
  // GAME 2: ACCURACY STREAK SPRINT (TIME + DIFFICULTY)
  // ==========================================
  const [streakStageIdx, setStreakStageIdx] = React.useState(0);
  const [streakCount, setStreakCount] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(0);
  const [streakTimer, setStreakTimer] = React.useState(0);
  const [hasStartedTypingStreak, setHasStartedTypingStreak] = React.useState(false);
  const [streakInput, setStreakInput] = React.useState('');
  const [streakError, setStreakError] = React.useState(false);

  const currentStreakLevel = STREAK_LEVELS[streakStageIdx] || STREAK_LEVELS[0];

  // Timer tick for Streak Challenge - ONLY when typing has started
  React.useEffect(() => {
    if (activeGame !== 'streak' || !hasStartedTypingStreak) return;
    const interval = setInterval(() => {
      setStreakTimer(t => {
        const next = t + 1;
        if (next >= currentStreakLevel.timeGoal && streakStageIdx < STREAK_LEVELS.length - 1) {
          setStreakStageIdx(s => s + 1);
          setStreakInput('');
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeGame, hasStartedTypingStreak, streakStageIdx, currentStreakLevel]);

  const handleStreakInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStreakInput(val);

    if (!hasStartedTypingStreak && val.length > 0) {
      setHasStartedTypingStreak(true);
    }

    if (val.length === 0) return;

    const targetText = currentStreakLevel.text;
    const expectedChar = targetText[val.length - 1];
    const actualChar = val[val.length - 1];

    if (expectedChar === actualChar) {
      soundEngine.playKeyPress();
      setStreakError(false);
      setStreakCount(s => {
        const next = s + 1;
        if (next > bestStreak) setBestStreak(next);
        if (next >= 100 && onAwardBadge) onAwardBadge('streak_100');
        return next;
      });

      // Complete current stage
      if (val.length >= targetText.length) {
        soundEngine.playSuccessFanfare();
        if (streakStageIdx < STREAK_LEVELS.length - 1) {
          setStreakStageIdx(s => s + 1);
          setStreakInput('');
        } else {
          if (onAwardBadge) onAwardBadge('streak_master');
        }
      }
    } else {
      soundEngine.playError();
      setStreakError(true);
      setStreakCount(0); // Reset streak on mistake
      setTimeout(() => setStreakError(false), 400);
    }
  };

  const startStreakGame = () => {
    setActiveGame('streak');
    setStreakStageIdx(0);
    setStreakCount(0);
    setStreakTimer(0);
    setHasStartedTypingStreak(false);
    setStreakInput('');
    setStreakError(false);
  };


  // ==========================================
  // GAME 3: BOSS RUSH SPRINT (EXAMINER FIGHT)
  // ==========================================
  const [bossPhaseIdx, setBossPhaseIdx] = React.useState(0);
  const [bossHp, setBossHp] = React.useState(BOSS_PHASES[0].maxHp);
  const [bossTimer, setBossTimer] = React.useState(BOSS_PHASES[0].timeLimit);
  const [hasStartedTypingBoss, setHasStartedTypingBoss] = React.useState(false);
  const [bossInput, setBossInput] = React.useState('');
  const [bossLogs, setBossLogs] = React.useState<string[]>(['Battle Ready! Type the target phrase to strike the Examiner!']);
  const [isBossDefeated, setIsBossDefeated] = React.useState(false);
  const [isBossTimeUp, setIsBossTimeUp] = React.useState(false);
  const [bossDamageEffect, setBossDamageEffect] = React.useState<number | null>(null);

  const currentBossPhase = BOSS_PHASES[bossPhaseIdx] || BOSS_PHASES[0];

  // Boss Countdown Timer - ONLY ticks when user starts typing
  React.useEffect(() => {
    if (activeGame !== 'boss' || isBossDefeated || isBossTimeUp || !hasStartedTypingBoss) return;

    const timer = setInterval(() => {
      setBossTimer(t => {
        if (t <= 1) {
          setIsBossTimeUp(true);
          soundEngine.playError();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeGame, isBossDefeated, isBossTimeUp, hasStartedTypingBoss]);

  const handleBossInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBossInput(val);

    if (!hasStartedTypingBoss && val.length > 0) {
      setHasStartedTypingBoss(true);
    }

    const targetPhrase = currentBossPhase.targetPhrase;
    if (val.length === 0) return;

    // Check last typed char
    if (val[val.length - 1] === targetPhrase[val.length - 1]) {
      soundEngine.playKeyPress();

      const baseDmg = 10 + (bossPhaseIdx * 5);
      setBossHp(hp => {
        const nextHp = Math.max(0, hp - baseDmg);
        setBossDamageEffect(baseDmg);
        setTimeout(() => setBossDamageEffect(null), 300);

        if (nextHp <= 0) {
          soundEngine.playSuccessFanfare();
          if (bossPhaseIdx < BOSS_PHASES.length - 1) {
            const nextIdx = bossPhaseIdx + 1;
            setBossPhaseIdx(nextIdx);
            setBossHp(BOSS_PHASES[nextIdx].maxHp);
            setBossTimer(BOSS_PHASES[nextIdx].timeLimit);
            setBossInput('');
            setBossLogs(prev => [
              `🔥 ENRAGE! ${BOSS_PHASES[nextIdx].title} Activated!`,
              ...prev.slice(0, 3)
            ]);
          } else {
            setIsBossDefeated(true);
            if (onAwardBadge) onAwardBadge('boss_slayer');
          }
        }
        return nextHp;
      });

      if (val.length >= targetPhrase.length && bossHp > 0) {
        setBossInput('');
      }
    } else {
      soundEngine.playError();
    }
  };

  const startBossGame = () => {
    setActiveGame('boss');
    setBossPhaseIdx(0);
    setBossHp(BOSS_PHASES[0].maxHp);
    setBossTimer(BOSS_PHASES[0].timeLimit);
    setHasStartedTypingBoss(false);
    setBossInput('');
    setIsBossDefeated(false);
    setIsBossTimeUp(false);
    setBossLogs(['Battle Ready! Type target phrases rapidly to strike the Examiner!']);
  };


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
            <Gamepad2 className="w-3.5 h-3.5" /> Dynamic Time-Scaling CPCT Games
          </div>
          <h2 className="text-2xl font-black tracking-tight">Gamified Speed & Accuracy Arena</h2>
          <p className="text-xs text-purple-200/80 mt-1 max-w-lg">
            Interactive mini-games featuring immediate word spawns, first-keystroke timer activation, and adaptive difficulty scaling!
          </p>
        </div>
      </div>

      {/* Game Mode Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Game 1 Selector */}
        <div className={`p-5 rounded-2xl border text-left transition-all ${
          activeGame === 'meteor'
            ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
        }`}>
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 w-fit mb-3">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Falling Word Defender</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Words drop immediately upon start! Timer begins on your first keystroke, scaling speed up every 15 seconds.
          </p>
          <button
            onClick={startMeteorGame}
            className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Play Word Defender
          </button>
        </div>

        {/* Game 2 Selector */}
        <div className={`p-5 rounded-2xl border text-left transition-all ${
          activeGame === 'streak'
            ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
        }`}>
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-500 w-fit mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Accuracy Streak Sprint</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Build 100% flawless typing streaks. Starts timer on first keystroke & advances through 4 CPCT stages.
          </p>
          <button
            onClick={startStreakGame}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Play Streak Challenge
          </button>
        </div>

        {/* Game 3 Selector */}
        <div className={`p-5 rounded-2xl border text-left transition-all ${
          activeGame === 'boss'
            ? 'bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
        }`}>
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 w-fit mb-3">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">CPCT Examiner Boss Rush</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            60s timer starts when you strike! Defeat 3 evolving phases of CPCT Senior Examiner boss shields.
          </p>
          <button
            onClick={startBossGame}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Fight Examiner Boss
          </button>
        </div>
      </div>


      {/* ========================================================= */}
      {/* GAME 1 CANVAS: FALLING WORD DEFENDER */}
      {/* ========================================================= */}
      {activeGame === 'meteor' && (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 text-white relative h-[440px] flex flex-col justify-between shadow-2xl overflow-hidden">
          {/* HUD Header */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 relative z-10">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1">
                Score: <strong className="text-amber-400 text-lg font-black">{score}</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold">
                Combo: x{combo}
              </span>
              <span className="flex items-center gap-1">
                Level: <strong className="text-purple-300 font-extrabold">{meteorLevel}</strong>
                <span className="text-[10px] text-slate-400">
                  ({meteorLevel === 1 ? 'Easy' : meteorLevel === 2 ? 'Medium' : meteorLevel === 3 ? 'Hard' : 'OVERDRIVE!'})
                </span>
              </span>
              <span className="text-slate-400">
                Time: <strong className="text-white">{Math.floor(meteorGameTime)}s</strong>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs font-mono flex items-center gap-1">
                Lives: <strong className="text-rose-500 text-base">{'❤️'.repeat(lives)}</strong>
              </div>
              <button
                onClick={startMeteorGame}
                className="text-xs text-amber-400 flex items-center gap-1 hover:underline font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart
              </button>
            </div>
          </div>

          {/* First Keystroke Banner */}
          {!hasStartedTypingMeteor && !isGameOver && (
            <div className="bg-amber-500/20 border border-amber-400/50 rounded-xl p-2.5 text-center text-amber-300 text-xs font-bold animate-pulse my-1 z-20 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              ⏱ Words are ready! Type any word in the box below to start timer & falling action!
            </div>
          )}

          {/* Level Progress Indicator Bar */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative z-10 my-1 border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (meteorGameTime / 60) * 100)}%` }}
            />
          </div>

          {/* Interactive Playing Field */}
          <div className="relative flex-1 w-full overflow-hidden my-2 border border-slate-900/80 rounded-xl bg-slate-900/30">
            {words.map(w => {
              const isPrefixMatch = typedInput.length > 0 && w.text.startsWith(typedInput);
              return (
                <div
                  key={w.id}
                  style={{ top: `${w.top}%`, left: `${w.left}%` }}
                  className={`absolute px-3 py-1.5 rounded-lg font-mono text-sm font-black shadow-lg transition-transform ${
                    isPrefixMatch
                      ? 'bg-emerald-600/40 border-2 border-emerald-400 text-emerald-200 scale-105 ring-2 ring-emerald-400/40 z-10'
                      : 'bg-amber-500/20 border border-amber-400/80 text-amber-300'
                  }`}
                >
                  {isPrefixMatch ? (
                    <>
                      <span className="text-emerald-300 underline bg-emerald-950 px-0.5 rounded">
                        {w.text.slice(0, typedInput.length)}
                      </span>
                      <span>{w.text.slice(typedInput.length)}</span>
                    </>
                  ) : (
                    w.text
                  )}
                </div>
              );
            })}

            {/* Particle Explosions */}
            {explosions.map(exp => (
              <div
                key={exp.id}
                style={{ top: `${exp.top}%`, left: `${exp.left}%` }}
                className="absolute font-mono font-black text-emerald-400 animate-bounce text-sm bg-emerald-950 border border-emerald-400 px-2 py-0.5 rounded-full shadow-lg z-20 pointer-events-none"
              >
                💥 +{10 * combo} {exp.text}!
              </div>
            ))}

            {/* Game Over Screen */}
            {isGameOver && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center space-y-3 z-30 p-6 text-center">
                <ShieldAlert className="w-12 h-12 text-rose-500 animate-pulse" />
                <h3 className="text-2xl font-black text-rose-500">Defender Compromised!</h3>
                <p className="text-xs text-slate-300 max-w-xs">
                  Survived for <strong className="text-white">{Math.floor(meteorGameTime)}s</strong> reaching Level {meteorLevel}.
                </p>
                <div className="text-lg font-black text-amber-400 font-mono">
                  Final Score: {score} PTS
                </div>
                <button
                  onClick={startMeteorGame}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg transition-transform active:scale-95"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Typing Input Box */}
          <div className="relative z-10 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={typedInput}
              onChange={handleMeteorInputChange}
              disabled={isGameOver}
              autoFocus
              placeholder="Type falling word to destroy it (e.g. cpct, test, hand)..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-amber-500/50 text-amber-300 font-mono text-sm focus:outline-none ring-2 ring-amber-500/30"
            />
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* GAME 2 CANVAS: ACCURACY STREAK SPRINT */}
      {/* ========================================================= */}
      {activeGame === 'streak' && (
        <div className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-xl space-y-4 text-slate-900 dark:text-white transition-colors duration-200 ${
          streakError ? 'border-rose-500 ring-4 ring-rose-500/20' : 'border-emerald-500/40'
        }`}>
          {/* Header HUD */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-600 dark:text-emerald-400 font-black text-xs inline-block mb-1">
                {currentStreakLevel.name}
              </span>
              <h3 className="text-lg font-black flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" /> 100% Precision Challenge
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1">
                Streak: <strong className="text-emerald-500 text-lg font-black">{streakCount}</strong>
              </span>
              <span className="flex items-center gap-1">
                Best: <strong className="text-blue-500 text-lg font-black">{bestStreak}</strong>
              </span>
              <span className="text-slate-400">
                Time: <strong className="text-slate-800 dark:text-slate-200">{streakTimer}s</strong>
              </span>
            </div>
          </div>

          {/* First Keystroke Notice */}
          {!hasStartedTypingStreak && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
              <Clock className="w-4 h-4" /> ⏱ Streak timer will start on your first keystroke!
            </div>
          )}

          {/* Level Progress Bar */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Difficulty Stage {currentStreakLevel.level} of 4</span>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((streakStageIdx + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Target Text Stream */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-base leading-relaxed tracking-wide select-none">
            {currentStreakLevel.text.split('').map((char, idx) => {
              let charStyle = 'text-slate-400 opacity-60';
              if (idx < streakInput.length) {
                if (streakInput[idx] === char) {
                  charStyle = 'text-emerald-500 font-bold bg-emerald-500/10 px-0.5 rounded';
                } else {
                  charStyle = 'text-rose-500 font-bold bg-rose-500/20 px-0.5 rounded';
                }
              } else if (idx === streakInput.length) {
                charStyle = 'text-slate-900 dark:text-white font-black bg-emerald-500/30 underline ring-1 ring-emerald-400 px-0.5 rounded animate-pulse';
              }
              return (
                <span key={idx} className={charStyle}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Typing Input */}
          <div>
            <input
              type="text"
              value={streakInput}
              onChange={handleStreakInputChange}
              autoFocus
              placeholder="Type perfectly without making a single typo..."
              className="w-full p-3.5 rounded-xl border border-emerald-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-base focus:outline-none ring-2 ring-emerald-500/30"
            />
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* GAME 3 CANVAS: CPCT EXAMINER BOSS RUSH */}
      {/* ========================================================= */}
      {activeGame === 'boss' && (
        <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 text-white shadow-2xl space-y-5 relative overflow-hidden">
          {/* Boss HUD Header */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-500/60 text-purple-300 font-black text-xs">
                {currentBossPhase.title}
              </span>
              <h3 className="text-xl font-black text-white mt-1 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> {currentBossPhase.bossName}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 text-amber-400 font-black text-base">
                <Clock className="w-4 h-4 text-amber-400" /> {bossTimer}s Left
              </span>
              <button
                onClick={startBossGame}
                className="text-xs text-purple-300 flex items-center gap-1 hover:underline font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Battle
              </button>
            </div>
          </div>

          {/* First Keystroke Notice */}
          {!hasStartedTypingBoss && (
            <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/50 text-purple-300 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
              <Clock className="w-4 h-4 text-purple-300" /> ⏱ 60s countdown timer starts when you strike your first character!
            </div>
          )}

          {/* Boss HP Health Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span className="text-purple-300">Examiner Shield Integrity</span>
              <span className="text-emerald-400">{bossHp} / {currentBossPhase.maxHp} HP</span>
            </div>
            <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden border border-slate-800 p-0.5 relative">
              <div
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(bossHp / currentBossPhase.maxHp) * 100}%` }}
              />
              {bossDamageEffect && (
                <span className="absolute right-4 top-0.5 text-[10px] font-mono font-black text-amber-300 animate-ping">
                  -{bossDamageEffect} CRITICAL STRIKE!
                </span>
              )}
            </div>
          </div>

          {/* Target Phrase Box */}
          <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/50 font-mono text-base text-purple-200 leading-relaxed select-none">
            {currentBossPhase.targetPhrase.split('').map((char, idx) => {
              let style = 'text-slate-500';
              if (idx < bossInput.length) {
                if (bossInput[idx] === char) {
                  style = 'text-emerald-400 font-bold bg-emerald-950 px-0.5 rounded';
                } else {
                  style = 'text-rose-400 font-bold bg-rose-950 px-0.5 rounded';
                }
              } else if (idx === bossInput.length) {
                style = 'text-white font-black underline bg-purple-600 px-0.5 rounded animate-pulse';
              }
              return (
                <span key={idx} className={style}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Input Field */}
          <div>
            <input
              type="text"
              value={bossInput}
              onChange={handleBossInputChange}
              disabled={isBossDefeated || isBossTimeUp}
              autoFocus
              placeholder="Type target phrase rapidly to strike the Examiner..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-purple-500/60 text-purple-200 font-mono text-base focus:outline-none ring-2 ring-purple-500/30"
            />
          </div>

          {/* Battle Logs */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            {bossLogs.map((log, idx) => (
              <p key={idx}>{log}</p>
            ))}
          </div>

          {/* Victory Modal */}
          {isBossDefeated && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center space-y-3 z-30 p-6 text-center">
              <Sparkles className="w-12 h-12 text-amber-400 animate-spin" />
              <h3 className="text-2xl font-black text-amber-400">EXAMINER BOSS DEFEATED!</h3>
              <p className="text-xs text-purple-200 max-w-xs">
                You passed all 3 phases of the CPCT Examiner Boss Rush with maximum precision!
              </p>
              <button
                onClick={startBossGame}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl text-xs shadow-lg transition-transform active:scale-95"
              >
                Fight Again
              </button>
            </div>
          )}

          {/* Defeat / Time Up Modal */}
          {isBossTimeUp && !isBossDefeated && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center space-y-3 z-30 p-6 text-center">
              <ShieldAlert className="w-12 h-12 text-rose-500 animate-bounce" />
              <h3 className="text-2xl font-black text-rose-500">TIME EXPIRED!</h3>
              <p className="text-xs text-slate-300 max-w-xs">
                The CPCT Examiner shield remained at {bossHp} HP. Increase typing speed and retry!
              </p>
              <button
                onClick={startBossGame}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl text-xs shadow-lg transition-transform active:scale-95"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
