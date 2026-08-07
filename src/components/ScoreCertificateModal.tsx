import React from 'react';
import { TestResult } from '../types';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, RotateCcw, Share2, Download, X, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

interface ScoreCertificateModalProps {
  result: TestResult | null;
  studentName: string;
  onClose: () => void;
  onRetry: () => void;
}

export const ScoreCertificateModal: React.FC<ScoreCertificateModalProps> = ({
  result,
  studentName,
  onClose,
  onRetry
}) => {
  React.useEffect(() => {
    if (result && result.passedCPCT) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [result]);

  if (!result) return null;

  const isGradeA = result.netWPM >= 50;
  const isGradeB = result.netWPM >= 40 && result.netWPM < 50;
  const isGradeC = result.netWPM >= 30 && result.netWPM < 40;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-slate-900 dark:text-white animate-in zoom-in-95 duration-200 my-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-amber-500/30 p-6 rounded-xl bg-gradient-to-b from-amber-50/20 to-transparent dark:from-amber-950/10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> MP CPCT Certification Report
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-slate-900 dark:text-white">
              Official Performance Scorecard
            </h2>
            <p className="text-xs text-slate-500">
              Generated on {new Date(result.timestamp).toLocaleDateString()} for {studentName}
            </p>
          </div>

          {/* Grade Badge */}
          <div className="flex flex-col items-center justify-center py-4 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className={`p-3 rounded-full mb-2 ${
              result.passedCPCT ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}>
              <Award className="w-12 h-12" />
            </div>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">CPCT Qualification Grade</span>
            <h3 className={`text-xl font-extrabold ${
              result.passedCPCT ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
            }`}>
              {result.cpctGrade}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {result.passedCPCT ? '✓ CPCT Typing Exam Target Cleared!' : '✕ Below 30 WPM Passing Target — Keep Practicing!'}
            </p>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-[10px] uppercase font-bold text-blue-500 block">Net WPM</span>
              <span className="text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400">
                {result.netWPM}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Gross WPM</span>
              <span className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-200">
                {result.grossWPM}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] uppercase font-bold text-emerald-500 block">Accuracy</span>
              <span className="text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                {result.accuracy}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] uppercase font-bold text-amber-500 block">Backspaces</span>
              <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
                {result.backspaceCount}
              </span>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Test Passage:</span>
              <span className="font-semibold">{result.passageTitle}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Test Duration:</span>
              <span className="font-semibold">{Math.round(result.timeSpentSeconds)} seconds</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Total Characters Typed:</span>
              <span className="font-semibold">{result.totalCharsTyped}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Uncorrected Errors:</span>
              <span className="font-semibold text-rose-500">{result.uncorrectedErrors}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Print Scorecard
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onRetry}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg"
            >
              Close & View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
