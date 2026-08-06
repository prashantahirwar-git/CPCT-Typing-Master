import React from 'react';
import { X, CheckCircle2, ChevronRight, ChevronLeft, Keyboard, Award, Volume2, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../lib/audio';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [interactivePressed, setInteractivePressed] = React.useState<{ f: boolean; j: boolean }>({ f: false, j: false });

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (stepIndex === 2) {
        if (e.key.toLowerCase() === 'f') {
          soundEngine.playKeyPress();
          setInteractivePressed(prev => ({ ...prev, f: true }));
        } else if (e.key.toLowerCase() === 'j') {
          soundEngine.playKeyPress();
          setInteractivePressed(prev => ({ ...prev, j: true }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stepIndex]);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Welcome to CPCT Typing Master',
      icon: <Award className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            The <strong>CPCT (Computer Proficiency Certification Test)</strong> is required for government positions across Madhya Pradesh.
          </p>
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">Exam Passing Criteria:</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>English Typing:</strong> 30+ Net WPM (Grade C), 40-49 WPM (Grade B), 50+ WPM (Grade A)</li>
              <li><strong>Hindi Typing:</strong> 20+ Net WPM (Grade C), 26-30 WPM (Grade B), 31+ WPM (Grade A)</li>
              <li><strong>Test Duration:</strong> Official 15 Minutes test session.</li>
            </ul>
          </div>
          <p className="text-xs text-slate-500">
            This application is designed specifically for aspirants with a <strong>20 - 50 Days</strong> countdown target!
          </p>
        </div>
      )
    },
    {
      title: 'Ergonomics & Hand Posture',
      icon: <Keyboard className="w-8 h-8 text-emerald-500" />,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>Great speed comes from healthy hand ergonomics and minimal muscle strain:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <strong className="block text-emerald-600 dark:text-emerald-400 mb-1">✓ Wrist Alignment</strong>
              Keep wrists slightly floating or resting softly. Do not bend wrists downwards.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <strong className="block text-emerald-600 dark:text-emerald-400 mb-1">✓ Elbow Angle</strong>
              Maintain 90-degree bend at elbows with shoulders relaxed away from ears.
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-700 dark:text-amber-300">
            <strong>Golden Rule:</strong> Focus on 100% precision first. Speed naturally builds through muscle memory over 14-21 days of practice.
          </div>
        </div>
      )
    },
    {
      title: 'Home Row Interactive Placement',
      icon: <Keyboard className="w-8 h-8 text-indigo-500" />,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Rest your left hand fingers on <strong>A S D F</strong> and right hand on <strong>J K L ;</strong>.
            Feel the small tactile bumps on key <strong>F</strong> and key <strong>J</strong>.
          </p>
          
          <div className="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center space-y-3">
            <p className="font-semibold text-xs text-slate-700 dark:text-slate-200">
              Interactive Test: Press key <span className="font-mono text-blue-500 text-base">F</span> and key <span className="font-mono text-blue-500 text-base">J</span> on your physical keyboard now!
            </p>
            <div className="flex justify-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono text-lg font-bold border-2 transition-all ${
                interactivePressed.f
                  ? 'bg-emerald-500 text-white border-emerald-400 scale-105 shadow-md'
                  : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 animate-pulse'
              }`}>
                F
                <span className="text-[9px] font-sans font-normal opacity-80">Left Index</span>
              </div>
              <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono text-lg font-bold border-2 transition-all ${
                interactivePressed.j
                  ? 'bg-emerald-500 text-white border-emerald-400 scale-105 shadow-md'
                  : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 animate-pulse'
              }`}>
                J
                <span className="text-[9px] font-sans font-normal opacity-80">Right Index</span>
              </div>
            </div>
            {interactivePressed.f && interactivePressed.j && (
              <p className="text-xs font-semibold text-emerald-500 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Perfect! Both anchor keys detected.
              </p>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'CPCT Speed Formula & Backspace Rules',
      icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>CPCT calculates typing speed using standard examination standards:</p>
          <div className="p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500">Gross WPM:</span>
              <span className="font-mono font-bold">(Total Characters Typed / 5) / Minutes</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500">Net WPM (Official):</span>
              <span className="font-mono font-bold text-blue-500">Gross WPM - (Uncorrected Errors / Minutes)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">Exam Backspace Mode:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Soft or Restricted Options</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            You can practice with unrestricted backspace during training, then enable Strict CPCT Mode for mock exams!
          </p>
        </div>
      )
    },
    {
      title: 'Voice Warmups & Local-First Privacy',
      icon: <Volume2 className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Use our built-in <strong>Voice Warm-up Coach</strong> before test sessions to relax your fingers and lock in focus.
          </p>
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs space-y-1.5">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400">🔒 100% Local Device Storage:</h4>
            <p className="text-slate-600 dark:text-slate-300">
              All your test records, speed stats, and profile data remain stored safely on your device browser. Fast latency, zero internet required once loaded!
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStep = steps[stepIndex];

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex justify-between items-start pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
              {currentStep.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                Beginner Tutorial ({stepIndex + 1} of {steps.length})
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentStep.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            title="Skip Tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5">
          {currentStep.content}
        </div>

        {/* Progress indicators & Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === stepIndex
                    ? 'bg-blue-600 w-6'
                    : idx < stepIndex
                    ? 'bg-blue-400 dark:bg-blue-500'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium"
            >
              Skip Tutorial
            </button>
            {stepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-sm flex items-center gap-1"
            >
              {stepIndex === steps.length - 1 ? 'Start Training' : 'Next'}
              {stepIndex < steps.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
