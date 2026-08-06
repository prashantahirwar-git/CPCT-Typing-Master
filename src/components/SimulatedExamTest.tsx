import React from 'react';
import { CPCT_PASSAGES, CPCTPassage } from '../data/cpctPassages';
import { TestResult, BackspaceMode } from '../types';
import { soundEngine } from '../lib/audio';
import { saveTestResult } from '../lib/storage';
import { VirtualKeyboard } from './VirtualKeyboard';
import { Award, Clock, ShieldAlert, Play, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

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
  const [timeLeftSeconds, setTimeLeftSeconds] = React.useState<number>(15 * 60);
  const [typedText, setTypedText] = React.useState<string>('');
  const [backspaceCount, setBackspaceCount] = React.useState<number>(0);
  const [keyErrors, setKeyErrors] = React.useState<Record<string, number>>({});

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const timerRef = React.useRef<any>(null);

  const activePassage = React.useMemo(() => {
    return CPCT_PASSAGES.find(p => p.id === selectedPassageId) || CPCT_PASSAGES[0];
  }, [selectedPassageId]);

  // Start Exam
  const handleStartExam = () => {
    setIsExamStarted(true);
    setTypedText('');
    setBackspaceCount(0);
    setKeyErrors({});
    setTimeLeftSeconds(examDurationMinutes * 60);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Timer Tick
  React.useEffect(() => {
    if (isExamStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isExamStarted]);

  // Finish Exam
  const finishExam = React.useCallback(() => {
    setIsExamStarted(false);
    soundEngine.playSuccessFanfare();

    const totalTimeSpentSec = (examDurationMinutes * 60) - timeLeftSeconds;
    const timeSpentMin = Math.max(0.1, totalTimeSpentSec / 60);

    const totalChars = typedText.length;
    let correctChars = 0;
    let uncorrectedErr = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === activePassage.content[i]) {
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
      id: 'cpct_exam_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      mode: 'simulated_exam',
      language: selectedLang,
      durationSeconds: examDurationMinutes * 60,
      timeSpentSeconds: Math.round(totalTimeSpentSec),
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
      passedCPCT: netWPM >= 30,
      keyErrors
    };

    saveTestResult(result);
    onExamComplete(result);
  }, [examDurationMinutes, timeLeftSeconds, typedText, activePassage, backspaceCount, keyErrors, selectedLang, onExamComplete]);

  // Handle Keystrokes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    if (val.length < typedText.length) {
      if (strictBackspace) {
        // Track backspace count in strict mode
        setBackspaceCount(prev => prev + 1);
        soundEngine.playError();
      } else {
        setBackspaceCount(prev => prev + 1);
      }
    } else {
      const charTyped = val[val.length - 1];
      const expectedChar = activePassage.content[val.length - 1];

      if (charTyped === expectedChar) {
        soundEngine.playKeyPress();
      } else {
        soundEngine.playError();
        const lower = expectedChar ? expectedChar.toLowerCase() : 'space';
        setKeyErrors(prev => ({ ...prev, [lower]: (prev[lower] || 0) + 1 }));
      }
    }

    setTypedText(val);

    if (val.length >= activePassage.content.length) {
      finishExam();
    }
  };

  const nextExpectedKey = activePassage.content[typedText.length] || '';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* CPCT Exam Portal Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">
                MP CPCT Official Simulation Environment
              </span>
              <h2 className="text-xl font-bold">Simulated CPCT Speed Examination</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
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
              <strong className="text-blue-400 block mb-1">⏱ Test Duration:</strong>
              15 Minutes Official standard timer (or custom 5/10 min mock sprint).
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

      {/* Exam Pre-Start Setup Form */}
      {!isExamStarted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
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
                  English CPCT
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
                  हिंदी CPCT
                </button>
              </div>
            </div>

            {/* Test Duration */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Exam Time</label>
              <div className="flex gap-2">
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
                    {m} min {m === 15 ? '(Official)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Backspace Toggle */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Backspace Rule</label>
              <button
                onClick={() => setStrictBackspace(!strictBackspace)}
                className={`w-full py-2.5 rounded-xl border font-semibold transition-all ${
                  strictBackspace
                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {strictBackspace ? 'Strict Exam Mode (Track Errors)' : 'Practice Mode (Free Corrections)'}
              </button>
            </div>

            {/* Passage Selector */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Exam Question Paper Passage</label>
              <select
                value={selectedPassageId}
                onChange={(e) => setSelectedPassageId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
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
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" /> Begin CPCT Exam Simulation
            </button>
          </div>
        </div>
      )}

      {/* Active Exam Canvas */}
      {isExamStarted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Official Exam Clock Header */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Official Exam Timer</span>
                <p className="text-2xl font-mono font-extrabold text-amber-400">
                  {Math.floor(timeLeftSeconds / 60)}:{(timeLeftSeconds % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Characters</span>
                <span className="font-mono font-bold text-white text-base">{typedText.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Backspaces Used</span>
                <span className="font-mono font-bold text-amber-400 text-base">{backspaceCount}</span>
              </div>
              <button
                onClick={finishExam}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 font-bold text-white text-xs shadow"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Passage Display */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-base leading-relaxed max-h-52 overflow-y-auto select-none tracking-wide">
            {activePassage.content.split('').map((char, index) => {
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

          {/* Typing Area */}
          <textarea
            ref={inputRef}
            value={typedText}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-4 rounded-xl border border-blue-500 dark:border-blue-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base focus:outline-none ring-2 ring-blue-500/30 resize-none shadow-inner"
            placeholder="Start typing the passage here..."
          />

          {/* Virtual Keyboard */}
          <VirtualKeyboard
            expectedKey={nextExpectedKey}
            showFingerGuide={true}
          />
        </div>
      )}
    </div>
  );
};
