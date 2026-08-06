import React from 'react';
import { CPCT_PASSAGES, CPCTPassage } from '../data/cpctPassages';
import { FINGER_DRILLS, FingerDrill } from '../data/fingerDrills';
import { getWeakKeys, saveTestResult } from '../lib/storage';
import { soundEngine } from '../lib/audio';
import { TestResult, BackspaceMode } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { RefreshCw, Play, RotateCcw, CheckCircle2, Zap, AlertTriangle, Settings, Target } from 'lucide-react';

interface PracticeSessionProps {
  onFinishPractice: (result: TestResult) => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({ onFinishPractice }) => {
  // Practice Config
  const [practiceType, setPracticeType] = React.useState<'passage' | 'drill' | 'weak_keys' | 'custom'>('passage');
  const [selectedLanguage, setSelectedLanguage] = React.useState<'english' | 'hindi'>('english');
  const [selectedPassageId, setSelectedPassageId] = React.useState<string>(CPCT_PASSAGES[0].id);
  const [selectedDrillId, setSelectedDrillId] = React.useState<string>(FINGER_DRILLS[0].id);
  const [customText, setCustomText] = React.useState<string>('The quick brown fox jumps over the lazy dog.');
  const [durationMinutes, setDurationMinutes] = React.useState<number>(3);
  const [backspaceMode, setBackspaceMode] = React.useState<BackspaceMode>('allowed');

  // Active Session State
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [timeLeft, setTimeLeft] = React.useState<number>(180);
  const [typedText, setTypedText] = React.useState<string>('');
  const [backspaceCount, setBackspaceCount] = React.useState<number>(0);
  const [keyErrors, setKeyErrors] = React.useState<Record<string, number>>({});
  const [lastKeyTime, setLastKeyTime] = React.useState<number>(0);
  const [keyLatencies, setKeyLatencies] = React.useState<Record<string, number>>({});

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const timerRef = React.useRef<any>(null);

  // Derive target passage/text
  const targetText = React.useMemo(() => {
    if (practiceType === 'passage') {
      const p = CPCT_PASSAGES.find(x => x.id === selectedPassageId);
      return p ? p.content : CPCT_PASSAGES[0].content;
    } else if (practiceType === 'drill') {
      const d = FINGER_DRILLS.find(x => x.id === selectedDrillId);
      return d ? d.text : FINGER_DRILLS[0].text;
    } else if (practiceType === 'weak_keys') {
      const weak = getWeakKeys(6);
      return weak.map(k => `${k}${k} ${k}a ${k}o ${k}e ${k}i`).join(' ');
    } else {
      return customText || 'Type this custom text smoothly.';
    }
  }, [practiceType, selectedPassageId, selectedDrillId, customText]);

  // Handle Start
  const handleStart = () => {
    setIsStarted(true);
    setIsFinished(false);
    setTypedText('');
    setBackspaceCount(0);
    setKeyErrors({});
    setKeyLatencies({});
    setTimeLeft(durationMinutes * 60);
    setLastKeyTime(Date.now());

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Timer Tick
  React.useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isStarted, isFinished]);

  // Finish session
  const finishSession = React.useCallback(() => {
    setIsFinished(true);
    setIsStarted(false);
    soundEngine.playSuccessFanfare();

    const timeSpent = (durationMinutes * 60) - timeLeft;
    const timeSpentMin = Math.max(0.1, timeSpent / 60);

    const totalChars = typedText.length;
    let correctCount = 0;
    let uncorrectedErr = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === targetText[i]) {
        correctCount++;
      } else {
        uncorrectedErr++;
      }
    }

    const grossWPM = Math.round((totalChars / 5) / timeSpentMin);
    const netWPM = Math.max(0, Math.round(((totalChars / 5) - uncorrectedErr) / timeSpentMin));
    const accuracy = totalChars > 0 ? Math.round((correctCount / totalChars) * 100) : 100;

    let grade: TestResult['cpctGrade'] = 'Needs Practice (<30 WPM)';
    if (netWPM >= 50) grade = 'Grade A (50+ WPM)';
    else if (netWPM >= 40) grade = 'Grade B (40-49 WPM)';
    else if (netWPM >= 30) grade = 'Grade C (30-39 WPM)';

    const passageTitle = practiceType === 'passage' 
      ? (CPCT_PASSAGES.find(x => x.id === selectedPassageId)?.title || 'CPCT Practice')
      : practiceType === 'drill'
      ? (FINGER_DRILLS.find(x => x.id === selectedDrillId)?.name || 'Finger Drill')
      : practiceType === 'weak_keys'
      ? 'Weak Keys Targeted Drill'
      : 'Custom Practice Session';

    const result: TestResult = {
      id: 'prc_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      mode: practiceType === 'weak_keys' ? 'weak_keys' : 'practice',
      language: selectedLanguage,
      durationSeconds: durationMinutes * 60,
      timeSpentSeconds: Math.round(timeSpent),
      passageTitle,
      totalCharsTyped: totalChars,
      correctCharsTyped: correctCount,
      uncorrectedErrors: uncorrectedErr,
      correctedErrors: backspaceCount,
      backspaceCount,
      grossWPM,
      netWPM,
      accuracy,
      cpctGrade: grade,
      passedCPCT: netWPM >= 30,
      keyErrors,
      keyLatencyMs: keyLatencies
    };

    saveTestResult(result);
    onFinishPractice(result);
  }, [durationMinutes, timeLeft, typedText, targetText, backspaceCount, keyErrors, keyLatencies, practiceType, selectedPassageId, selectedDrillId, selectedLanguage, onFinishPractice]);

  // Process Keystrokes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const now = Date.now();

    // Prevent typing if time ended
    if (timeLeft <= 0) return;

    if (val.length < typedText.length) {
      // Backspace used
      if (backspaceMode === 'restricted') return; // block backspace
      setBackspaceCount(prev => prev + 1);
      soundEngine.playError();
    } else {
      // Character typed
      const charTyped = val[val.length - 1];
      const expectedChar = targetText[val.length - 1];

      if (charTyped === expectedChar) {
        soundEngine.playKeyPress();
      } else {
        soundEngine.playError();
        const lowerChar = expectedChar ? expectedChar.toLowerCase() : 'space';
        setKeyErrors(prev => ({ ...prev, [lowerChar]: (prev[lowerChar] || 0) + 1 }));
      }

      // Latency calculation
      if (lastKeyTime > 0 && expectedChar) {
        const delta = now - lastKeyTime;
        const lowerChar = expectedChar.toLowerCase();
        setKeyLatencies(prev => ({
          ...prev,
          [lowerChar]: Math.round(((prev[lowerChar] || delta) + delta) / 2)
        }));
      }
    }

    setLastKeyTime(now);
    setTypedText(val);

    // Auto finish if completed passage
    if (val.length >= targetText.length) {
      finishSession();
    }
  };

  // Next key expected
  const currentExpectedKey = targetText[typedText.length] || '';

  // Calculate live stats
  const liveTimeSpent = Math.max(1, (durationMinutes * 60) - timeLeft);
  const liveGrossWPM = Math.round((typedText.length / 5) / (liveTimeSpent / 60));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Session Configuration Card (If Not Started) */}
      {!isStarted && !isFinished && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Personalized Practice Session
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Configure your practice parameters to target specific CPCT exam modules or weak keys.
              </p>
            </div>

            <button
              onClick={handleStart}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Practice Session
            </button>
          </div>

          {/* Config Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Practice Type */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Practice Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'passage', label: 'CPCT Passages' },
                  { id: 'drill', label: 'Finger Drills' },
                  { id: 'weak_keys', label: 'Weak Keys Target' },
                  { id: 'custom', label: 'Custom Text' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setPracticeType(t.id as any)}
                    className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                      practiceType === t.id
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Test Language</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedLanguage('english')}
                  className={`p-2.5 rounded-xl border font-semibold transition-all ${
                    selectedLanguage === 'english'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  English CPCT
                </button>
                <button
                  onClick={() => setSelectedLanguage('hindi')}
                  className={`p-2.5 rounded-xl border font-semibold transition-all ${
                    selectedLanguage === 'hindi'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  हिंदी CPCT
                </button>
              </div>
            </div>

            {/* Passage / Drill Picker */}
            {practiceType === 'passage' && (
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Select Passage</label>
                <select
                  value={selectedPassageId}
                  onChange={(e) => setSelectedPassageId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                >
                  {CPCT_PASSAGES.filter(p => p.language === selectedLanguage).map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.category}] {p.title} - ({p.difficulty})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {practiceType === 'drill' && (
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Select Finger Drill</label>
                <select
                  value={selectedDrillId}
                  onChange={(e) => setSelectedDrillId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                >
                  {FINGER_DRILLS.map(d => (
                    <option key={d.id} value={d.id}>
                      [{d.row}] {d.name} ({d.fingerGuide})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {practiceType === 'custom' && (
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Paste Custom Text</label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs"
                  placeholder="Paste your own text passage here..."
                />
              </div>
            )}

            {/* Duration Selector */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Session Duration</label>
              <div className="flex gap-2">
                {[1, 3, 5, 10, 15].map(m => (
                  <button
                    key={m}
                    onClick={() => setDurationMinutes(m)}
                    className={`flex-1 py-2 rounded-xl border font-bold transition-all ${
                      durationMinutes === m
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {m} min
                  </button>
                ))}
              </div>
            </div>

            {/* Backspace Mode */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Backspace Restriction</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setBackspaceMode('allowed')}
                  className={`flex-1 py-2 rounded-xl border font-medium transition-all ${
                    backspaceMode === 'allowed'
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Unrestricted
                </button>
                <button
                  onClick={() => setBackspaceMode('restricted')}
                  className={`flex-1 py-2 rounded-xl border font-medium transition-all ${
                    backspaceMode === 'restricted'
                      ? 'bg-rose-600 text-white border-rose-600 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Strict Blocked
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Typing Interface */}
      {isStarted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Header Stats Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Time Remaining</span>
                <p className="text-xl font-mono font-extrabold text-blue-600 dark:text-blue-400">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Live Gross Speed</span>
                <p className="text-xl font-mono font-bold text-slate-900 dark:text-white">
                  {liveGrossWPM} <span className="text-xs font-normal">WPM</span>
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Backspaces</span>
                <p className="text-xl font-mono font-bold text-amber-500">
                  {backspaceCount}
                </p>
              </div>
            </div>

            <button
              onClick={finishSession}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            >
              End Session Early
            </button>
          </div>

          {/* Passage Display Box with Character Highlight */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-lg leading-relaxed max-h-48 overflow-y-auto select-none tracking-wide">
            {targetText.split('').map((char, index) => {
              let stateClass = 'text-slate-400 dark:text-slate-500';
              if (index < typedText.length) {
                if (typedText[index] === char) {
                  stateClass = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold';
                } else {
                  stateClass = 'bg-rose-500/30 text-rose-600 dark:text-rose-400 underline font-bold';
                }
              } else if (index === typedText.length) {
                stateClass = 'bg-blue-600 text-white font-bold animate-pulse rounded px-0.5';
              }

              return (
                <span key={index} className={stateClass}>
                  {char === ' ' ? ' ' : char}
                </span>
              );
            })}
          </div>

          {/* Hidden/Active Text Input */}
          <div className="relative">
            <textarea
              ref={inputRef}
              value={typedText}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-4 rounded-xl border border-blue-500 dark:border-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base focus:outline-none ring-2 ring-blue-500/30 resize-none shadow-inner"
              placeholder="Keep typing here without pausing..."
            />
          </div>

          {/* Virtual Keyboard */}
          <VirtualKeyboard
            expectedKey={currentExpectedKey}
            showFingerGuide={true}
          />
        </div>
      )}
    </div>
  );
};
