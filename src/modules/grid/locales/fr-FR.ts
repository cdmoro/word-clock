import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'ILNESTODEUX', // 0-10: "IL", "EST" and numbers (2)
  'QUATRETROIS', // 11-21: numbers (4-3)
  'NEUFUNESEPT', // 22-32: numbers (9-1-7)
  'HUITSIXCINQ', // 33-43: numbers (8-6-5)
  'MIDIXMINUIT', // 44-54: "MIDI" and "MINUIT"
  'ONZERHEURES', // 55-65: "ONZE" and "HEURES"
  'MOINSOLEDIX', // 66-76: "MOINS" and "DIX"
  'ETRQUATRPMD', // 77-87: "ET" and "QUART"
  'VINGT-CINQU', // 88-98: "VINGT" and "CINQ"
  'ETSDEMIEPAM', // 99-109: "ET" and "DEMIE"
];

const commonWords: CommonWords = {
  TWELVE: [44, 45, 46, 47],
  ONE: [26, 27, 28],
  TWO: [7, 8, 9, 10],
  THREE: [17, 18, 19, 20, 21],
  FOUR: [11, 12, 13, 14, 15, 16],
  FIVE: [40, 41, 42, 43],
  SIX: [37, 38, 39],
  SEVEN: [29, 30, 31, 32],
  EIGHT: [33, 34, 35, 36],
  NINE: [22, 23, 24, 25],
  TEN: [46, 47, 48],
  ELEVEN: [55, 56, 57, 58],
  FIVE_MIN: [94, 95, 96, 97],
  TEN_MIN: [74, 75, 76],
  QUARTER_MIN: [80, 81, 82, 83, 84],
  TWENTY_MIN: [88, 89, 90, 91, 92],
  TWENTYFIVE_MIN: [88, 89, 90, 91, 92, 93, 94, 95, 96, 97],
  HALF: [102, 103, 104, 105, 106],
};

const localeWords = {
  IL: [0, 1],
  EST: [3, 4, 5],
  HEURES: [60, 61, 62, 63, 64, 65],
  MIDI: [44, 45, 46, 47],
  MINUIT: [48, 49, 50, 51, 52, 53],
  MOINS: [66, 67, 68, 69, 70],
  ET: [99, 100],
};

function getLocaleWordKeys(hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // Use "IL EST" regardless of the hour
  wordKeys.push('IL', 'EST');

  // Determine whether to use "ET" or "MOINS"
  if (minutes >= 35) {
    wordKeys.push('MOINS');
  } else if (minutes >= 30 && minutes < 35) {
    wordKeys.push('ET');
  }

  if (hours !== 0 && hours !== 12) wordKeys.push('HEURES');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 3, 4, 5],
  examples: {
    '12:30': 'IL EST MIDI ET DEMIE',
    '12:32': 'IL EST MIDI ET DEMIE',
    '12:35': 'IL EST UNE HEURES MOINS VINGT-CINQ',
  },
} satisfies GridConfig;
