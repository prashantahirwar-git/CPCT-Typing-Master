import { WarmupStep } from '../types';

export const WARMUP_STEPS: WarmupStep[] = [
  {
    id: 1,
    title: 'Posture Check & Shoulder Release',
    instruction: 'Sit straight with feet flat on the floor. Lower your shoulders away from your ears. Keep elbows at 90 degrees.',
    voiceText: 'Welcome to your CPCT warm-up session. Sit up straight with feet flat on the ground. Relax your shoulders, keep your wrists slightly elevated above the desk, and take a deep breath in.',
    durationSeconds: 15,
    fingerFocus: 'Body & Shoulders'
  },
  {
    id: 2,
    title: 'Finger Extension & Wrist Stretch',
    instruction: 'Spread your fingers wide for 3 seconds, then gently relax them into a loose fist. Rotate wrists inward and outward.',
    voiceText: 'Now, spread all ten fingers wide apart. Hold for three seconds... and relax into a soft fist. Rotate your wrists gently outward. This increases blood flow to your fingers.',
    durationSeconds: 15,
    fingerFocus: 'All 10 Fingers'
  },
  {
    id: 3,
    title: 'Home Row Anchor Test (ASDF JKL;)',
    instruction: 'Lightly place your left fingers on A S D F and right fingers on J K L semicolon. Feel the tactile bumps on F and J.',
    voiceText: 'Place your fingers lightly on the Home Row. Feel the raised bumps on key F with your left index finger, and key J with your right index finger. Keep your thumbs resting gently on the spacebar.',
    durationSeconds: 15,
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    fingerFocus: 'Home Row Resting Position'
  },
  {
    id: 4,
    title: 'Rhythm Tap Exercise (F J F J)',
    instruction: 'Tap F with left index finger and J with right index finger in a steady, metronome-like rhythm.',
    voiceText: 'Let us build a steady typing rhythm. Tap F, then J. F, then J. Focus on equal rhythm and light pressure rather than speed.',
    durationSeconds: 20,
    targetKeys: ['f', 'j', 'f', 'j'],
    fingerFocus: 'Index Fingers (F & J)'
  },
  {
    id: 5,
    title: 'Pinky & Ring Finger Activation',
    instruction: 'Tap A with left pinky and L with right ring finger. Keep remaining fingers resting lightly.',
    voiceText: 'Now activate your outer fingers. Tap key A with your left pinky finger, and key L with your right ring finger. Smooth, gentle taps.',
    durationSeconds: 20,
    targetKeys: ['a', 'l', 'a', 'l'],
    fingerFocus: 'Pinkies & Ring Fingers'
  },
  {
    id: 6,
    title: 'CPCT Focus Readiness Mantra',
    instruction: 'Take a calm breath. Focus on accuracy first — speed is a natural byproduct of accuracy!',
    voiceText: 'Great job! Remember the golden rule of CPCT typing: Accuracy builds speed. Stay relaxed, focus on the passage ahead, and enjoy your practice session.',
    durationSeconds: 12,
    fingerFocus: 'Mental Focus'
  }
];
