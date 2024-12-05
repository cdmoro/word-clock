import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'ESKISCHAFÜF', // 0-10: ES, ISCH, FÜF
  'VIERTUBFZÄÄ', // 11-21: VIERTU, ZWÄNZG
  'ZWÄNZGSIVOR', // 22-32: ZWÄNZG, SI, VOR
  'ABOHAUBIEPM', // 33-43: AB, HAUBI, PM
  'EISZWÖISDRÜ', // 44-54: EIS, ZWÖI, DRÜ
  'VIERIFÜFIQT', // 55-65: VIERI, FÜFI
  'SÄCHSISIBNI', // 66-76: SÄCHSI, SIBNI
  'ACHTINÜNIEL', // 77-87: ACHTI, NÜNI
  'ZÄNIERBEUFI', // 88-98: ZÄNI, BEUFI
  'ZWÖUFIAMUHR', // 99-109: ZWÖUFI, UHR
];

const commonWords: CommonWords = {
  ONE: [44, 45, 46], // EIS
  TWO: [47, 48, 49, 50], // ZWÖI
  THREE: [52, 53, 54], // DRÜ
  FOUR: [55, 56, 57, 58], // VIERI
  FIVE: [60, 61, 62], // FÜF
  SIX: [66, 67, 68, 69, 70, 71], // SÄCHSI
  SEVEN: [72, 73, 74, 75, 76], // SIBNI
  EIGHT: [77, 78, 79, 80, 81], // ACHTI
  NINE: [82, 83, 84, 85], // NÜNI
  TEN: [88, 89, 90, 91], // ZÄNI
  ELEVEN: [92, 93, 94], // ELF
  TWELVE: [99, 100, 101, 102, 103, 104], // ZWÖUFI
  FIVE_MIN: [8, 9, 10], // FÜF
  TEN_MIN: [19, 20, 21], // ZÄÄ
  QUARTER_MIN: [11, 12, 13, 14, 15, 16], // VIERTU
  TWENTY_MIN: [22, 23, 24, 25, 26, 27], // ZWÄNZG
  TWENTYFIVE_MIN: [
    [8, 9, 10], // FÜF
    [22, 23, 24, 25, 26], // ZWÄNZG
  ],
  HALF: [36, 37, 38, 39, 40], // HAUBI
};

const localeWords = {
  ES: [0, 1], // ES
  ISCH: [3, 4, 5, 6], // ISCH
  VOR: [30, 31, 32], // VOR
  AB: [33, 34], // AB (AFTER)
  HAUBI: [33, 34, 35, 36], // HAUBI (HALF)
  UHR: [107, 108, 109], // UHR (O'CLOCK)
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // "ES" and "ISCH" are always included in the phrase
  wordKeys.push('ES', 'ISCH');

  if (minutes >= 35) {
    wordKeys.push('VOR');
  } else if (minutes >= 5 && minutes < 30) {
    wordKeys.push('AB');
  }

  //   if (minutes >= 25 && minutes < 35) wordKeys.push('HAUBI'); // Half-past logic
  if (minutes < 5) wordKeys.push('UHR'); // Exact hour

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
  secondaryChars: [0, 1, 3, 4, 5, 6],
  fuzzyDictionary: {
    uhr: 'Uhr',
  },
  hourMark: 30,
  examples: {
    '01:00': 'ES ISCH EIS UHR', // Exact hour
    '01:05': 'ES ISCH FÜF AB EIS', // 5 past 1
    '01:10': 'ES ISCH ZÄÄ AB EIS', // 10 past 1
    '01:15': 'ES ISCH VIERTU AB EIS', // Quarter past 1
    '01:20': 'ES ISCH ZWÄNZG AB EIS', // 20 past 1
    '01:25': 'ES ISCH FÜF ZWÄNZ AB EIS', // 25 past 1
    '01:30': 'ES ISCH HAUBI ZWÖI', // Half-past 1
    '01:35': 'ES ISCH FÜF ZWÄNZ VOR ZWÖI', // 5 past half 2
    '01:40': 'ES ISCH ZWÄNZG VOR ZWÖI', // 20 to 2
    '01:45': 'ES ISCH VIERTU VOR ZWÖI', // Quarter to 2
    '01:50': 'ES ISCH ZÄÄ VOR ZWÖI', // 10 to 2
    '01:55': 'ES ISCH FÜF VOR ZWÖI', // 5 to 2
    '02:00': 'ES ISCH ZWÖI UHR', // Exact hour
    '07:30': 'ES ISCH HAUBI ACHTI', // Half-past 7
    '10:00': 'ES ISCH ZÄNI UHR', // Exact hour
    '12:00': 'ES ISCH ZWÖUFI UHR', // Noon
    '12:30': 'ES ISCH HAUBI EIS', // Half-past 12
    '17:05': 'ES ISCH FÜF AB FÜF', // 5 past 5
    '20:26': 'ES ISCH FÜF ZWÄNZ AB ACHTI', // 5 before half-past 8
  },
} satisfies GridConfig;
