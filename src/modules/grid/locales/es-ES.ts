import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'ESONELASUNA', // 0-10
  'DOSITRESOAM', // 11-21
  'CUATROCINCO', // 22-32
  'SEISASIETEN', // 33-43
  'OCHONUEVEPM', // 44-54
  'LADIEZSONCE', // 55-65
  'DOCELYMENOS', // 66-76
  'OVEINTEDIEZ', // 77-87
  'VEINTICINCO', // 88-98
  'MEDIACUARTO', // 99-109
];

const commonWords: CommonWords = {
  TWELVE: [66, 67, 68, 69],
  ONE: [8, 9, 10],
  TWO: [11, 12, 13],
  THREE: [15, 16, 17, 18],
  FOUR: [22, 23, 24, 25, 26, 27],
  FIVE: [28, 29, 30, 31, 32],
  SIX: [33, 34, 35, 36],
  SEVEN: [38, 39, 40, 41, 42],
  EIGHT: [44, 45, 46, 47],
  NINE: [48, 49, 50, 51, 52],
  TEN: [57, 58, 59, 60],
  ELEVEN: [62, 63, 64, 65],
  FIVE_MIN: [94, 95, 96, 97, 98],
  TEN_MIN: [84, 85, 86, 87],
  QUARTER_MIN: [104, 105, 106, 107, 108, 109],
  TWENTY_MIN: [78, 79, 80, 81, 82, 83],
  TWENTYFIVE_MIN: [88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98],
  HALF: [99, 100, 101, 102, 103],
};

const localeWords = {
  ES: [0, 1],
  SON: [1, 2, 3],
  LA: [5, 6],
  LAS: [5, 6, 7],
  MENOS: [72, 73, 74, 75, 76],
  Y: [71],
};

function getLocaleWordKeys(hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // Determine whether to use "Y" or "MENOS"
  if (minutes >= 35) {
    // Use "MENOS" and move to the next hour
    wordKeys.push('MENOS');
  } else if (minutes >= 5) {
    wordKeys.push('Y');
  }

  // Use "ES" for one o'clock, otherwise use "SON" for other hours
  wordKeys.push(hours % 12 === 1 ? 'ES' : 'SON');
  wordKeys.push(hours % 12 === 1 ? 'LA' : 'LAS');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  getLocaleWordKeys,
  secondaryChars: [0, 1, 2, 3, 5, 6, 7],
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  examples: {
    '12:30': 'SON LAS DOCE Y MEDIA',
    '12:32': 'SON LAS DOCE Y MEDIA',
    '12:35': 'ES LA UNA MENOS VEINTICINCO',
  },
} satisfies GridConfig;
