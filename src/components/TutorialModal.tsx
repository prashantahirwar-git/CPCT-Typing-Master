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
      title: 'Welcome to CPCT Typing Hub',
      icon: <Award className="w-8 h-8 text-purple-300" />,
      content: (
        <div className="space-y-3 text-sm text-purple-100">
          <p>
            The <strong className="text-white">CPCT (Computer Proficiency Certification Test)</strong> is required for government positions across Madhya Pradesh.
          </p>
          <div className="p-3 bg-[#1c153d] border border-purple-500/40 rounded-xl space-y-2">
            <h4 className="font-extrabold text-purple-300">Exam Passing Criteria:</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-purple-200">
              <li><strong className="text-white">English Typing:</strong> 30+ Net WPM (Grade C), 40-49 WPM (Grade B), 50+ WPM (Grade A)</li>
              <li><strong className="text-white">Hindi Typing:</strong> 20+ Net WPM (Grade C), 26-30 WPM (Grade B), 31+ WPM (Grade A)</li>
              <li><strong className="text-white">Test Duration:</strong> Official 15 Minutes test session.</li>
            </ul>
          </div>
          <p className="text-xs text-purple-300/80">
            This application is designed specifically for aspirants with a <strong className="text-white">20 - 50 Days</strong> countdown target!
          </p>
        </div>
      )
    },
    {
      title: 'Ergonomics & Hand Posture',
      icon: <Keyboard className="w-8 h-8 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-sm text-purple-100">
          <p>Great speed comes from healthy hand ergonomics and minimal muscle strain:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#1c153d] border border-purple-500/40 text-purple-200">
              <strong className="block text-emerald-400 mb-1">✓ Wrist Alignment</strong>
              Keep wrists slightly floating or resting softly. Do not bend wrists downwards.
            </div>
            <div className="p-2.5 rounded-lg bg-[#1c153d] border border-purple-500/40 text-purple-200">
              <strong className="block text-emerald-400 mb-1">✓ Elbow Angle</strong>
              Maintain 90-degree bend at elbows with shoulders relaxed away from ears.
            </div>
          </div>
          <div className="p-3 bg-[#2a1d0f] border border-amber-500/40 rounded-xl text-xs text-amber-200">
            <strong className="text-amber-300">Golden Rule:</strong> Focus on 100% precision first. Speed naturally builds through muscle memory over 14-21 days of practice.
          </div>
        </div>
      )
    },
    {
      title: 'Home Row Interactive Placement',
      icon: <Keyboard className="w-8 h-8 text-indigo-400" />,
      content: (
        <div className="space-y-3 text-sm text-purple-100">
          <p>
            Rest your left hand fingers on <strong className="text-white">A S D F</strong> and right hand on <strong className="text-white">J K L ;</strong>.
            Feel the small tactile bumps on key <strong className="text-white">F</strong> and key <strong className="text-white">J</strong>.
          </p>
          
          <div className="p-4 bg-[#1c153d] border border-purple-500/40 rounded-xl text-center space-y-3">
            <p className="font-bold text-xs text-purple-200">
              Interactive Test: Press key <span className="font-mono text-purple-300 text-base font-black">F</span> and key <span className="font-mono text-purple-300 text-base font-black">J</span> on your physical keyboard now!
            </p>
            <div className="flex justify-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono text-lg font-bold border-2 transition-all ${
                interactivePressed.f
                  ? 'bg-emerald-600 text-white border-emerald-400 scale-105 shadow-md'
                  : 'bg-slate-900 text-white border-purple-500/50 animate-pulse'
              }`}>
                F
                <span className="text-[9px] font-sans font-normal opacity-80">Left Index</span>
              </div>
              <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono text-lg font-bold border-2 transition-all ${
                interactivePressed.j
                  ? 'bg-emerald-600 text-white border-emerald-400 scale-105 shadow-md'
                  : 'bg-slate-900 text-white border-purple-500/50 animate-pulse'
              }`}>
                J
                <span className="text-[9px] font-sans font-normal opacity-80">Right Index</span>
              </div>
            </div>
            {interactivePressed.f && interactivePressed.j && (
              <p className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Perfect! Both anchor keys detected.
              </p>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'CPCT Speed Formula & Backspace Rules',
      icon: <ShieldCheck className="w-8 h-8 text-amber-400" />,
      content: (
        <div className="space-y-3 text-sm text-purple-100">
          <p>CPCT calculates typing speed using standard examination standards:</p>
          <div className="p-3 bg-[#1c153d] border border-purple-500/40 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-purple-800/50">
              <span className="text-purple-300">Gross WPM:</span>
              <span className="font-mono font-bold text-white">(Total Characters Typed / 5) / Minutes</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-purple-800/50">
              <span className="text-purple-300">Net WPM (Official):</span>
              <span className="font-mono font-bold text-purple-200">Gross WPM - (Uncorrected Errors / Minutes)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-purple-300">Exam Backspace Mode:</span>
              <span className="font-bold text-emerald-400">Soft or Restricted Options</span>
            </div>
          </div>
          <p className="text-xs text-purple-300/80">
            You can practice with unrestricted backspace during training, then enable Strict CPCT Mode for mock exams!
          </p>
        </div>
      )
    },
    {
      title: 'Voice Warmups & Local-First Privacy',
      icon: <Volume2 className="w-8 h-8 text-purple-400" />,
      content: (
        <div className="space-y-3 text-sm text-purple-100">
          <p>
            Use our built-in <strong className="text-white">Voice Warm-up Coach</strong> before test sessions to relax your fingers and lock in focus.
          </p>
          <div className="p-3 bg-[#1c153d] border border-purple-500/40 rounded-xl text-xs space-y-1.5">
            <h4 className="font-bold text-purple-300">🔒 100% Local Device Storage:</h4>
            <p className="text-purple-200">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-[#120d2a] text-white border-2 border-purple-500/70 rounded-2xl p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex justify-between items-start pb-3 border-b border-purple-800/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950 border border-purple-500/50">
              {currentStep.icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">
                Beginner Tutorial ({stepIndex + 1} of {steps.length})
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {currentStep.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
            }}
            className="text-purple-300 hover:text-white p-1 rounded-lg hover:bg-purple-900/50"
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
        <div className="pt-4 border-t border-purple-800/60 flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === stepIndex
                    ? 'bg-purple-500 w-6'
                    : idx < stepIndex
                    ? 'bg-purple-700'
                    : 'bg-purple-950 border border-purple-800'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
              }}
              className="px-3 py-1.5 text-xs text-purple-300 hover:text-white font-semibold"
            >
              Skip Tutorial
            </button>
            {stepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg border border-purple-500/50 bg-[#1c153d] text-xs font-bold text-purple-200 hover:bg-purple-900 hover:text-white flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 shadow-md shadow-purple-950/60 flex items-center gap-1"
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
