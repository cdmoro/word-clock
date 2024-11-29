import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'ESTEZORAPMO', // 0-10 ("ESTE", "ORA")
  'DOUĂNSPREAM', // 11-21 ("DOUĂ", "UNSPREZECE")
  'UNSPREZECEL', // 22-32 ("UNSPREZECE", "DOUĂSPREZECE")
  'NOUĂOPTȘASE', // 33-43 ("NOUĂ", "OPT", "ȘASE")
  'PATRUNUTREI', // 44-54 ("PATRU", "UNU", "TREI")
  'ȘAPTECINCIA', // 55-65 ("ȘAPTE", "CINCI")
  'ȘIBTREIZECI', // 66-76 ("ȘI", "TREIZECI")
  'FĂRĂOZECEUN', // 77-87 ("FĂRĂ", "ZECE", "UN")
  'DOUĂZECIVȘI', // 88-98 ("DOUĂZECI", "ȘI")
  'CINCIUSFERT', // 99-109 ("CINCI", "FERT", "UN SFERT")
];

const commonWords: CommonWords = {
  TWELVE: [
    [11, 12, 13, 14],
    [24, 25, 26, 27, 28, 29, 30, 31],
  ], // DOUĂSPREZECE
  ONE: [48, 49, 50], // UNU
  TWO: [11, 12, 13, 14], // DOUĂ
  THREE: [51, 52, 53, 54], // TREI
  FOUR: [44, 45, 46, 47, 48], // PATRU
  FIVE: [60, 61, 62, 63, 64], // CINCI
  SIX: [40, 41, 42, 43], // ȘASE
  SEVEN: [55, 56, 57, 58, 59], // ȘAPTE
  EIGHT: [37, 38, 39], // OPT
  NINE: [33, 34, 35, 36], // NOUĂ
  TEN: [28, 29, 30, 31], // ZECE
  ELEVEN: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31], // UNSPREZECE
  FIVE_MIN: [99, 100, 101, 102, 103], // CINCI (five minutes)
  TEN_MIN: [82, 83, 84, 85], // ZECE (ten minutes)
  QUARTER_MIN: [
    [86, 87],
    [105, 106, 107, 108, 109],
  ], // UN SFERT (quarter)
  TWENTY_MIN: [88, 89, 90, 91, 92, 93, 94, 95], // DOUĂZECI
  TWENTYFIVE_MIN: [
    [88, 89, 90, 91, 92, 93, 94, 95],
    [97, 98],
    [99, 100, 101, 102, 103],
  ], // DOUĂZECI ȘI CINCI
  HALF: [69, 70, 71, 72, 73, 74, 75, 76], // TREIZECI (half)
};

const localeWords = {
  ESTE: [0, 1, 2, 3], // ESTE
  ORA: [5, 6, 7], // ORA
  ȘI: [66, 67], // ȘI
  FĂRĂ: [77, 78, 79, 80], // FĂRĂ
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['ESTE', 'ORA'];

  if (minutes >= 35) {
    wordKeys.push('FĂRĂ');
  } else if (minutes >= 5) {
    wordKeys.push('ȘI');
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
  secondaryChars: [0, 1, 2, 3, 5, 6, 7],
  examples: {
    '01:00': 'ESTE ORA UNU',
    '01:05': 'ESTE ORA UNU ȘI CINCI',
    '01:10': 'ESTE ORA UNU ȘI ZECE',
    '01:15': 'ESTE ORA UNU ȘI UN SFERT',
    '01:20': 'ESTE ORA UNU ȘI DOUĂZECI',
    '01:25': 'ESTE ORA UNU ȘI DOUĂZECI ȘI CINCI',
    '01:30': 'ESTE ORA UNU ȘI TREIZECI',
    '01:35': 'ESTE ORA DOUĂ FĂRĂ DOUĂZECI ȘI CINCI',
    '01:40': 'ESTE ORA DOUĂ FĂRĂ DOUĂZECI',
    '01:45': 'ESTE ORA DOUĂ FĂRĂ UN SFERT',
    '01:50': 'ESTE ORA DOUĂ FĂRĂ ZECE',
    '01:55': 'ESTE ORA DOUĂ FĂRĂ CINCI',
    '02:00': 'ESTE ORA DOUĂ',
    '02:35': 'ESTE ORA TREI FĂRĂ DOUĂZECI ȘI CINCI',
    '03:00': 'ESTE ORA TREI',
    '03:35': 'ESTE ORA PATRU FĂRĂ DOUĂZECI ȘI CINCI',
    '04:00': 'ESTE ORA PATRU',
    '04:35': 'ESTE ORA CINCI FĂRĂ DOUĂZECI ȘI CINCI',
    '17:00': 'ESTE ORA CINCI',
    '17:35': 'ESTE ORA ȘASE FĂRĂ DOUĂZECI ȘI CINCI',
    '18:00': 'ESTE ORA ȘASE',
    '18:35': 'ESTE ORA ȘAPTE FĂRĂ DOUĂZECI ȘI CINCI',
  },
} satisfies GridConfig;
