import React from 'react';
import { WARMUP_STEPS } from '../data/warmupVoiceGuides';
import { soundEngine } from '../lib/audio';
import { Volume2, VolumeX, Play, Square, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { VirtualKeyboard } from './VirtualKeyboard';

interface WarmupVoiceSectionProps {
  onCompleteWarmup: () => void;
}

export const WarmupVoiceSection: React.FC<WarmupVoiceSectionProps> = ({ onCompleteWarmup }) => {
  const [currentStepIdx, setCurrentStepIdx] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [userTypedKey, setUserTypedKey] = React.useState('');
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  const step = WARMUP_STEPS[currentStepIdx];

  const speakCurrentStep = React.useCallback(() => {
    if (isMuted) return;
    setIsPlaying(true);
    soundEngine.speakVoice(step.voiceText, () => {
      setIsPlaying(false);
    });
  }, [step, isMuted]);

  React.useEffect(() => {
    // Speak on step change
    speakCurrentStep();
    return () => {
      soundEngine.stopVoice();
    };
  }, [currentStepIdx, speakCurrentStep]);

  // Listen to physical keyboard presses during warm-up
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      soundEngine.playKeyPress();
      setUserTypedKey(e.key);
      setTimeout(() => setUserTypedKey(''), 300);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNextStep = () => {
    soundEngine.stopVoice();
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps(prev => [...prev, step.id]);
    }

    if (currentStepIdx < WARMUP_STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      soundEngine.playSuccessFanfare();
      onCompleteWarmup();
    }
  };

  const handlePrevStep = () => {
    soundEngine.stopVoice();
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setSoundEnabled(!nextMute);
    if (nextMute) {
      soundEngine.stopVoice();
      setIsPlaying(false);
    } else {
      speakCurrentStep();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900 border border-purple-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Volume2 className="w-48 h-48 text-purple-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Voice-Guided Pre-Exam Warmup
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Ergonomic & Finger Warm-up Coach
            </h2>
            <p className="text-sm text-purple-200/80 mt-1 max-w-xl">
              Spoken posture prompts and rhythm exercises to loosen up finger tendons and prevent typing fatigue before high-intensity CPCT mock tests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all ${
                isMuted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />}
              {isMuted ? 'Audio Muted' : 'Voice Active'}
            </button>
            <button
              onClick={isPlaying ? () => soundEngine.stopVoice() : speakCurrentStep}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-xs text-white shadow-lg flex items-center gap-2"
            >
              {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              {isPlaying ? 'Stop Voice' : 'Replay Voice Prompt'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Warmup Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
        {/* Step Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center">
              {step.id}
            </span>
            <div>
              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Finger Focus: {step.fingerFocus}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Step {currentStepIdx + 1} of {WARMUP_STEPS.length}
          </div>
        </div>

        {/* Spoken Instruction Box with Equalizer Animation */}
        <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-500" /> Spoken Voice Guidance:
            </span>
            {isPlaying && (
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-2 bg-purple-500 rounded-full animate-bounce" />
              </div>
            )}
          </div>
          <p className="text-base font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
            "{step.instruction}"
          </p>
        </div>

        {/* Visual Keyboard with Target Keys Highlight */}
        <VirtualKeyboard
          expectedKey={step.targetKeys ? step.targetKeys[0] : undefined}
          activeKey={userTypedKey}
          showFingerGuide={true}
        />

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Exercise
          </button>

          <div className="flex items-center gap-2">
            {completedSteps.includes(step.id) && (
              <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Completed
              </span>
            )}

            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              {currentStepIdx === WARMUP_STEPS.length - 1 ? 'Finish & Launch Exam' : 'Next Warm-up Exercise'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
