import React from 'react';

export type KeyboardLayoutMode = 'english' | 'hindi-remington' | 'hindi-inscript';

interface VirtualKeyboardProps {
  activeKey?: string;
  expectedKey?: string;
  showFingerGuide?: boolean;
  keyErrors?: Record<string, number>;
  keyLatencies?: Record<string, number>;
  language?: 'english' | 'hindi';
  layout?: KeyboardLayoutMode;
}

interface KeyDef {
  key: string;
  label: string;
  hindiRemington?: string;
  hindiInscript?: string;
  width: string;
  finger?: string;
  home?: boolean;
  bump?: boolean;
}

// Full QWERTY + Hindi Remington Gail + Hindi Inscript Keyboard Rows
const KEYBOARD_ROWS: KeyDef[][] = [
  [
    { key: '`', label: '` ~', hindiRemington: '` ~', hindiInscript: '` ~', width: 'w-10' },
    { key: '1', label: '1 !', hindiRemington: '1 ऍ', hindiInscript: '1 ऍ', width: 'w-10', finger: 'l-pinky' },
    { key: '2', label: '2 @', hindiRemington: '2 ॅ', hindiInscript: '2 ॅ', width: 'w-10', finger: 'l-ring' },
    { key: '3', label: '3 #', hindiRemington: '3 ्र', hindiInscript: '3 ्र', width: 'w-10', finger: 'l-middle' },
    { key: '4', label: '4 $', hindiRemington: '4 ०', hindiInscript: '4 ०', width: 'w-10', finger: 'l-index' },
    { key: '5', label: '5 %', hindiRemington: "5 '", hindiInscript: "5 '", width: 'w-10', finger: 'l-index' },
    { key: '6', label: '6 ^', hindiRemington: '6 "', hindiInscript: '6 "', width: 'w-10', finger: 'r-index' },
    { key: '7', label: '7 &', hindiRemington: '7 -', hindiInscript: '7 -', width: 'w-10', finger: 'r-index' },
    { key: '8', label: '8 *', hindiRemington: '8 (', hindiInscript: '8 (', width: 'w-10', finger: 'r-middle' },
    { key: '9', label: '9 (', hindiRemington: '9 )', hindiInscript: '9 )', width: 'w-10', finger: 'r-ring' },
    { key: '0', label: '0 )', hindiRemington: '0 ऋ', hindiInscript: '0 ऋ', width: 'w-10', finger: 'r-pinky' },
    { key: '-', label: '- _', hindiRemington: '- _', hindiInscript: '- _', width: 'w-10', finger: 'r-pinky' },
    { key: '=', label: '= +', hindiRemington: '= +', hindiInscript: '= +', width: 'w-10', finger: 'r-pinky' },
    { key: 'backspace', label: 'Backspace', width: 'w-16', finger: 'r-pinky' }
  ],
  [
    { key: 'tab', label: 'Tab', width: 'w-14' },
    { key: 'q', label: 'Q', hindiRemington: 'ु', hindiInscript: 'ौ', width: 'w-10', finger: 'l-pinky' },
    { key: 'w', label: 'W', hindiRemington: 'ू', hindiInscript: 'ै', width: 'w-10', finger: 'l-ring' },
    { key: 'e', label: 'E', hindiRemington: 'म', hindiInscript: 'ा', width: 'w-10', finger: 'l-middle' },
    { key: 'r', label: 'R', hindiRemington: 'त', hindiInscript: 'ी', width: 'w-10', finger: 'l-index' },
    { key: 't', label: 'T', hindiRemington: 'ज', hindiInscript: 'ू', width: 'w-10', finger: 'l-index' },
    { key: 'y', label: 'Y', hindiRemington: 'ल', hindiInscript: 'ब', width: 'w-10', finger: 'r-index' },
    { key: 'u', label: 'U', hindiRemington: 'न', hindiInscript: 'ह', width: 'w-10', finger: 'r-index' },
    { key: 'i', label: 'I', hindiRemington: 'प', hindiInscript: 'ग', width: 'w-10', finger: 'r-middle' },
    { key: 'o', label: 'O', hindiRemington: 'व', hindiInscript: 'द', width: 'w-10', finger: 'r-ring' },
    { key: 'p', label: 'P', hindiRemington: 'च', hindiInscript: 'ज', width: 'w-10', finger: 'r-pinky' },
    { key: '[', label: '[ {', hindiRemington: 'ख', hindiInscript: 'ड', width: 'w-10', finger: 'r-pinky' },
    { key: ']', label: '] }', hindiRemington: '़', hindiInscript: '़', width: 'w-10', finger: 'r-pinky' },
    { key: '\\', label: '\\ |', hindiRemington: '\\ |', hindiInscript: '\\ |', width: 'w-12', finger: 'r-pinky' }
  ],
  [
    { key: 'capslock', label: 'Caps Lock', width: 'w-16' },
    { key: 'a', label: 'A', hindiRemington: 'ो', hindiInscript: 'ो', width: 'w-10', finger: 'l-pinky', home: true },
    { key: 's', label: 'S', hindiRemington: 'े', hindiInscript: 'े', width: 'w-10', finger: 'l-ring', home: true },
    { key: 'd', label: 'D', hindiRemington: '्', hindiInscript: '्', width: 'w-10', finger: 'l-middle', home: true },
    { key: 'f', label: 'F', hindiRemington: 'ि', hindiInscript: 'ि', width: 'w-10', finger: 'l-index', home: true, bump: true },
    { key: 'g', label: 'G', hindiRemington: 'ह', hindiInscript: 'ु', width: 'w-10', finger: 'l-index' },
    { key: 'h', label: 'H', hindiRemington: 'ी', hindiInscript: 'प', width: 'w-10', finger: 'r-index' },
    { key: 'j', label: 'J', hindiRemington: '्र', hindiInscript: 'र', width: 'w-10', finger: 'r-index', home: true, bump: true },
    { key: 'k', label: 'K', hindiRemington: 'ा', hindiInscript: 'क', width: 'w-10', finger: 'r-middle', home: true },
    { key: 'l', label: 'L', hindiRemington: 'स', hindiInscript: 'त', width: 'w-10', finger: 'r-ring', home: true },
    { key: ';', label: '; :', hindiRemington: 'य', hindiInscript: 'च', width: 'w-10', finger: 'r-pinky', home: true },
    { key: "'", label: "' \"", hindiRemington: 'श', hindiInscript: 'ट', width: 'w-10', finger: 'r-pinky' },
    { key: 'enter', label: 'Enter', width: 'w-20', finger: 'r-pinky' }
  ],
  [
    { key: 'shift', label: 'Shift', width: 'w-20', finger: 'l-pinky' },
    { key: 'z', label: 'Z', hindiRemington: '्र', hindiInscript: 'ॆ', width: 'w-10', finger: 'l-pinky' },
    { key: 'x', label: 'X', hindiRemington: 'ग', hindiInscript: 'ों', width: 'w-10', finger: 'l-ring' },
    { key: 'c', label: 'C', hindiRemington: 'ब', hindiInscript: 'म', width: 'w-10', finger: 'l-middle' },
    { key: 'v', label: 'V', hindiRemington: 'अ', hindiInscript: 'न', width: 'w-10', finger: 'l-index' },
    { key: 'b', label: 'B', hindiRemington: 'इ', hindiInscript: 'व', width: 'w-10', finger: 'l-index' },
    { key: 'n', label: 'N', hindiRemington: 'द', hindiInscript: 'ल', width: 'w-10', finger: 'r-index' },
    { key: 'm', label: 'M', hindiRemington: 'उ', hindiInscript: 'स', width: 'w-10', finger: 'r-index' },
    { key: ',', label: ', <', hindiRemington: 'ए', hindiInscript: 'य', width: 'w-10', finger: 'r-middle' },
    { key: '.', label: '. >', hindiRemington: '़', hindiInscript: 'ड़', width: 'w-10', finger: 'r-ring' },
    { key: '/', label: '/ ?', hindiRemington: 'ध', hindiInscript: 'य', width: 'w-10', finger: 'r-pinky' },
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
  keyErrors,
  language = 'english',
  layout
}) => {
  // Determine layout mode
  const [currentLayout, setCurrentLayout] = React.useState<KeyboardLayoutMode>(() => {
    if (layout) return layout;
    return language === 'hindi' ? 'hindi-remington' : 'english';
  });

  // Sync layout if language changes
  React.useEffect(() => {
    if (layout) {
      setCurrentLayout(layout);
    } else if (language === 'hindi' && currentLayout === 'english') {
      setCurrentLayout('hindi-remington');
    } else if (language === 'english' && currentLayout !== 'english') {
      setCurrentLayout('english');
    }
  }, [language, layout]);

  const normExpected = (expectedKey || '').trim();
  const normActive = (activeKey || '').trim().toLowerCase();

  // Helper to determine active target key match
  const isTargetKey = (kDef: KeyDef) => {
    if (!normExpected) return false;
    if (normExpected === ' ' && kDef.key === ' ') return true;

    // Check English match
    if (kDef.key.toLowerCase() === normExpected.toLowerCase()) return true;

    // Check Hindi Remington match
    if (currentLayout === 'hindi-remington' && kDef.hindiRemington) {
      if (kDef.hindiRemington.includes(normExpected) || normExpected.includes(kDef.hindiRemington)) return true;
    }

    // Check Hindi Inscript match
    if (currentLayout === 'hindi-inscript' && kDef.hindiInscript) {
      if (kDef.hindiInscript.includes(normExpected) || normExpected.includes(kDef.hindiInscript)) return true;
    }

    return false;
  };

  // Helper to determine target finger info
  const targetFingerInfo = React.useMemo(() => {
    if (!normExpected) return null;
    
    for (const row of KEYBOARD_ROWS) {
      for (const k of row) {
        if (isTargetKey(k)) {
          return k.finger ? FINGER_COLOR_MAP[k.finger] : null;
        }
      }
    }
    return null;
  }, [normExpected, currentLayout]);

  return (
    <div className="virtual-keyboard-container w-full select-none overflow-x-auto p-2 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-inner transition-colors duration-200">
      {/* Keyboard Controls & Layout Mode Tabs */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-lg text-xs font-bold">
          <button
            onClick={() => setCurrentLayout('english')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              currentLayout === 'english'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🇬🇧 English QWERTY
          </button>

          <button
            onClick={() => setCurrentLayout('hindi-remington')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              currentLayout === 'hindi-remington'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🇮🇳 Hindi Remington Gail (CPCT)
          </button>

          <button
            onClick={() => setCurrentLayout('hindi-inscript')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              currentLayout === 'hindi-inscript'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🇮🇳 Hindi Inscript
          </button>
        </div>

        {/* Target Key Banner */}
        {normExpected && (
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-slate-500 dark:text-slate-400">Target Key:</span>
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-mono text-sm font-bold shadow-sm animate-pulse">
              {normExpected === ' ' ? 'SPACE' : normExpected}
            </span>
            {targetFingerInfo && showFingerGuide && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                <span className={`w-2.5 h-2.5 rounded-full ${targetFingerInfo.bg} ${targetFingerInfo.border} border-2`} />
                <span>Finger: <strong className={targetFingerInfo.text}>{targetFingerInfo.name}</strong></span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Keyboard Grid */}
      <div className="flex flex-col gap-1.5 items-center min-w-[700px]">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1.5 justify-center">
            {row.map((k, kIdx) => {
              const kLower = k.key.toLowerCase();
              const isExpected = isTargetKey(k);
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

              // Determine display label for current layout
              let primaryChar = k.label;
              let cornerSubKey = '';

              if (currentLayout === 'hindi-remington' && k.hindiRemington) {
                primaryChar = k.hindiRemington;
                cornerSubKey = k.label.split(' ')[0];
              } else if (currentLayout === 'hindi-inscript' && k.hindiInscript) {
                primaryChar = k.hindiInscript;
                cornerSubKey = k.label.split(' ')[0];
              }

              return (
                <div
                  key={kIdx}
                  className={`relative flex flex-col items-center justify-center rounded-lg border text-xs font-mono font-medium transition-all duration-100 ${k.width} h-11 ${keyBg}`}
                >
                  {/* Primary Key Character */}
                  <span className={`font-black text-sm ${currentLayout !== 'english' && k.hindiRemington ? 'text-amber-700 dark:text-amber-300 font-sans' : ''}`}>
                    {primaryChar}
                  </span>

                  {/* Corner English Key Hint when in Hindi Layout */}
                  {cornerSubKey && currentLayout !== 'english' && (
                    <span className="absolute top-0.5 right-1 text-[9px] font-sans font-bold opacity-50 uppercase">
                      {cornerSubKey}
                    </span>
                  )}

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
