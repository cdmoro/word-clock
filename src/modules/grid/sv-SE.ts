import { CommonWords, LocaleGridConfig, WordKeys } from '../../types';

const grid = [
  'KLOCKANTÄRK', // 0-10 ("KLOCKAN", "ÄR")
  'FEMYISTIONI', // 11-21 ("FEM", "TIO")
  'KVARTQIENZO', // 22-32 ("KVART")
  'TJUGOLIVIPM', // 33-43 ("TJUGO")
  'ÖVERKAMHALV', // 44-54 ("ÖVER", "HALV")
  'ETTUSVLXTVÅ', // 55-65 ("ETT", "TVÅ")
  'TREMYKYFYRA', // 66-76 ("TRE", "FYRA")
  'FEMSFLORSEX', // 77-87 ("FEM", "SEX")
  'SJUÅTTAINIO', // 88-98 ("SJU", "ÅTTA", "NIO")
  'TIOELVATOLV', // 99-109 ("TIO", "ELVA", "TOLV")
];

const commonWords: CommonWords = {
  TWELVE: [106, 107, 108, 109], // TOLV
  ONE: [55, 56, 57], // ETT
  TWO: [62, 63, 64], // TVÅ
  THREE: [66, 67, 68], // TRE
  FOUR: [72, 73, 74, 75], // FYRA
  FIVE: [77, 78, 79], // FEM
  SIX: [84, 85, 86], // SEX
  SEVEN: [88, 89, 90], // SJU
  EIGHT: [91, 92, 93, 94], // ÅTTA
  NINE: [95, 96, 97], // NIO
  TEN: [11, 12, 13], // TIO
  ELEVEN: [102, 103, 104, 105], // ELVA
  FIVE_MIN: [77, 78, 79], // FEM (five minutes)
  TEN_MIN: [11, 12, 13], // TIO (ten minutes)
  QUARTER_MIN: [22, 23, 24, 25, 26], // KVART (quarter)
  TWENTY_MIN: [33, 34, 35, 36, 37], // TJUGO (twenty)
  TWENTYFIVE_MIN: [
    [33, 34, 35, 36, 37],
    [77, 78, 79],
  ],
  HALF: [48, 49, 50, 51], // HALV
};

const localeWords = {
  KLOCKAN: [0, 1, 2, 3, 4, 5, 6], // KLOCKAN
  ÄR: [8, 9], // ÄR
  ÖVER: [44, 45, 46, 47], // ÖVER
  HALV: [48, 49, 50, 51], // HALV
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['KLOCKAN', 'ÄR'];

  // Determine whether to use "ÖVER" or "HALV" based on minutes
  if (minutes >= 35) {
    // Use "HALV" for half-past times and round up to the next hour
    wordKeys.push('HALV');
  } else if (minutes >= 5) {
    wordKeys.push('ÖVER');
  }

  // If it's exactly on the hour, use "KLOCKAN" and "ÄR" for "It's [hour] o'clock"
  if (minutes === 0) {
    wordKeys.push('ÄR');
  }

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  commonWords,
  localeWords,
  secondaryChars: [0, 1, 2, 3, 4, 5, 6],
} satisfies LocaleGridConfig;
