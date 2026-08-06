import React from 'react';
import { CPCT_PASSAGES, CPCTPassage, getExtendedPassageContent, getPassagesByFilter } from '../data/cpctPassages';
import { FINGER_DRILLS, FingerDrill } from '../data/fingerDrills';
import { getWeakKeys, saveTestResult } from '../lib/storage';
import { soundEngine } from '../lib/audio';
import { TestResult, BackspaceMode } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import {
  RefreshCw, Play, RotateCcw, CheckCircle2, Zap, AlertTriangle, Settings, Target,
  FileText, Layers, AlignLeft, Maximize2, Minimize2, Keyboard as KeyboardIcon, Clock
} from 'lucide-react';

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
  const [hasStartedTyping, setHasStartedTyping] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = React.useState<boolean>(true);

  const [timeLeft, setTimeLeft] = React.useState<number>(180);
  const [typedText, setTypedText] = React.useState<string>('');
  const [backspaceCount, setBackspaceCount] = React.useState<number>(0);
  const [keyErrors, setKeyErrors] = React.useState<Record<string, number>>({});
  const [lastKeyTime, setLastKeyTime] = React.useState<number>(0);
  const [keyLatencies, setKeyLatencies] = React.useState<Record<string, number>>({});

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const passageContainerRef = React.useRef<HTMLDivElement>(null);
  const activeCharRef = React.useRef<HTMLSpanElement>(null);
  const timerRef = React.useRef<any>(null);

  // Auto-switch best passage when duration or language changes
  React.useEffect(() => {
    if (practiceType === 'passage') {
      const suitable = getPassagesByFilter(selectedLanguage, durationMinutes);
      if (suitable.length > 0) {
        const currentP = CPCT_PASSAGES.find(p => p.id === selectedPassageId);
        if (!currentP || currentP.language !== selectedLanguage) {
          setSelectedPassageId(suitable[0].id);
        }
      }
    }
  }, [selectedLanguage, durationMinutes, practiceType]);

  // Derive target passage/text with extended paragraph support
  const targetText = React.useMemo(() => {
    if (practiceType === 'passage') {
      const p = CPCT_PASSAGES.find(x => x.id === selectedPassageId) || CPCT_PASSAGES[0];
      return getExtendedPassageContent(p, durationMinutes);
    } else if (practiceType === 'drill') {
      const d = FINGER_DRILLS.find(x => x.id === selectedDrillId);
      return d ? d.text : FINGER_DRILLS[0].text;
    } else if (practiceType === 'weak_keys') {
      const weak = getWeakKeys(6);
      return weak.map(k => `${k}${k} ${k}a ${k}o ${k}e ${k}i`).join(' ');
    } else {
      return customText || 'Type this custom text smoothly.';
    }
  }, [practiceType, selectedPassageId, selectedDrillId, customText, durationMinutes]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Auto-scroll passage view to keep active typing position centered
  React.useEffect(() => {
    if (isStarted && activeCharRef.current && passageContainerRef.current) {
      const charElem = activeCharRef.current;
      const container = passageContainerRef.current;
      const charTop = charElem.offsetTop;
      const containerHeight = container.clientHeight;
      container.scrollTo({
        top: Math.max(0, charTop - containerHeight / 2 + 20),
        behavior: 'smooth'
      });
    }
  }, [typedText.length, isStarted]);

  // Handle Start
  const handleStart = () => {
    setIsStarted(true);
    setHasStartedTyping(false);
    setIsFinished(false);
    setTypedText('');
    setBackspaceCount(0);
    setKeyErrors({});
    setKeyLatencies({});
    setTimeLeft(durationMinutes * 60);
    setLastKeyTime(0);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  // Timer Tick - ONLY starts when user types the first key
  React.useEffect(() => {
    if (isStarted && hasStartedTyping && !isFinished) {
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
  }, [isStarted, hasStartedTyping, isFinished]);

  // Finish session
  const finishSession = React.useCallback(() => {
    setIsFinished(true);
    setIsStarted(false);
    setHasStartedTyping(false);
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
      passedCPCT: netWPM >= (selectedLanguage === 'hindi' ? 20 : 30),
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

    // Start timer on first keystroke
    if (!hasStartedTyping && val.length > 0) {
      setHasStartedTyping(true);
      setLastKeyTime(now);
    }

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
    <div ref={containerRef} className={`max-w-4xl mx-auto space-y-6 ${isFullscreen ? 'p-4 bg-slate-950 text-white min-h-screen fixed inset-0 z-50 overflow-y-auto' : ''}`}>
      {/* Configuration & Selection Card (Always available when test is NOT active) */}
      {!isStarted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Personalized Practice Session
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Configure your options below. The timer will start automatically on your first keystroke!
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Practice Session
            </button>
          </div>

          {/* Config Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Practice Category */}
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

            {/* Passage Selector */}
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

            {/* Drill Selector */}
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

            {/* Custom Text */}
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
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {[1, 3, 5, 10, 15].map(m => (
                  <button
                    key={m}
                    onClick={() => setDurationMinutes(m)}
                    className={`flex-1 min-w-[50px] py-2 rounded-xl border font-bold text-center transition-all ${
                      durationMinutes === m
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Backspace Mode */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Backspace Mode</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setBackspaceMode('allowed')}
                  className={`flex-1 py-2 rounded-xl border font-medium transition-all ${
                    backspaceMode === 'allowed'
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Allowed
                </button>
                <button
                  onClick={() => setBackspaceMode('restricted')}
                  className={`flex-1 py-2 rounded-xl border font-medium transition-all ${
                    backspaceMode === 'restricted'
                      ? 'bg-rose-600 text-white border-rose-600 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Blocked
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Typing Interface */}
      {isStarted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6">
          {/* Header Stats & Timer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Timer Box */}
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${hasStartedTyping ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {hasStartedTyping ? 'Time Remaining' : 'Timer Ready'}
                  </span>
                  <p className="text-xl sm:text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Live WPM</span>
                <p className="text-lg sm:text-xl font-mono font-bold text-slate-900 dark:text-white">
                  {liveGrossWPM} <span className="text-xs font-normal text-slate-400">WPM</span>
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Errors/Del</span>
                <p className="text-lg sm:text-xl font-mono font-bold text-amber-500">
                  {backspaceCount}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Mobile Fullscreen'}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
              </button>

              <button
                onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                title="Toggle Virtual Keyboard"
                className={`p-2 rounded-xl border transition-all text-xs font-medium flex items-center gap-1 ${
                  showVirtualKeyboard
                    ? 'border-blue-500/40 bg-blue-500/10 text-blue-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <KeyboardIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Keyboard</span>
              </button>

              <button
                onClick={finishSession}
                className="px-3 py-2 rounded-xl border border-rose-500/30 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                End Early
              </button>
            </div>
          </div>

          {/* Banner Notice when typing hasn't started yet */}
          {!hasStartedTyping && (
            <div className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
              <Zap className="w-4 h-4 fill-current text-amber-500" />
              <span>Type your first key below — Timer starts automatically when you press any key!</span>
            </div>
          )}

          {/* Passage Display Box with Character & Paragraph Highlight */}
          <div
            ref={passageContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-base sm:text-lg leading-relaxed max-h-56 overflow-y-auto select-none tracking-wide relative scroll-smooth cursor-text"
          >
            {targetText.split('').map((char, index) => {
              const isCurrent = index === typedText.length;
              let stateClass = 'text-slate-400 dark:text-slate-500';
              if (index < typedText.length) {
                if (typedText[index] === char) {
                  stateClass = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold';
                } else {
                  stateClass = 'bg-rose-500/30 text-rose-600 dark:text-rose-400 underline font-bold';
                }
              } else if (isCurrent) {
                stateClass = 'bg-indigo-600 text-white font-bold animate-pulse rounded px-0.5 shadow-sm';
              }

              if (char === '\n') {
                return (
                  <span
                    key={index}
                    ref={isCurrent ? activeCharRef : undefined}
                    className={`${stateClass} inline-block w-full my-1 font-sans text-xs text-indigo-500 font-bold opacity-80`}
                  >
                    ⏎ [Paragraph Break - Press Enter]
                  </span>
                );
              }

              return (
                <span
                  key={index}
                  ref={isCurrent ? activeCharRef : undefined}
                  className={stateClass}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-150"
              style={{ width: `${Math.min(100, (typedText.length / Math.max(1, targetText.length)) * 100)}%` }}
            />
          </div>

          {/* Active Text Input */}
          <div className="relative">
            <textarea
              ref={inputRef}
              value={typedText}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 sm:p-4 rounded-xl border border-blue-500 dark:border-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm sm:text-base focus:outline-none ring-2 ring-blue-500/30 resize-none shadow-inner"
              placeholder={selectedLanguage === 'hindi' ? 'यहाँ टाइप करना शुरू करें...' : 'Start typing here...'}
              autoFocus
            />
          </div>

          {/* Virtual Keyboard */}
          {showVirtualKeyboard && (
            <VirtualKeyboard
              expectedKey={currentExpectedKey}
              showFingerGuide={true}
            />
          )}
        </div>
      )}
    </div>
  );
};
