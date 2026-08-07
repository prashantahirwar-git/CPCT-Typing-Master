import React from 'react';
import { CPCT_PASSAGES, CPCTPassage, getExtendedPassageContent, getPassagesByFilter } from '../data/cpctPassages';
import { TestResult, BackspaceMode } from '../types';
import { soundEngine } from '../lib/audio';
import { saveTestResult } from '../lib/storage';
import { VirtualKeyboard } from './VirtualKeyboard';
import { convertEnglishToRemingtonHindi, getEnglishKeyHintForHindi } from '../lib/hindiRemington';
import {
  Award, Clock, ShieldAlert, Play, AlertCircle, FileText, CheckCircle2, AlignLeft,
  Maximize2, Minimize2, Keyboard as KeyboardIcon, Zap
} from 'lucide-react';

interface SimulatedExamTestProps {
  studentName: string;
  onExamComplete: (result: TestResult) => void;
}

export const SimulatedExamTest: React.FC<SimulatedExamTestProps> = ({
  studentName,
  onExamComplete
}) => {
  const [selectedLang, setSelectedLang] = React.useState<'english' | 'hindi'>('english');
  const [selectedPassageId, setSelectedPassageId] = React.useState<string>(CPCT_PASSAGES[0].id);
  const [examDurationMinutes, setExamDurationMinutes] = React.useState<number>(15); // 15 min CPCT official
  const [strictBackspace, setStrictBackspace] = React.useState<boolean>(true);

  // Exam Active State
  const [isExamStarted, setIsExamStarted] = React.useState<boolean>(false);
  const [hasStartedTyping, setHasStartedTyping] = React.useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = React.useState<boolean>(true);

  const [timeLeftSeconds, setTimeLeftSeconds] = React.useState<number>(15 * 60);
  const [typedText, setTypedText] = React.useState<string>('');
  const [backspaceCount, setBackspaceCount] = React.useState<number>(0);
  const [keyErrors, setKeyErrors] = React.useState<Record<string, number>>({});

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const passageContainerRef = React.useRef<HTMLDivElement>(null);
  const activeCharRef = React.useRef<HTMLSpanElement>(null);
  const timerRef = React.useRef<any>(null);

  // Toggle Fullscreen Mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Auto switch suitable passage when language or exam time changes
  React.useEffect(() => {
    const suitable = getPassagesByFilter(selectedLang, examDurationMinutes);
    if (suitable.length > 0) {
      const current = CPCT_PASSAGES.find(p => p.id === selectedPassageId);
      if (!current || current.language !== selectedLang) {
        setSelectedPassageId(suitable[0].id);
      }
    }
  }, [selectedLang, examDurationMinutes]);

  const activePassage = React.useMemo(() => {
    return CPCT_PASSAGES.find(p => p.id === selectedPassageId) || CPCT_PASSAGES[0];
  }, [selectedPassageId]);

  // Extended text for infinite smooth flow
  const targetText = React.useMemo(() => {
    return getExtendedPassageContent(activePassage, examDurationMinutes);
  }, [activePassage, examDurationMinutes]);

  // Auto-scroll passage view to keep active typing character in view
  React.useEffect(() => {
    if (isExamStarted && activeCharRef.current && passageContainerRef.current) {
      const charElem = activeCharRef.current;
      const container = passageContainerRef.current;
      const charTop = charElem.offsetTop;
      const containerHeight = container.clientHeight;
      container.scrollTo({
        top: Math.max(0, charTop - containerHeight / 2 + 20),
        behavior: 'smooth'
      });
    }
  }, [typedText.length, isExamStarted]);

  // Start Exam
  const handleStartExam = () => {
    setIsExamStarted(true);
    setHasStartedTyping(false);
    setTypedText('');
    setBackspaceCount(0);
    setKeyErrors({});
    setTimeLeftSeconds(examDurationMinutes * 60);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  // Finish Exam
  const finishExam = React.useCallback(() => {
    setIsExamStarted(false);
    setHasStartedTyping(false);
    soundEngine.playSuccessFanfare();

    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);

    const timeSpent = (examDurationMinutes * 60) - timeLeftSeconds;
    const timeSpentMin = Math.max(0.1, timeSpent / 60);

    const totalChars = typedText.length;
    let correctChars = 0;
    let uncorrectedErr = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === targetText[i]) {
        correctChars++;
      } else {
        uncorrectedErr++;
      }
    }

    const grossWPM = Math.round((totalChars / 5) / timeSpentMin);
    const netWPM = Math.max(0, Math.round(((totalChars / 5) - uncorrectedErr) / timeSpentMin));
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    let grade: TestResult['cpctGrade'] = 'Needs Practice (<30 WPM)';
    if (netWPM >= 50) grade = 'Grade A (50+ WPM)';
    else if (netWPM >= 40) grade = 'Grade B (40-49 WPM)';
    else if (netWPM >= 30) grade = 'Grade C (30-39 WPM)';

    const result: TestResult = {
      id: 'exam_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      mode: 'simulated_exam',
      language: selectedLang,
      durationSeconds: examDurationMinutes * 60,
      timeSpentSeconds: Math.round(timeSpent),
      passageTitle: activePassage.title,
      totalCharsTyped: totalChars,
      correctCharsTyped: correctChars,
      uncorrectedErrors: uncorrectedErr,
      correctedErrors: backspaceCount,
      backspaceCount,
      grossWPM,
      netWPM,
      accuracy,
      cpctGrade: grade,
      passedCPCT: netWPM >= (selectedLang === 'hindi' ? 20 : 30),
      keyErrors
    };

    saveTestResult(result);
    onExamComplete(result);
  }, [examDurationMinutes, timeLeftSeconds, typedText, targetText, activePassage, backspaceCount, keyErrors, selectedLang, onExamComplete]);

  // Timer Tick - ONLY ticks down when user starts typing
  React.useEffect(() => {
    if (isExamStarted && hasStartedTyping) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isExamStarted, hasStartedTyping]);

  // Finish exam when timer reaches 0
  React.useEffect(() => {
    if (isExamStarted && hasStartedTyping && timeLeftSeconds === 0) {
      finishExam();
    }
  }, [timeLeftSeconds, isExamStarted, hasStartedTyping, finishExam]);

  // Handle Keystrokes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    // Start exam timer on first character typed
    if (!hasStartedTyping && val.length > 0) {
      setHasStartedTyping(true);
    }

    if (val.length < typedText.length) {
      // Backspace pressed
      if (strictBackspace) {
        // Official CPCT Strict Rule: Cannot backspace into previous words after space
        const lastSpaceIdxInOld = typedText.lastIndexOf(' ');
        if (lastSpaceIdxInOld !== -1 && val.length <= lastSpaceIdxInOld) {
          soundEngine.playError();
          // Block backspace into previous word!
          return;
        }
      }
      soundEngine.playKeyPress();
      setBackspaceCount(prev => prev + 1);
      setTypedText(val);
    } else {
      let newTypedText = val;

      if (selectedLang === 'hindi') {
        // Convert physical QWERTY keystrokes into Remington Gail Hindi
        const englishTypedPart = val.slice(typedText.length);
        const hindiConvertedPart = convertEnglishToRemingtonHindi(englishTypedPart);
        newTypedText = typedText + hindiConvertedPart;
      }

      const charTyped = newTypedText[newTypedText.length - 1];
      const expectedChar = targetText[newTypedText.length - 1];

      if (charTyped === expectedChar) {
        soundEngine.playKeyPress();
      } else {
        soundEngine.playError();
        const lowerChar = expectedChar ? expectedChar.toLowerCase() : 'space';
        setKeyErrors(prev => ({ ...prev, [lowerChar]: (prev[lowerChar] || 0) + 1 }));
      }

      setTypedText(newTypedText);

      if (newTypedText.length >= targetText.length) {
        finishExam();
      }
    }
  };

  const nextExpectedKey = targetText[typedText.length] || '';

  return (
    <div ref={containerRef} className={`max-w-5xl mx-auto space-y-6 ${isFullscreen ? 'p-4 bg-slate-950 text-white min-h-screen fixed inset-0 z-50 overflow-y-auto' : ''}`}>
      {/* CPCT Exam Portal Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">
                MP CPCT Official Simulation Environment
              </span>
              <h2 className="text-lg sm:text-xl font-bold">Simulated CPCT Speed Examination</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[9px] uppercase">Candidate Name</span>
              <span className="font-semibold text-white">{studentName}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[9px] uppercase">Roll ID</span>
              <span className="font-mono text-blue-400">CPCT-2026-9042</span>
            </div>
          </div>
        </div>

        {/* Instructions banner */}
        {!isExamStarted && (
          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <strong className="text-blue-400 block mb-1">⏱ Test Timer Rule:</strong>
              The exam timer will ONLY start when you type your first letter.
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <strong className="text-emerald-400 block mb-1">📊 Passing Standard:</strong>
              Minimum 30 Net WPM required for English & 20 WPM for Hindi.
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <strong className="text-amber-400 block mb-1">⚠️ Backspace Penalty:</strong>
              Uncorrected mistakes deduct directly from Net WPM speed score.
            </div>
          </div>
        )}
      </div>

      {/* Exam Pre-Start Setup Form (Always rendered when NOT in active exam) */}
      {!isExamStarted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Select CPCT Exam Paper & Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Language */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Exam Language</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedLang('english');
                    const firstEng = CPCT_PASSAGES.find(p => p.language === 'english');
                    if (firstEng) setSelectedPassageId(firstEng.id);
                  }}
                  className={`flex-1 py-2.5 rounded-xl border font-bold transition-all ${
                    selectedLang === 'english'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setSelectedLang('hindi');
                    const firstHin = CPCT_PASSAGES.find(p => p.language === 'hindi');
                    if (firstHin) setSelectedPassageId(firstHin.id);
                  }}
                  className={`flex-1 py-2.5 rounded-xl border font-bold transition-all ${
                    selectedLang === 'hindi'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>
            </div>

            {/* Exam Time Limit */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Official Exam Duration</label>
              <div className="flex gap-1.5">
                {[5, 10, 15].map(m => (
                  <button
                    key={m}
                    onClick={() => setExamDurationMinutes(m)}
                    className={`flex-1 py-2.5 rounded-xl border font-bold transition-all ${
                      examDurationMinutes === m
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {m} min {m === 15 && '(Official)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Backspace Mode */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Backspace Mode</label>
              <button
                onClick={() => setStrictBackspace(!strictBackspace)}
                className={`w-full py-2.5 px-3 rounded-xl border font-bold text-left flex items-center justify-between transition-all ${
                  strictBackspace
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                <span>{strictBackspace ? 'Strict Official Mode' : 'Unrestricted Backspace'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>

            {/* Passage Selection */}
            <div className="space-y-1.5 md:col-span-3">
              <label className="font-semibold text-slate-700 dark:text-slate-300">CPCT Exam Test Paper</label>
              <select
                value={selectedPassageId}
                onChange={(e) => setSelectedPassageId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              >
                {CPCT_PASSAGES.filter(p => p.language === selectedLang).map(p => (
                  <option key={p.id} value={p.id}>
                    [{p.category}] {p.title} - ({p.difficulty} Level)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleStartExam}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" /> Begin CPCT Exam Simulation
            </button>
          </div>
        </div>
      )}

      {/* Active Exam Canvas */}
      {isExamStarted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-6">
          {/* Official Exam Clock Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <Clock className={`w-5 h-5 ${hasStartedTyping ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {hasStartedTyping ? 'Official Exam Timer' : 'Timer Ready'}
                </span>
                <p className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400">
                  {Math.floor(timeLeftSeconds / 60)}:{(timeLeftSeconds % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Characters</span>
                <span className="font-mono font-bold text-white text-base">{typedText.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Backspaces</span>
                <span className="font-mono font-bold text-amber-400 text-base">{backspaceCount}</span>
              </div>

              {/* Fullscreen & Keyboard Toggles */}
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Mobile Fullscreen'}
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Full'}</span>
              </button>

              <button
                onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                title="Toggle Virtual Keyboard"
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                  showVirtualKeyboard
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <KeyboardIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Keyboard</span>
              </button>

              <button
                onClick={finishExam}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 font-bold text-white text-xs shadow"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Banner Notice when typing hasn't started yet */}
          {!hasStartedTyping && (
            <div className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
              <Zap className="w-4 h-4 fill-current text-amber-500" />
              <span>Press any key below to begin typing — The exam timer will start automatically on your first keypress!</span>
            </div>
          )}

          {/* Key Press Guide Box (tells user exactly which physical English key to press) */}
          {nextExpectedKey && (
            <div className="px-4 py-3 rounded-xl bg-slate-900 border border-blue-500/30 flex flex-wrap items-center justify-between gap-3 text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-300">Expected Character:</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono text-base font-black shadow-sm">
                  {nextExpectedKey === ' ' ? 'SPACE' : nextExpectedKey}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-300">
                  {selectedLang === 'hindi' ? '🇮🇳 Press English Key:' : '🇬🇧 Press Key:'}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-sm font-extrabold flex items-center gap-1.5 shadow-sm">
                  <KeyboardIcon className="w-4 h-4 text-amber-400" />
                  {selectedLang === 'hindi'
                    ? getEnglishKeyHintForHindi(nextExpectedKey).keyLabel
                    : (nextExpectedKey === ' ' ? 'SPACEBAR' : nextExpectedKey.toUpperCase())}
                </span>
              </div>
            </div>
          )}

          {/* Passage Display & Typing Input Container (Splits 2-part side-by-side on Mobile Landscape) */}
          <div className="mobile-landscape-split space-y-4">
            {/* Left Part: Target Passage Box & Progress Bar */}
            <div className="flex flex-col gap-2">
              <div
                ref={passageContainerRef}
                onClick={() => inputRef.current?.focus()}
                className="exam-text-box p-3 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm sm:text-base leading-relaxed max-h-36 sm:max-h-56 overflow-y-auto select-none tracking-wide relative scroll-smooth cursor-text flex-1"
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

              {/* Exam Typing Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full transition-all duration-150"
                  style={{ width: `${Math.min(100, (typedText.length / Math.max(1, targetText.length)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Right Part: Typing Area */}
            <div className="relative flex flex-col">
              <textarea
                ref={inputRef}
                value={typedText}
                onChange={handleInputChange}
                rows={4}
                className="mobile-landscape-input w-full h-full min-h-[100px] p-3 sm:p-4 rounded-xl border border-blue-500 dark:border-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm sm:text-base focus:outline-none ring-2 ring-blue-500/30 resize-none shadow-inner"
                placeholder={selectedLang === 'hindi' ? 'यहाँ टाइप करना शुरू करें...' : 'Start typing the passage here...'}
                autoFocus
              />
            </div>
          </div>

          {/* Virtual Keyboard */}
          {showVirtualKeyboard && (
            <VirtualKeyboard
              expectedKey={nextExpectedKey}
              language={selectedLang}
              showFingerGuide={true}
            />
          )}
        </div>
      )}
    </div>
  );
};
