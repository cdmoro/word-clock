import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'SONORLEBORE', // 0-10: "SONO", "LE"
  'ÈRLUNASDUEZ', // 11-21: "È" and numbers (1, 2)
  'TREOTTONOVE', // 22-32: numbers (3-8-9)
  'DIECIUNDICI', // 33-43: numbers (10-11)
  'DODICISETTE', // 44-54: numbers (12-7)
  'QUATTROCSEI', // 55-65: numbers (4-6)
  'CINQUEAMENO', // 66-76: numbers (5) and "MENO"
  'ECUNOQUARTO', // 77-87: "E" and "QUARTO"
  'VENTICINQUE', // 88-98: "VENTI" and "CINQUE"
  'DIECIPMEZZA', // 99-109: "DIECI" and "MEZZA"
];

const commonWords: CommonWords = {
  TWELVE: [44, 45, 46, 47, 48, 49],
  ONE: [13, 14, 15, 16],
  TWO: [18, 19, 20],
  THREE: [22, 23, 24],
  FOUR: [55, 56, 57, 58, 59, 60, 61],
  FIVE: [66, 67, 68, 69, 70, 71],
  SIX: [63, 64, 65],
  SEVEN: [50, 51, 52, 53, 54],
  EIGHT: [25, 26, 27, 28],
  NINE: [29, 30, 31, 32],
  TEN: [33, 34, 35, 36, 37],
  ELEVEN: [38, 39, 40, 41, 42, 43],
  FIVE_MIN: [93, 94, 95, 96, 97, 98],
  TEN_MIN: [99, 100, 101, 102, 103],
  QUARTER_MIN: [82, 83, 84, 85, 86, 87],
  TWENTY_MIN: [88, 89, 90, 91, 92],
  TWENTYFIVE_MIN: [88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98],
  HALF: [105, 106, 107, 108, 109],
};

const localeWords = {
  SONO: [0, 1, 2, 3],
  È: [11],
  LE: [5, 6],
  // L: [13],
  ORE: [6, 7, 8, 9, 10],
  MENO: [73, 74, 75, 76],
  E: [77],
};

function getLocaleWordKeys(hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // Determine whether to use "E" or "MENO"
  if (minutes >= 35) {
    // Use "MENO" and move to the next hour
    // hours = (hours + 1) % 12 || 12;
    wordKeys.push('MENO');
  } else if (minutes >= 5) {
    wordKeys.push('E');
  }

  // Use "È" for one o'clock, otherwise use "SONO" for other hours
  wordKeys.push(hours % 12 === 1 ? 'È' : 'SONO');
  // wordKeys.push(hours % 12 === 1 ? 'L' : 'LE');
  if (hours % 12 !== 1) wordKeys.push('LE');
  // else if (hours === 1) wordKeys.push('L');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  charsWithApostrophe: [13],
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2, 3, 5, 6, 11, 13, 14, 15, 16],
  examples: {
    '12:30': 'SONO LE DODICI E MEZZA',
    '12:32': 'SONO LE DODICI E MEZZA',
    '12:35': 'È L’UNA MENO VENTICINQUE',
    '22:58': 'SONO LE UNDICI MENO CINQUE',
  },
} satisfies GridConfig;
