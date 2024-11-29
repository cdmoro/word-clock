import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'KLOKKENVERM', // 0-10 ("KLOKKEN", "ER")
  'FEMHPÅSUFIS', // 11-21 ("FEM", "PÅ")
  'TILPÅSIDOSN', // 22-32 ("TIL", "PÅ")
  'KVARTNPÅSTO', // 33-43 ("KVART", "PÅ")
  'OVERXAMBPMZ', // 44-54 ("OVER")
  'HALVBIEGENZ', // 55-65 ("HALV", "EN")
  'ETTNTOATREX', // 66-76 ("ETT", "TO", "TRE")
  'FIREFEMSEKS', // 77-87 ("FIRE", "FEM", "SEKS")
  'SYVÅTTENITI', // 88-98 ("SYV", "ÅTTE", "NI")
  'ELLEVESTOLV', // 99-109 ("ELLEVE", "TOLV")
];

const commonWords: CommonWords = {
  TWELVE: [106, 107, 108, 109], // TOLV
  ONE: [66, 67, 68], // ETT
  TWO: [70, 71], // TO
  THREE: [73, 74, 75], // TRE
  FOUR: [77, 78, 79, 80], // FIRE
  FIVE: [81, 82, 83], // FEM
  SIX: [84, 85, 86, 87], // SEKS
  SEVEN: [88, 89, 90], // SYV
  EIGHT: [91, 92, 93, 94], // ÅTTE
  NINE: [95, 96], // NI
  TEN: [97, 98], // TI
  ELEVEN: [99, 100, 101, 102, 103, 104], // ELLEVE
  FIVE_MIN: [11, 12, 13], // FEM
  TEN_MIN: [22, 23], // TI
  QUARTER_MIN: [33, 34, 35, 36, 37], // KVART
  TWENTY_MIN: [22, 23], // TI
  TWENTYFIVE_MIN: [11, 12, 13],
  HALF: [55, 56, 57, 58], // HALV
};

const localeWords = {
  KLOKKEN: [0, 1, 2, 3, 4, 5, 6], // KLOKKEN
  ER: [8, 9], // ER
  OVER: [44, 45, 46, 47], // OVER
  HALV: [55, 56, 57, 58], // HALV
  PÅ: [39, 40], // PÅ
  TIL: [22, 23], // TI
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['KLOKKEN', 'ER'];

  // Determine if "OVER" or "PÅ" should be used based on minutes
  if ((minutes >= 20 && minutes < 30) || (minutes >= 45 && minutes < 60)) {
    wordKeys.push('PÅ');
  } else if ((minutes >= 5 && minutes < 20) || (minutes >= 35 && minutes < 45)) {
    wordKeys.push('OVER');
  }

  // Add "HALV" if it's a half-past time, and round up to the next hour
  if ((minutes >= 20 && minutes < 30) || (minutes >= 35 && minutes < 45)) {
    wordKeys.push('HALV');
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
  secondaryChars: [0, 1, 2, 3, 4, 5, 6, 8, 9],
  hourMark: 20,
  examples: {
    '01:00': 'KLOKKEN ER ETT',
    '01:05': 'KLOKKEN ER FEM OVER ETT',
    '01:10': 'KLOKKEN ER TI OVER ETT',
    '01:15': 'KLOKKEN ER KVART OVER ETT',
    '01:20': 'KLOKKEN ER TI PÅ HALV TO',
    '01:25': 'KLOKKEN ER FEM PÅ HALV TO',
    '01:30': 'KLOKKEN ER HALV TO',
    '01:35': 'KLOKKEN ER FEM OVER HALV TO',
    '01:40': 'KLOKKEN ER TI OVER HALV TO',
    '01:45': 'KLOKKEN ER KVART PÅ TO',
    '01:50': 'KLOKKEN ER TI PÅ TO',
    '01:55': 'KLOKKEN ER FEM PÅ TO',
    '02:00': 'KLOKKEN ER TO',
  },
} satisfies GridConfig;
