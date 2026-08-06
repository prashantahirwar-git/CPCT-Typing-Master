export interface FingerDrill {
  id: string;
  name: string;
  row: 'Home Row' | 'Top Row' | 'Bottom Row' | 'Number Row' | 'Symbols' | 'Weak Keys';
  fingerGuide: string;
  text: string;
  description: string;
}

export const FINGER_DRILLS: FingerDrill[] = [
  {
    id: 'drill-home-1',
    name: 'Home Row Essentials',
    row: 'Home Row',
    fingerGuide: 'ASDF (Left Hand) - JKL; (Right Hand)',
    text: 'asdf jkl; asdf jkl; a s d f j k l ; asdfg hjkl; fall glad flask half salad a ask dad fads gash hall glad',
    description: 'Master the resting position for your 8 fingers. Always return fingers to these anchor keys.'
  },
  {
    id: 'drill-home-2',
    name: 'Home Row Words & Sentences',
    row: 'Home Row',
    fingerGuide: 'Keep thumbs rested lightly on the Spacebar',
    text: 'a dark flask; dad falls asleep; a glad lad had a flash; a glass fall; all lads dad; a sad fall',
    description: 'Build word rhythm using only home row keys.'
  },
  {
    id: 'drill-top-1',
    name: 'Top Row - QWERTY UIOP',
    row: 'Top Row',
    fingerGuide: 'Reach UP from Home Row without moving wrists',
    text: 'qwer tyui op qwer tyui op quiet power priority write report route quote equipment quiet wire pour type',
    description: 'Practice reaching up smoothly from ASDF and JKL; to top row keys.'
  },
  {
    id: 'drill-bottom-1',
    name: 'Bottom Row - ZXCVBNM',
    row: 'Bottom Row',
    fingerGuide: 'Reach DOWN from Home Row',
    text: 'zxcv bnm zxcv bnm zebra voice cabin maximum exam bacon vaccine carbon amazon brave combat volume',
    description: 'Flex fingers downward onto the bottom row.'
  },
  {
    id: 'drill-number-1',
    name: 'Number Row & Dates',
    row: 'Number Row',
    fingerGuide: 'Pinky to Index precision reaches to 12345 67890',
    text: '12345 67890 2026 15-08-1947 100 250 500 1000 9876543210 20-50 days cpct exam target speed 35 wpm',
    description: 'Crucial for numerical data entry in administrative CPCT tests.'
  },
  {
    id: 'drill-symbols-1',
    name: 'Special Symbols & Shift Key',
    row: 'Symbols',
    fingerGuide: 'Use opposite hand Shift key for uppercase & symbols',
    text: 'CPCT@2026 #Exam $100 %50 &More (MP.GOV.IN) {Pass} [Grade-A] <Type> "Speed" + Accuracy = Success!',
    description: 'Practice shift combinations and punctuation marks.'
  }
];
