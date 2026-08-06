import React from 'react';

interface VirtualKeyboardProps {
  activeKey?: string;
  expectedKey?: string;
  showFingerGuide?: boolean;
  keyErrors?: Record<string, number>;
  keyLatencies?: Record<string, number>;
}

// QWERTY Layout rows
const KEYBOARD_ROWS = [
  [
    { key: '`', label: '` ~', width: 'w-10' },
    { key: '1', label: '1 !', width: 'w-10', finger: 'l-pinky' },
    { key: '2', label: '2 @', width: 'w-10', finger: 'l-ring' },
    { key: '3', label: '3 #', width: 'w-10', finger: 'l-middle' },
    { key: '4', label: '4 $', width: 'w-10', finger: 'l-index' },
    { key: '5', label: '5 %', width: 'w-10', finger: 'l-index' },
    { key: '6', label: '6 ^', width: 'w-10', finger: 'r-index' },
    { key: '7', label: '7 &', width: 'w-10', finger: 'r-index' },
    { key: '8', label: '8 *', width: 'w-10', finger: 'r-middle' },
    { key: '9', label: '9 (', width: 'w-10', finger: 'r-ring' },
    { key: '0', label: '0 )', width: 'w-10', finger: 'r-pinky' },
    { key: '-', label: '- _', width: 'w-10', finger: 'r-pinky' },
    { key: '=', label: '= +', width: 'w-10', finger: 'r-pinky' },
    { key: 'backspace', label: 'Backspace', width: 'w-16', finger: 'r-pinky' }
  ],
  [
    { key: 'tab', label: 'Tab', width: 'w-14' },
    { key: 'q', label: 'Q', width: 'w-10', finger: 'l-pinky' },
    { key: 'w', label: 'W', width: 'w-10', finger: 'l-ring' },
    { key: 'e', label: 'E', width: 'w-10', finger: 'l-middle' },
    { key: 'r', label: 'R', width: 'w-10', finger: 'l-index' },
    { key: 't', label: 'T', width: 'w-10', finger: 'l-index' },
    { key: 'y', label: 'Y', width: 'w-10', finger: 'r-index' },
    { key: 'u', label: 'U', width: 'w-10', finger: 'r-index' },
    { key: 'i', label: 'I', width: 'w-10', finger: 'r-middle' },
    { key: 'o', label: 'O', width: 'w-10', finger: 'r-ring' },
    { key: 'p', label: 'P', width: 'w-10', finger: 'r-pinky' },
    { key: '[', label: '[ {', width: 'w-10', finger: 'r-pinky' },
    { key: ']', label: '] }', width: 'w-10', finger: 'r-pinky' },
    { key: '\\', label: '\\ |', width: 'w-12', finger: 'r-pinky' }
  ],
  [
    { key: 'capslock', label: 'Caps Lock', width: 'w-16' },
    { key: 'a', label: 'A', width: 'w-10', finger: 'l-pinky', home: true },
    { key: 's', label: 'S', width: 'w-10', finger: 'l-ring', home: true },
    { key: 'd', label: 'D', width: 'w-10', finger: 'l-middle', home: true },
    { key: 'f', label: 'F', width: 'w-10', finger: 'l-index', home: true, bump: true },
    { key: 'g', label: 'G', width: 'w-10', finger: 'l-index' },
    { key: 'h', label: 'H', width: 'w-10', finger: 'r-index' },
    { key: 'j', label: 'J', width: 'w-10', finger: 'r-index', home: true, bump: true },
    { key: 'k', label: 'K', width: 'w-10', finger: 'r-middle', home: true },
    { key: 'l', label: 'L', width: 'w-10', finger: 'r-ring', home: true },
    { key: ';', label: '; :', width: 'w-10', finger: 'r-pinky', home: true },
    { key: "'", label: "' \"", width: 'w-10', finger: 'r-pinky' },
    { key: 'enter', label: 'Enter', width: 'w-20', finger: 'r-pinky' }
  ],
  [
    { key: 'shift', label: 'Shift', width: 'w-20', finger: 'l-pinky' },
    { key: 'z', label: 'Z', width: 'w-10', finger: 'l-pinky' },
    { key: 'x', label: 'X', width: 'w-10', finger: 'l-ring' },
    { key: 'c', label: 'C', width: 'w-10', finger: 'l-middle' },
    { key: 'v', label: 'V', width: 'w-10', finger: 'l-index' },
    { key: 'b', label: 'B', width: 'w-10', finger: 'l-index' },
    { key: 'n', label: 'N', width: 'w-10', finger: 'r-index' },
    { key: 'm', label: 'M', width: 'w-10', finger: 'r-index' },
    { key: ',', label: ', <', width: 'w-10', finger: 'r-middle' },
    { key: '.', label: '. >', width: 'w-10', finger: 'r-ring' },
    { key: '/', label: '/ ?', width: 'w-10', finger: 'r-pinky' },
    { key: 'shift_r', label: 'Shift', width: 'w-24', finger: 'r-pinky' }
  ],
  [
    { key: 'ctrl', label: 'Ctrl', width: 'w-14' },
    { key: 'alt', label: 'Alt', width: 'w-12' },
    { key: ' ', label: 'Space', width: 'w-64', finger: 'thumb' },
    { key: 'alt_r', label: 'Alt', width: 'w-12' },
    { key: 'ctrl_r', label: 'Ctrl', width: 'w-14' }
  ]
];

const FINGER_COLOR_MAP: Record<string, { bg: string; text: string; border: string; name: string }> = {
  'l-pinky': { bg: 'bg-rose-500/10 dark:bg-rose-500/20', text: 'text-rose-500', border: 'border-rose-400/30', name: 'Left Pinky' },
  'l-ring': { bg: 'bg-orange-500/10 dark:bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-400/30', name: 'Left Ring' },
  'l-middle': { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-500', border: 'border-amber-400/30', name: 'Left Middle' },
  'l-index': { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-500', border: 'border-emerald-400/30', name: 'Left Index' },
  'r-index': { bg: 'bg-cyan-500/10 dark:bg-cyan-500/20', text: 'text-cyan-500', border: 'border-cyan-400/30', name: 'Right Index' },
  'r-middle': { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-400/30', name: 'Right Middle' },
  'r-ring': { bg: 'bg-indigo-500/10 dark:bg-indigo-500/20', text: 'text-indigo-500', border: 'border-indigo-400/30', name: 'Right Ring' },
  'r-pinky': { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-500', border: 'border-purple-400/30', name: 'Right Pinky' },
  'thumb': { bg: 'bg-teal-500/10 dark:bg-teal-500/20', text: 'text-teal-500', border: 'border-teal-400/30', name: 'Thumbs' }
};

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  activeKey,
  expectedKey,
  showFingerGuide = true,
  keyErrors
}) => {
  const normExpected = (expectedKey || '').toLowerCase();
  const normActive = (activeKey || '').toLowerCase();

  // Helper to determine active finger color for target key
  const targetFingerInfo = React.useMemo(() => {
    if (!normExpected) return null;
    let targetKeyStr = normExpected;
    if (normExpected === ' ') targetKeyStr = ' ';
    
    for (const row of KEYBOARD_ROWS) {
      for (const k of row) {
        if (k.key.toLowerCase() === targetKeyStr) {
          return k.finger ? FINGER_COLOR_MAP[k.finger] : null;
        }
      }
    }
    return null;
  }, [normExpected]);

  return (
    <div className="w-full select-none overflow-x-auto p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-inner transition-colors duration-200">
      {/* Target key prompt banner */}
      {normExpected && (
        <div className="mb-3 flex items-center justify-between text-xs px-2 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Target Key:</span>
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-mono text-sm font-bold shadow-sm animate-pulse">
              {normExpected === ' ' ? 'SPACE' : normExpected.toUpperCase()}
            </span>
          </div>
          {targetFingerInfo && showFingerGuide && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <span className={`w-2.5 h-2.5 rounded-full ${targetFingerInfo.bg} ${targetFingerInfo.border} border-2`} />
              <span>Recommended Finger: <strong className={targetFingerInfo.text}>{targetFingerInfo.name}</strong></span>
            </div>
          )}
        </div>
      )}

      {/* Keyboard Grid */}
      <div className="flex flex-col gap-1.5 items-center min-w-[700px]">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1.5 justify-center">
            {row.map((k, kIdx) => {
              const kLower = k.key.toLowerCase();
              const isExpected = normExpected === kLower || (normExpected === ' ' && kLower === ' ');
              const isActive = normActive === kLower || (normActive === ' ' && kLower === ' ');
              
              const fingerMeta = k.finger ? FINGER_COLOR_MAP[k.finger] : null;
              const errorCount = keyErrors ? (keyErrors[kLower] || 0) : 0;

              let keyBg = 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
              if (showFingerGuide && fingerMeta && !isExpected && !isActive) {
                keyBg = `${fingerMeta.bg} ${fingerMeta.border} text-slate-800 dark:text-slate-200`;
              }

              if (isExpected) {
                keyBg = 'bg-blue-600 text-white font-bold ring-2 ring-blue-400 dark:ring-blue-300 ring-offset-2 ring-offset-slate-900 scale-105 transition-all shadow-md';
              } else if (isActive) {
                keyBg = 'bg-emerald-500 text-white font-bold scale-95 transition-transform';
              }

              return (
                <div
                  key={kIdx}
                  className={`relative flex items-center justify-center rounded-lg border text-xs font-mono font-medium transition-all duration-100 ${k.width} h-11 ${keyBg}`}
                >
                  {/* Home row bump indicator */}
                  {k.bump && (
                    <span className="absolute bottom-1 w-2.5 h-0.5 bg-slate-400 dark:bg-slate-500 rounded-full" />
                  )}

                  {/* Error badge if key has high error history */}
                  {errorCount > 2 && !isExpected && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold shadow-sm">
                      !
                    </span>
                  )}

                  {k.label}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Finger legend footer */}
      {showFingerGuide && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Finger Mapping:</span>
          {Object.entries(FINGER_COLOR_MAP).map(([key, f]) => (
            <div key={key} className="flex items-center gap-1">
              <span className={`w-2.5 h-2.5 rounded-full ${f.bg} border ${f.border}`} />
              <span>{f.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
