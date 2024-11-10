import { CommonWords, LocaleGridConfig, WordKeys } from '../../types';

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
  TWO: [63, 64, 65], // ZWEI
  THREE: [66, 67, 68, 69], // DREI
  FOUR: [73, 74, 75, 76], // VIER
  FIVE: [8, 9, 10], // FÜNF
  SIX: [77, 78, 79, 80, 81], // SECHS
  SEVEN: [88, 89, 90, 91, 92], // SIEBEN
  EIGHT: [84, 85, 86, 87], // ACHT
  NINE: [103, 104, 105], // NEUN
  TEN: [11, 12, 13], // ZEHN
  ELEVEN: [44, 45, 46], // ELF
  TWELVE: [93, 94, 95, 96], // ZWÖLF
  FIVE_MIN: [8, 9, 10], // FÜNF (reutilizando la palabra "cinco")
  TEN_MIN: [11, 12, 13], // ZEHN
  QUARTER_MIN: [22, 23, 24, 25, 26, 27, 28, 29, 30], // VIERTEL
  TWENTY_MIN: [11, 12, 13, 14, 15, 16, 17], // ZWANZIG
  TWENTYFIVE_MIN: [
    [8, 9, 10],
    [11, 12, 13, 14, 15, 16],
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
  }
  // else if (minutes >= 5) {
  //   wordKeys.push('NACH');
  // }

  // Use "ES" and "IST" for the phrase in German
  wordKeys.push('ES', 'IST');

  if (minutes >= 0 && minutes < 5) wordKeys.push('UHR');

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  commonWords,
  localeWords,
  secondaryChars: [0, 1, 3, 4, 5],
} satisfies LocaleGridConfig;
