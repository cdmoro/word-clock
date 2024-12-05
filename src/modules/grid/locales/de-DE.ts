import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'ESKISTAFÜNF', // 0-10: ES, IST, FÜNF
  'ZEHNZWANZIG', // 11-21: ZEHN, ZWANZIG
  'DREIVIERTEL', // 22-32: DREI, VIERTEL
  'VORFUNKNACH', // 33-43: VOR, NACH
  'HALBAELFÜNF', // 44-54: HALB, ELF, FÜNF
  'EINSXAMZWEI', // 55-65: EINS, ZWEI
  'DREIPMJVIER', // 66-76: DREI, VIER
  'SECHSNLACHT', // 77-87: SECHS, ACHT
  'SIEBENZWÖLF', // 88-98: SIEBEN, ZWÖLF
  'ZEHNEUNKUHR', // 99-109: ZEHN, NEUN, UHR
];

const commonWords: CommonWords = {
  ONE: [55, 56, 57, 58], // EINS
  TWO: [62, 63, 64, 65], // ZWEI
  THREE: [66, 67, 68, 69], // DREI
  FOUR: [73, 74, 75, 76], // VIER
  FIVE: [51, 52, 53, 54], // FÜNF
  SIX: [77, 78, 79, 80, 81], // SECHS
  SEVEN: [88, 89, 90, 91, 92], // SIEBEN
  EIGHT: [84, 85, 86, 87], // ACHT
  NINE: [102, 103, 104, 105], // NEUN
  TEN: [99, 100, 101, 102], // ZEHN
  ELEVEN: [49, 50, 51], // ELF
  TWELVE: [94, 95, 96, 97, 98], // ZWÖLF
  FIVE_MIN: [7, 8, 9, 10], // FÜNF
  TEN_MIN: [11, 12, 13, 14], // ZEHN
  QUARTER_MIN: [26, 27, 28, 29, 30, 31, 32], // VIERTEL
  TWENTY_MIN: [15, 16, 17, 18, 19, 20, 21], // ZWANZIG
  TWENTYFIVE_MIN: [
    [7, 8, 9, 10],
    [15, 16, 17, 18, 19, 20, 21],
  ], // FÜNF + ZWANZIG
  HALF: [44, 45, 46, 47], // HALB
};

const localeWords = {
  ES: [0, 1],
  IST: [3, 4, 5],
  VOR: [33, 34, 35],
  NACH: [40, 41, 42, 43],
  HALB: [44, 45, 46, 47],
  UHR: [107, 108, 109],
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // Determine whether to use "VOR" or "NACH"
  if (minutes >= 35) {
    // Use "VOR" and move to the next hour
    wordKeys.push('VOR');
  } else if (minutes >= 5 && minutes < 30) {
    wordKeys.push('NACH');
  }

  // Use "ES" and "IST" for the phrase in German
  wordKeys.push('ES', 'IST');

  if (minutes >= 0 && minutes < 5) wordKeys.push('UHR');

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
  fuzzyDictionary: {
    uhr: 'Uhr',
  },
  hourMark: 30,
  examples: {
    '01:00': 'ES IST EINS UHR',
    '01:05': 'ES IST FÜNF NACH EINS',
    '01:10': 'ES IST ZEHN NACH EINS',
    '01:15': 'ES IST VIERTEL NACH EINS',
    '01:20': 'ES IST ZWANZIG NACH EINS',
    '01:25': 'ES IST FÜNF ZWANZIG NACH EINS',
    '01:30': 'ES IST HALB ZWEI',
    '01:35': 'ES IST FÜNF ZWANZIG VOR ZWEI',
    '01:40': 'ES IST ZWANZIG VOR ZWEI',
    '01:45': 'ES IST VIERTEL VOR ZWEI',
    '01:50': 'ES IST ZEHN VOR ZWEI',
    '01:55': 'ES IST FÜNF VOR ZWEI',
    '02:00': 'ES IST ZWEI UHR',
    '07:30': 'ES IST HALB ACHT',
    '10:00': 'ES IST ZEHN UHR',
    '12:00': 'ES IST ZWÖLF UHR',
    '12:30': 'ES IST HALB EINS',
    '17:05': 'ES IST FÜNF NACH FÜNF',
    '20:26': 'ES IST FÜNF ZWANZIG NACH ACHT',
  },
} satisfies GridConfig;
