// Hindi Remington Gail (CPCT Standard) Keyboard Mapper & Key Helper

export interface KeyMapEntry {
  englishKey: string; // e.g. "k", "K", "e", "Shift+e"
  displayKey: string; // e.g. "K" or "Shift + K"
  hindiChar: string;  // e.g. "क", "म"
}

// QWERTY Key to Hindi Remington Gail Character Map
export const REMINGTON_GAIL_MAP: Record<string, string> = {
  // Lowercase Keys
  'q': 'ु',
  'w': 'ू',
  'e': 'म',
  'r': 'त',
  't': 'ज',
  'y': 'ल',
  'u': 'न',
  'i': 'प',
  'o': 'व',
  'p': 'च',
  '[': 'ख',
  ']': '़',
  'a': 'ो',
  's': 'े',
  'd': '्',
  'f': 'ि',
  'g': 'ह',
  'h': 'ी',
  'j': '्र',
  'k': 'ा',
  'l': 'स',
  ';': 'य',
  "'": 'श',
  'z': '्र',
  'x': 'ग',
  'c': 'ब',
  'v': 'अ',
  'b': 'इ',
  'n': 'द',
  'm': 'उ',
  ',': 'ए',
  '.': '।',
  '/': 'ध',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
  '0': '०',

  // Uppercase / Shift Keys
  'Q': 'फ',
  'W': 'ॉ',
  'E': 'म्',
  'R': 'त्',
  'T': 'ज्',
  'Y': 'ल्',
  'U': 'न्',
  'I': 'प्',
  'O': 'व्',
  'P': 'च्',
  '{': 'क्ष',
  '}': 'द्व',
  'A': 'ौ',
  'S': 'ै',
  'D': 'क',
  'F': 'थ',
  'G': 'भ',
  'H': 'भ',
  'J': 'श्र',
  'K': 'क',
  'L': 'स्',
  ':': 'रू',
  '"': 'ष',
  'Z': 'र्',
  'X': 'घ',
  'C': 'छ',
  'V': 'ट',
  'B': 'ठ',
  'N': 'छ',
  'M': 'ड',
  '<': 'ढ',
  '>': 'झ',
  '?': 'घ',
  ' ': ' '
};

// Map Hindi Character back to English Key Prompt
export const HINDI_TO_ENGLISH_KEY_MAP: Record<string, { key: string; hint: string }> = {
  'क': { key: 'k', hint: 'K or Shift+D' },
  'ख': { key: '[', hint: '[' },
  'ग': { key: 'x', hint: 'X' },
  'घ': { key: 'X', hint: 'Shift+X or ?' },
  'ङ': { key: 'M', hint: 'Shift+M' },
  'च': { key: 'p', hint: 'P' },
  'छ': { key: 'C', hint: 'Shift+C' },
  'ज': { key: 't', hint: 'T' },
  'झ': { key: '>', hint: 'Shift+>' },
  'ञ': { key: 'N', hint: 'Shift+N' },
  'ट': { key: 'V', hint: 'Shift+V' },
  'ठ': { key: 'B', hint: 'Shift+B' },
  'ड': { key: 'M', hint: 'Shift+M' },
  'ढ': { key: '<', hint: 'Shift+<' },
  'ण': { key: 'C', hint: 'Shift+C' },
  'त': { key: 'r', hint: 'R' },
  'थ': { key: 'F', hint: 'Shift+F' },
  'द': { key: 'n', hint: 'N' },
  'ध': { key: '/', hint: '/' },
  'न': { key: 'u', hint: 'U' },
  'प': { key: 'i', hint: 'I' },
  'फ': { key: 'Q', hint: 'Shift+Q' },
  'ब': { key: 'c', hint: 'C' },
  'भ': { key: 'G', hint: 'Shift+G' },
  'म': { key: 'e', hint: 'E' },
  'य': { key: ';', hint: ';' },
  'र': { key: 'j', hint: 'J' },
  'ल': { key: 'y', hint: 'Y' },
  'व': { key: 'o', hint: 'O' },
  'श': { key: "'", hint: "'" },
  'ष': { key: '"', hint: 'Shift+\'' },
  'स': { key: 'l', hint: 'L' },
  'ह': { key: 'g', hint: 'G' },
  'अ': { key: 'v', hint: 'V' },
  'आ': { key: 'v k', hint: 'V then K (अ + ा)' },
  'इ': { key: 'b', hint: 'B' },
  'ई': { key: 'b h', hint: 'B then H (इ + ी)' },
  'उ': { key: 'm', hint: 'M' },
  'ऊ': { key: 'm w', hint: 'M then W (उ + ू)' },
  'ऋ': { key: '0', hint: '0' },
  'ए': { key: ',', hint: ',' },
  'ऐ': { key: ', s', hint: ', then S (ए + े)' },
  'ओ': { key: 'v a', hint: 'V then A (अ + ो)' },
  'औ': { key: 'v A', hint: 'V then Shift+A (अ + ौ)' },
  'ा': { key: 'k', hint: 'K' },
  'ि': { key: 'f', hint: 'F' },
  'ी': { key: 'h', hint: 'H' },
  'ु': { key: 'q', hint: 'Q' },
  'ू': { key: 'w', hint: 'W' },
  'े': { key: 's', hint: 'S' },
  'ै': { key: 'S', hint: 'Shift+S' },
  'ो': { key: 'a', hint: 'A' },
  'ौ': { key: 'A', hint: 'Shift+A' },
  '्': { key: 'd', hint: 'D' },
  'ं': { key: 'a', hint: 'A or Shift+A' },
  'ँ': { key: 'W', hint: 'Shift+W' },
  'ः': { key: '%', hint: 'Shift+5' },
  '़': { key: ']', hint: ']' },
  '।': { key: '.', hint: '.' },
  ' ': { key: 'space', hint: 'Spacebar' }
};

/**
 * Get English physical key prompt for a given expected Hindi character
 */
export function getEnglishKeyHintForHindi(hindiChar: string): { keyLabel: string; hintText: string } {
  if (!hindiChar) return { keyLabel: '', hintText: '' };

  const char = hindiChar.trim() || ' ';
  if (char === ' ') return { keyLabel: 'SPACE', hintText: 'Press Spacebar' };

  if (HINDI_TO_ENGLISH_KEY_MAP[char]) {
    const entry = HINDI_TO_ENGLISH_KEY_MAP[char];
    return { keyLabel: entry.hint, hintText: `Press '${entry.hint}' on English keyboard for '${char}'` };
  }

  // Fallback search in REMINGTON_GAIL_MAP
  for (const [engKey, val] of Object.entries(REMINGTON_GAIL_MAP)) {
    if (val === char) {
      const display = engKey.length === 1 && engKey === engKey.toUpperCase() && /[A-Z]/.test(engKey)
        ? `Shift + ${engKey}`
        : engKey.toUpperCase();
      return { keyLabel: display, hintText: `Press '${display}' on English keyboard for '${char}'` };
    }
  }

  return { keyLabel: char, hintText: `Type '${char}'` };
}

/**
 * Convert typed English text to Remington Gail Hindi text automatically
 */
export function convertEnglishToRemingtonHindi(englishText: string): string {
  let result = '';
  for (let i = 0; i < englishText.length; i++) {
    const char = englishText[i];
    if (REMINGTON_GAIL_MAP[char] !== undefined) {
      result += REMINGTON_GAIL_MAP[char];
    } else {
      result += char; // retain spaces, newlines, or unmapped symbols
    }
  }
  return result;
}
