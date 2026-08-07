import React from 'react';
import { soundEngine } from '../lib/audio';
import { Gamepad2, Flame, ShieldAlert, Trophy, Play, RotateCcw, Zap, Sparkles, Clock, Target, ArrowRight, Award, ChevronRight, Keyboard, Activity, Gauge } from 'lucide-react';

interface GamifiedChallengesProps {
  onAwardBadge?: (badgeId: string) => void;
}

// Word Banks for Falling Word Defender
const EASY_WORDS = ['cpct', 'exam', 'test', 'type', 'hand', 'fast', 'home', 'font', 'desk', 'keys', 'form', 'page', 'code', 'data', 'text', 'line', 'user', 'word', 'time', 'gold'];
const MEDIUM_WORDS = ['speed', 'rhythm', 'anchor', 'finger', 'system', 'record', 'office', 'mponline', 'result', 'script', 'smooth', 'typing', 'report', 'format', 'screen', 'layout'];
const HARD_WORDS = ['accuracy', 'keyboard', 'district', 'governor', 'computer', 'practice', 'guidance', 'hardware', 'network', 'tactical', 'training', 'protocol', 'statute'];
const EXTREME_WORDS = ['certification', 'mponline2026', 'government', 'proficiency', 'qualification', 'cpctmaster2026', 'typingmaster', 'administration', 'jurisdiction'];

// 12 Unique Increasing Difficulty Levels for Game 2 (Accuracy Streak Sprint)
const STREAK_LEVELS = [
  {
    level: 1,
    name: 'Level 1: Home Row Baseline',
    text: 'asdf jkl; asdf jkl; a s d f j k l ;'
  },
  {
    level: 2,
    name: 'Level 2: Top Row Keys',
    text: 'qwer tyui op qwert yuiop q w e r t y u i o p'
  },
  {
    level: 3,
    name: 'Level 3: Bottom Row Keys',
    text: 'zxcv bnm zxcvbnm z x c v b n m'
  },
  {
    level: 4,
    name: 'Level 4: Full Alphabet Flow',
    text: 'the quick brown fox jumps over the lazy dog'
  },
  {
    level: 5,
    name: 'Level 5: Capitalization & Shift Keys',
    text: 'CPCT Exam Practice Madhya Pradesh Online Govt Test'
  },
  {
    level: 6,
    name: 'Level 6: Number Row Drills',
    text: '12345 67890 98765 43210 2026 15min 30wpm'
  },
  {
    level: 7,
    name: 'Level 7: Punctuation & Symbols',
    text: 'typing.speed = (words - errors) / time; // test!'
  },
  {
    level: 8,
    name: 'Level 8: Alphanumeric Official Codes',
    text: 'MP-GOVT-2026 @Dept_IT #Desk_30 WPM_45%'
  },
  {
    level: 9,
    name: 'Level 9: Revenue Collectorate Sentences',
    text: 'Collectorate District Office Branch Entry No. 894/2026.'
  },
  {
    level: 10,
    name: 'Level 10: Master Overdrive Mix',
    text: 'CPCT_Master! 50+ WPM @Grade-A Certificate [100% Accuracy]'
  },
  {
    level: 11,
    name: 'Level 11: Hindi Remington/Inscript Warmup',
    text: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म'
  },
  {
    level: 12,
    name: 'Level 12: Supreme Speed Master',
    text: 'IN THE HIGH COURT OF MP: WRIT PETITION NO. 4082/2026 @100%'
  }
];

// CPCT Turbo Speedometer Sentences Stream for Game 3
const TURBO_SENTENCES = [
  'Madhya Pradesh CPCT examination evaluates net speed and accuracy under 15 minutes of continuous typing.',
  'Maintaining rhythmic touch typing on the home row keys drastically improves typing WPM and reduces finger stress.',
  'Public sector governance relies heavily on error-free digital document entries, e-offices, and land revenue databases.',
  'Achieving 50+ Net WPM unlocks Grade A Certification for computer operators and stenographer positions in MP Govt.',
  'Regular typing speed sprints with dynamic WPM feedback build supreme confidence and eliminate exam day anxiety.'
];

export const GamifiedChallenges: React.FC<GamifiedChallengesProps> = ({ onAwardBadge }) => {
  const [activeGame, setActiveGame] = React.useState<'none' | 'meteor' | 'streak' | 'turbo'>('none');

  // ==========================================
  // GAME 1: FALLING WORD DEFENDER (CONTINUOUS UNTIL 0 LIVES)
  // ==========================================
  const [words, setWords] = React.useState<{ id: number; text: string; top: number; left: number; speed: number; level: number }[]>([]);
  const [typedInput, setTypedInput] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [wordsDestroyed, setWordsDestroyed] = React.useState(0);
  const [combo, setCombo] = React.useState(1);
  const [lives, setLives] = React.useState(3);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [meteorGameTime, setMeteorGameTime] = React.useState(0);
  const [hasStartedTypingMeteor, setHasStartedTypingMeteor] = React.useState(false);
  const [explosions, setExplosions] = React.useState<{ id: number; left: number; top: number; text: string }[]>([]);

  // Calculate current difficulty tier based on time survived in Meteor Defender
  const meteorLevel = Math.min(5, Math.floor(meteorGameTime / 15) + 1);

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

  // Smooth Game Loop using requestAnimationFrame
  const updateMeteorGame = (timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000; // in seconds
    lastTimeRef.current = timestamp;

    if (activeGame === 'meteor' && !isGameOver && hasStartedTypingMeteor) {
      // Update survival time
      setMeteorGameTime(t => t + delta);

      const level = Math.min(5, Math.floor(meteorGameTime / 15) + 1);
      const fallSpeedPercentPerSec = level === 1 ? 7 : level === 2 ? 11 : level === 3 ? 16 : level === 4 ? 22 : 28;
      const spawnIntervalSec = level === 1 ? 2.2 : level === 2 ? 1.6 : level === 3 ? 1.2 : level === 4 ? 0.9 : 0.7;
      const maxWords = Math.min(6, level + 2);

      // Continuous infinite spawn check
      if (timestamp - lastSpawnRef.current > spawnIntervalSec * 1000) {
        lastSpawnRef.current = timestamp;
        setWords(prev => {
          if (prev.length < maxWords) {
            let pool = EASY_WORDS;
            if (level === 2) pool = [...EASY_WORDS, ...MEDIUM_WORDS];
            else if (level === 3) pool = [...MEDIUM_WORDS, ...HARD_WORDS];
            else if (level >= 4) pool = [...HARD_WORDS, ...EXTREME_WORDS];

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
      let hitBottom = false;
      setWords(prevWords => {
        const nextWords: typeof prevWords = [];
        for (const w of prevWords) {
          const newTop = w.top + w.speed * delta;
          if (newTop >= 82) {
            hitBottom = true;
          } else {
            nextWords.push({ ...w, top: newTop });
          }
        }
        return nextWords;
      });

      if (hitBottom) {
        soundEngine.playError();
        setCombo(1);
        setLives(l => Math.max(0, l - 1));
      }

      reqRef.current = requestAnimationFrame(updateMeteorGame);
    } else if (activeGame === 'meteor' && !isGameOver && !hasStartedTypingMeteor) {
      // Waiting for first keystroke - keep loop alive
      reqRef.current = requestAnimationFrame(updateMeteorGame);
    }
  };

  React.useEffect(() => {
    if (activeGame === 'meteor' && lives <= 0 && !isGameOver) {
      setIsGameOver(true);
    }
  }, [activeGame, lives, isGameOver]);

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

    // Check if input matches any falling word exactly
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
      setWordsDestroyed(w => w + 1);
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
    setWordsDestroyed(0);
    setCombo(1);
    setLives(3);
    setIsGameOver(false);
    setTypedInput('');
    setMeteorGameTime(0);
    setHasStartedTypingMeteor(false);
    setExplosions([]);
  };


  // ==========================================
  // GAME 2: ACCURACY STREAK SPRINT (10+ LEVELS, WRONG KEY RESETS TO LEVEL 1)
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
      setStreakTimer(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeGame, hasStartedTypingStreak]);

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
      const nextCount = streakCount + 1;
      setStreakCount(nextCount);
      if (nextCount > bestStreak) setBestStreak(nextCount);
      if (nextCount >= 100 && onAwardBadge) onAwardBadge('streak_100');

      // Complete current stage -> Advance to next difficulty level!
      if (val.length >= targetText.length) {
        soundEngine.playSuccessFanfare();
        if (streakStageIdx < STREAK_LEVELS.length - 1) {
          setStreakStageIdx(s => s + 1);
          setStreakInput('');
        } else {
          // Mastered all 12 levels! Loop around with higher speed requirement
          setStreakStageIdx(0);
          setStreakInput('');
          if (onAwardBadge) onAwardBadge('streak_master');
        }
      }
    } else {
      // WRONG KEY PRESSED -> RESET STREAK AND RESTART FROM LEVEL 1!
      soundEngine.playError();
      setStreakError(true);
      setStreakCount(0); // Reset streak counter
      setStreakStageIdx(0); // RESTART FROM DIFFICULTY LEVEL 1
      setStreakInput(''); // Clear input
      setTimeout(() => setStreakError(false), 800);
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
  // GAME 3: CPCT TURBO WPM SPEEDOMETER SURGE (45-SEC SPEED BLITZ)
  // ==========================================
  const [turboTimer, setTurboTimer] = React.useState(45);
  const [hasStartedTypingTurbo, setHasStartedTypingTurbo] = React.useState(false);
  const [isTurboFinished, setIsTurboFinished] = React.useState(false);
  const [sentenceIdx, setSentenceIdx] = React.useState(0);
  const [turboInput, setTurboInput] = React.useState('');
  const [totalTypedChars, setTotalTypedChars] = React.useState(0);
  const [correctTypedChars, setCorrectTypedChars] = React.useState(0);
  const [nitroCombo, setNitroCombo] = React.useState(0);
  const [peakWpm, setPeakWpm] = React.useState(0);

  const activeTurboSentence = TURBO_SENTENCES[sentenceIdx % TURBO_SENTENCES.length];

  // Calculate live WPM
  const timeElapsedMin = Math.max(0.05, (45 - turboTimer) / 60);
  const liveNetWpm = hasStartedTypingTurbo
    ? Math.max(0, Math.round((correctTypedChars / 5) / timeElapsedMin))
    : 0;

  // Track peak WPM
  React.useEffect(() => {
    if (liveNetWpm > peakWpm) setPeakWpm(liveNetWpm);
  }, [liveNetWpm, peakWpm]);

  // Turbo Countdown Timer
  React.useEffect(() => {
    if (activeGame !== 'turbo' || !hasStartedTypingTurbo || isTurboFinished) return;

    const timer = setInterval(() => {
      setTurboTimer(t => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeGame, hasStartedTypingTurbo, isTurboFinished]);

  React.useEffect(() => {
    if (activeGame === 'turbo' && hasStartedTypingTurbo && !isTurboFinished && turboTimer === 0) {
      setIsTurboFinished(true);
      soundEngine.playSuccessFanfare();
      if (liveNetWpm >= 50 && onAwardBadge) onAwardBadge('speed_demon');
    }
  }, [activeGame, hasStartedTypingTurbo, isTurboFinished, turboTimer, liveNetWpm, onAwardBadge]);

  const handleTurboInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTurboInput(val);

    if (!hasStartedTypingTurbo && val.length > 0) {
      setHasStartedTypingTurbo(true);
    }

    if (val.length === 0) return;

    const expectedChar = activeTurboSentence[val.length - 1];
    const actualChar = val[val.length - 1];

    setTotalTypedChars(c => c + 1);

    if (expectedChar === actualChar) {
      soundEngine.playKeyPress();
      setCorrectTypedChars(c => c + 1);
      setNitroCombo(c => c + 1);

      // Complete sentence -> loop seamlessly to next sentence
      if (val.length >= activeTurboSentence.length) {
        soundEngine.playKeyPress();
        setSentenceIdx(i => i + 1);
        setTurboInput('');
      }
    } else {
      soundEngine.playError();
      setNitroCombo(0); // Reset nitro combo on mistake
    }
  };

  const startTurboGame = () => {
    setActiveGame('turbo');
    setTurboTimer(45);
    setHasStartedTypingTurbo(false);
    setIsTurboFinished(false);
    setSentenceIdx(0);
    setTurboInput('');
    setTotalTypedChars(0);
    setCorrectTypedChars(0);
    setNitroCombo(0);
    setPeakWpm(0);
  };

  // Speedometer Needle Rotation Angle (-90 deg to +90 deg)
  const needleAngle = Math.min(90, Math.max(-90, -90 + (liveNetWpm / 80) * 180));

  // WPM Grade Color
  const getWpmColor = (wpm: number) => {
    if (wpm >= 50) return 'text-purple-400 border-purple-500 shadow-purple-500/50';
    if (wpm >= 40) return 'text-blue-400 border-blue-500 shadow-blue-500/50';
    if (wpm >= 30) return 'text-emerald-400 border-emerald-500 shadow-emerald-500/50';
    return 'text-amber-400 border-amber-500 shadow-amber-500/50';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Game Mode Picker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl text-slate-900 dark:text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> CPCT Interactive Arcade
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">Keyboard Speed & Accuracy Games</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Polished gamified training modules designed to boost your finger rhythm, speed, and accuracy!
            </p>
          </div>

          {activeGame !== 'none' && (
            <button
              onClick={() => setActiveGame('none')}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Exit Game
            </button>
          )}
        </div>

        {/* 3 Game Selector Cards */}
        {activeGame === 'none' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Game 1: Falling Word Defender */}
            <div
              onClick={startMeteorGame}
              className="group p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/40 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 group-hover:scale-110 transition-transform">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Infinite Survival
                </span>
              </div>
              <h3 className="text-lg font-black text-amber-300 mb-1">1. Falling Word Defender</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Type words continuously before they hit the ground. Words spawn infinitely until all 3 lives are lost!
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-amber-500/20 text-xs font-bold text-amber-400">
                <span>Play Defender</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Game 2: Accuracy Streak Sprint */}
            <div
              onClick={startStreakGame}
              className="group p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  12 Difficulty Stages
                </span>
              </div>
              <h3 className="text-lg font-black text-emerald-300 mb-1">2. Accuracy Streak Sprint</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Type with 100% precision through 12 unique levels. Any single mistake resets your streak & restarts at Level 1!
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20 text-xs font-bold text-emerald-400">
                <span>Start Precision Run</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Game 3: CPCT Turbo WPM Speedometer Surge */}
            <div
              onClick={startTurboGame}
              className="group p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950/40 border border-purple-500/30 hover:border-purple-400 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden text-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 group-hover:scale-110 transition-transform">
                  <Gauge className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  45s Speed Blitz
                </span>
              </div>
              <h3 className="text-lg font-black text-purple-300 mb-1">3. CPCT Turbo Speedometer Surge</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                High-octane speed challenge with a live animated WPM Speedometer needle. Push your engine into Grade A (50+ WPM)!
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-purple-500/20 text-xs font-bold text-purple-400">
                <span>Launch Speed Engine</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* GAME 1 CANVAS: FALLING WORD DEFENDER */}
      {/* ========================================================= */}
      {activeGame === 'meteor' && (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 sm:p-6 text-white shadow-2xl space-y-4 relative overflow-hidden min-h-[460px] flex flex-col">
          {/* Header HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-xs">
                Level {meteorLevel}
              </span>
              <div>
                <h3 className="text-lg font-black text-amber-300">Falling Word Defender</h3>
                <span className="text-[10px] text-slate-400">Infinite survival mode • Destroy words before impact</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 text-xs font-mono">
              <span>Score: <strong className="text-amber-400 text-base font-black">{score}</strong></span>
              <span>Words: <strong className="text-emerald-400 font-bold">{wordsDestroyed}</strong></span>
              <span>Combo: <strong className="text-purple-300 font-bold">x{combo}</strong></span>
              <span>Time: <strong className="text-white font-bold">{Math.floor(meteorGameTime)}s</strong></span>
              <span className="text-rose-400 font-bold">Lives: {'❤️'.repeat(lives)}</span>
            </div>
          </div>

          {/* First Keystroke Banner */}
          {!hasStartedTypingMeteor && !isGameOver && (
            <div className="bg-amber-500/20 border border-amber-400/50 rounded-xl p-3 text-center text-amber-300 text-xs font-bold animate-pulse flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              ⏱ Start typing any word in the box below to trigger timer & falling words!
            </div>
          )}

          {/* Interactive Field */}
          <div className="relative flex-1 w-full min-h-[260px] overflow-hidden rounded-xl bg-slate-900/60 border border-slate-800 p-2">
            {words.map(w => {
              const isPrefixMatch = typedInput.length > 0 && w.text.startsWith(typedInput);
              return (
                <div
                  key={w.id}
                  style={{ top: `${w.top}%`, left: `${w.left}%` }}
                  className={`absolute px-3 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-black shadow-lg transition-transform ${
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
                className="absolute font-mono font-black text-emerald-400 animate-bounce text-xs bg-emerald-950 border border-emerald-400 px-2 py-0.5 rounded-full shadow-lg z-20 pointer-events-none"
              >
                💥 +{10 * combo} {exp.text}!
              </div>
            ))}

            {/* Game Over Screen */}
            {isGameOver && (
              <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center space-y-3 z-30 p-6 text-center animate-in zoom-in-95">
                <ShieldAlert className="w-12 h-12 text-rose-500 animate-pulse" />
                <h3 className="text-2xl font-black text-rose-500">Defenses Compromised!</h3>
                <p className="text-xs text-slate-300 max-w-xs">
                  All 3 lives were lost! You survived for <strong className="text-white">{Math.floor(meteorGameTime)}s</strong> and destroyed <strong className="text-emerald-400">{wordsDestroyed} words</strong>.
                </p>
                <div className="text-xl font-black text-amber-400 font-mono">
                  Final Score: {score} PTS
                </div>
                <button
                  onClick={startMeteorGame}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg transition-transform active:scale-95"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          {/* Typing Input Box */}
          <div className="pt-2 border-t border-slate-800">
            <input
              type="text"
              value={typedInput}
              onChange={handleMeteorInputChange}
              disabled={isGameOver}
              autoFocus
              placeholder="Type falling word to destroy it (e.g. cpct, test, speed)..."
              className="w-full p-3 rounded-xl bg-slate-900 border border-amber-500/50 text-amber-300 font-mono text-sm focus:outline-none ring-2 ring-amber-500/30"
            />
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* GAME 2 CANVAS: ACCURACY STREAK SPRINT (12 STAGES, RESET TO LEVEL 1 ON MISTAKE) */}
      {/* ========================================================= */}
      {activeGame === 'streak' && (
        <div className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-xl space-y-4 text-slate-900 dark:text-white transition-colors duration-200 ${
          streakError ? 'border-rose-500 ring-4 ring-rose-500/20' : 'border-emerald-500/40'
        }`}>
          {/* Header HUD */}
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-600 dark:text-emerald-400 font-black text-xs inline-block mb-1">
                {currentStreakLevel.name}
              </span>
              <h3 className="text-lg font-black flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" /> Accuracy Streak Sprint
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span>Streak: <strong className="text-emerald-500 text-lg font-black">{streakCount}</strong></span>
              <span>Best: <strong className="text-blue-500 text-lg font-black">{bestStreak}</strong></span>
              <span>Time: <strong className="text-slate-800 dark:text-slate-200">{streakTimer}s</strong></span>
            </div>
          </div>

          {/* Error Reset Warning Banner */}
          {streakError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-600 dark:text-rose-400 text-xs font-extrabold text-center animate-bounce">
              ⚠️ WRONG KEY PRESSED! STREAK RESET TO 0 & DIFFICULTY RESTARTED AT LEVEL 1!
            </div>
          )}

          {/* First Keystroke Notice */}
          {!hasStartedTypingStreak && !streakError && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
              <Clock className="w-4 h-4" /> ⏱ Timer starts on your first keypress! One wrong key resets back to Level 1.
            </div>
          )}

          {/* Level Progress Indicator */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Difficulty Stage {streakStageIdx + 1} of 12</span>
              <span>{Math.round(((streakStageIdx + 1) / 12) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((streakStageIdx + 1) / 12) * 100}%` }}
              />
            </div>
          </div>

          {/* Target Text Stream & Input */}
          <div className="space-y-3">
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

            <input
              type="text"
              value={streakInput}
              onChange={handleStreakInputChange}
              autoFocus
              placeholder="Type character by character with 100% precision..."
              className="w-full p-3.5 rounded-xl border border-emerald-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-base focus:outline-none ring-2 ring-emerald-500/30"
            />
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* GAME 3 CANVAS: CPCT TURBO SPEEDOMETER SURGE */}
      {/* ========================================================= */}
      {activeGame === 'turbo' && (
        <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 text-white shadow-2xl space-y-6 relative overflow-hidden">
          {/* Header HUD */}
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-500/60 text-purple-300 font-black text-xs">
                45-Sec Speed Engine Surge
              </span>
              <h3 className="text-xl font-black text-white mt-1 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-purple-400" /> CPCT Turbo Speedometer Surge
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 text-amber-400 font-black text-base">
                <Clock className="w-4 h-4" /> {turboTimer}s Left
              </span>
              <button
                onClick={startTurboGame}
                className="text-xs text-purple-300 flex items-center gap-1 hover:underline font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Engine
              </button>
            </div>
          </div>

          {/* First Keystroke Banner */}
          {!hasStartedTypingTurbo && !isTurboFinished && (
            <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/50 text-purple-300 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
              <Clock className="w-4 h-4 text-purple-300" /> ⏱ Engine on standby! Start typing the text below to ignite the WPM Speedometer!
            </div>
          )}

          {/* Speedometer Gauge & Live HUD Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            {/* Speedometer Dial Container */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="w-40 h-24 border-t-8 border-l-8 border-r-8 border-slate-800 rounded-t-full relative flex items-end justify-center overflow-hidden">
                {/* Dial Color Tiers Arc */}
                <div className="absolute inset-0 border-t-8 border-emerald-500 opacity-80" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }} />
                
                {/* Speedometer Needle */}
                <div
                  className="w-1 h-16 bg-gradient-to-t from-amber-400 to-rose-500 origin-bottom transition-transform duration-200 rounded-full shadow-lg"
                  style={{ transform: `rotate(${needleAngle}deg)` }}
                />
                <div className="w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-950 absolute bottom-0 z-10" />
              </div>

              <div className="text-center mt-2">
                <span className={`text-3xl font-black font-mono ${getWpmColor(liveNetWpm)}`}>
                  {liveNetWpm} <span className="text-xs text-slate-400">WPM</span>
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Live Engine Speed
                </span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Peak Speed Hit</span>
                <span className="text-lg font-black text-amber-400">{peakWpm} WPM</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Nitro Combo</span>
                <span className="text-lg font-black text-emerald-400">x{nitroCombo}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Accuracy</span>
                <span className="text-lg font-black text-purple-300">
                  {totalTypedChars > 0 ? Math.round((correctTypedChars / totalTypedChars) * 100) : 100}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CPCT Target</span>
                <span className="text-lg font-black text-blue-400">30+ Grade C</span>
              </div>
            </div>

            {/* Nitro Boost Engine Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-purple-300">Nitro Engine Boost</span>
                <span className="text-amber-400">{nitroCombo >= 40 ? 'MAX NITRO 3.0x!' : nitroCombo >= 20 ? 'NITRO 2.0x' : '1.0x Standard'}</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-purple-500 via-blue-500 to-amber-400 h-full transition-all duration-200"
                  style={{ width: `${Math.min(100, (nitroCombo / 40) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Typing Target Stream & Input */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/40 font-mono text-base text-purple-200 leading-relaxed select-none">
              {activeTurboSentence.split('').map((char, idx) => {
                let style = 'text-slate-500';
                if (idx < turboInput.length) {
                  if (turboInput[idx] === char) {
                    style = 'text-emerald-400 font-bold bg-emerald-950 px-0.5 rounded';
                  } else {
                    style = 'text-rose-400 font-bold bg-rose-950 px-0.5 rounded';
                  }
                } else if (idx === turboInput.length) {
                  style = 'text-white font-black underline bg-purple-600 px-0.5 rounded animate-pulse';
                }
                return (
                  <span key={idx} className={style}>
                    {char}
                  </span>
                );
              })}
            </div>

            <input
              type="text"
              value={turboInput}
              onChange={handleTurboInputChange}
              disabled={isTurboFinished}
              autoFocus
              placeholder="Type continuously to rev up your WPM Speedometer..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-purple-500/60 text-purple-200 font-mono text-base focus:outline-none ring-2 ring-purple-500/30"
            />
          </div>

          {/* Finish Summary Modal */}
          {isTurboFinished && (
            <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center space-y-3 z-30 p-6 text-center animate-in zoom-in-95">
              <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
              <h3 className="text-2xl font-black text-amber-400">SPEED BLITZ COMPLETE!</h3>
              <p className="text-xs text-purple-200 max-w-xs">
                Final Net Speed: <strong className="text-white text-base">{liveNetWpm} WPM</strong> • Peak Speed: <strong className="text-amber-400 text-base">{peakWpm} WPM</strong>
              </p>
              <div className="px-4 py-2 rounded-xl bg-purple-950 border border-purple-500 text-purple-300 font-mono text-xs font-bold">
                {liveNetWpm >= 50 ? '🏅 Grade A Master Qualification!' : liveNetWpm >= 40 ? '🥈 Grade B Distinction Qualification!' : liveNetWpm >= 30 ? '🥉 Grade C Pass Qualification!' : '⚡ Practice to reach 30+ WPM!'}
              </div>
              <button
                onClick={startTurboGame}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl text-xs shadow-lg transition-transform active:scale-95"
              >
                Race Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
