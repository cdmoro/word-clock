import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'HETKISAVIJF', // 0-10 ("HET", "IS", "VIJF")
  'TIENATZVOOR', // 11-21 ("TIEN", "VOOR")
  'OVERMEKWART', // 22-32 ("OVER", "KWART")
  'HALFSPMOVER', // 33-43 ("HALF", "OVER")
  'VOORTHGÉÉNS', // 44-54 ("VOOR")
  'TWEEAMCDRIE', // 55-65 ("TWEE", "DRIE")
  'VIERVIJFZES', // 66-76 ("VIER", "VIJF", "ZES")
  'ZEVENONEGEN', // 77-87 ("ZEVEN", "NEGEN")
  'ACHTTIENELF', // 88-98 ("ACHT", "TIEN", "ELF")
  'TWAALFPMUUR', // 99-109 ("TWAALF", "UUR")
];

const commonWords: CommonWords = {
  TWELVE: [99, 100, 101, 102, 103], // TWAALF
  ONE: [51, 52, 53], // ÉÉN
  TWO: [55, 56, 57, 58], // TWEE
  THREE: [62, 63, 64, 65], // DRIE
  FOUR: [66, 67, 68, 69], // VIER
  FIVE: [70, 71, 72, 73], // VIJF
  SIX: [74, 75, 76], // ZES
  SEVEN: [77, 78, 79, 80, 81], // ZEVEN
  EIGHT: [88, 89, 90, 91], // ACHT
  NINE: [83, 84, 85, 86, 87], // NEGEN
  TEN: [92, 93, 94, 95], // TIEN
  ELEVEN: [96, 97, 98], // ELF
  FIVE_MIN: [7, 8, 9, 10], // VIJF (five minutes)
  TEN_MIN: [11, 12, 13, 14], // TIEN (ten minutes)
  QUARTER_MIN: [28, 29, 30, 31, 32], // KWART (quarter)
  TWENTY_MIN: [11, 12, 13, 14], // TWINTIG (optional, if "twenty" is used in other variations)
  TWENTYFIVE_MIN: [
    [7, 8, 9, 10],
    [33, 34, 35, 36],
  ],
  HALF: [33, 34, 35, 36], // HALF
};

const localeWords = {
  HET: [0, 1, 2], // HET
  IS: [4, 5], // IS
  VOOR: [18, 19, 20, 21], // VOOR
  VOOR2: [44, 45, 46, 47], // VOOR
  OVER: [22, 23, 24, 25], // OVER
  KWART: [27, 28, 29, 30, 31], // KWART
  UUR: [107, 108, 109], // UUR
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['HET', 'IS'];

  // Determine whether to use "OVER" or "VOOR" based on minutes
  if (minutes >= 45 && minutes < 55) wordKeys.push('VOOR2');
  else if ((minutes >= 20 && minutes < 30) || minutes >= 45) {
    // Use "VOOR" (before) and move to the next hour
    wordKeys.push('VOOR');
  } else if ((minutes >= 5 && minutes < 20) || (minutes >= 35 && minutes < 45)) {
    wordKeys.push('OVER');
  }

  if ((minutes >= 20 && minutes < 25) || (minutes >= 40 && minutes < 45)) {
    wordKeys.push('HALF');
  }

  // Use "UUR" for on-the-hour times
  if (minutes === 0) {
    wordKeys.push('UUR');
  }

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
  secondaryChars: [0, 1, 2, 4, 5],
  hourMark: 20,
  examples: {
    '01:00': 'HET IS ÉÉN UUR',
    '01:05': 'HET IS VIJF OVER ÉÉN',
    '01:10': 'HET IS TIEN OVER ÉÉN',
    '01:15': 'HET IS OVER KWART ÉÉN',
    '01:20': 'HET IS TIEN VOOR HALF TWEE',
    '01:25': 'HET IS VIJF VOOR HALF TWEE',
    '01:30': 'HET IS HALF TWEE',
    '01:35': 'HET IS VIJF OVER HALF TWEE',
    '01:40': 'HET IS TIEN OVER HALF TWEE',
    '01:45': 'HET IS KWART VOOR TWEE',
    '01:50': 'HET IS TIEN VOOR TWEE',
    '01:55': 'HET IS VIJF VOOR TWEE',
    '02:00': 'HET IS TWEE UUR',
    '14:00': 'HET IS TWEE UUR',
    '05:55': 'HET IS VIJF VOOR ZES',
    '17:55': 'HET IS VIJF VOOR ZES',
  },
} satisfies GridConfig;
