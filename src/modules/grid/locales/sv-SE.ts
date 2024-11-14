import { CommonWords, LocaleGridConfig, WordKeys } from '../../../types';

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
  TWO: [63, 64, 65], // TVÅ
  THREE: [66, 67, 68], // TRE
  FOUR: [72, 73, 74, 75], // FYRA
  FIVE: [77, 78, 79], // FEM
  SIX: [84, 85, 86], // SEX
  SEVEN: [88, 89, 90], // SJU
  EIGHT: [91, 92, 93, 94], // ÅTTA
  NINE: [95, 96, 97], // NIO
  TEN: [11, 12, 13], // TIO
  ELEVEN: [102, 103, 104, 105], // ELVA
  FIVE_MIN: [11, 12, 13], // FEM (five minutes)
  TEN_MIN: [17, 18, 19], // TIO (ten minutes)
  QUARTER_MIN: [22, 23, 24, 25, 26], // KVART (quarter)
  TWENTY_MIN: [33, 34, 35, 36, 37], // TJUGO (twenty)
  TWENTYFIVE_MIN: (_hours, minutes) =>
    minutes >= 25 && minutes < 30
      ? [[11, 12, 13], [39], [51, 52, 53, 54]]
      : [
          [11, 12, 13],
          [44, 45, 46, 47],
          [51, 52, 53, 54],
        ],
  HALF: [51, 52, 53, 54], // HALV
};

const localeWords = {
  KLOCKAN: [0, 1, 2, 3, 4, 5, 6], // KLOCKAN
  ÄR: [8, 9], // ÄR
  ÖVER: [44, 45, 46, 47], // ÖVER
  I: [39],
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['KLOCKAN', 'ÄR'];

  if (minutes >= 5 && minutes < 25) {
    wordKeys.push('ÖVER');
  }

  if (minutes >= 40) {
    wordKeys.push('I');
  }

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2, 3, 4, 5, 6, 8, 9],
  hourMark: 25,
} satisfies LocaleGridConfig;
