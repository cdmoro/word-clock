import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'JEJSOUJEDNA', // 0-10 ("JE", "JSOU", "JEDNA")
  'DEVĚTPĚTDVĚ', // 11-21 ("DEVĚT", "PĚT", "DVĚ")
  'SEDMDVANÁCT', // 22-32 ("SEDM", "DVANÁCT")
  'DESETŘIŠEST', // 33-43 ("DESET", "TŘI", "ŠEST")
  'OSMJEDENÁCT', // 44-54 ("OSM", "JEDENÁCT")
  'ČTYŘIADESET', // 55-65 ("ČTYŘI", "A", "DESET")
  'DVACETŘICET', // 66-76 ("DVACET", "TŘICET")
  'PATNÁCTNULA', // 77-87 ("PATNÁCT", "NULA")
  'MEČTYŘICETM', // 88-98 ("ČTYŘICET")
  'PADESÁTDPĚT', // 99-109 ("PADESÁT", "PĚT")
];

const commonWords: CommonWords = {
  TWELVE: [26, 27, 28, 29, 30, 31, 32], // DVANÁCT
  ONE: [6, 7, 8, 9, 10], // JEDNA
  TWO: [19, 20, 21], // DVĚ
  THREE: [37, 38, 39], // TŘI
  FOUR: [55, 56, 57, 58, 59], // ČTYŘI
  FIVE: [16, 17, 18], // PĚT
  SIX: [40, 41, 42, 43], // ŠEST
  SEVEN: [22, 23, 24, 25], // SEDM
  EIGHT: [44, 45, 46], // OSM
  NINE: [11, 12, 13, 14, 15], // DEVĚT
  TEN: [61, 62, 63, 64, 65], // DESET
  ELEVEN: [47, 48, 49, 50, 51, 52, 53, 54], // JEDENÁCT
  FIVE_MIN: (_hours, minutes) =>
    minutes < 30
      ? [107, 108, 109]
      : [
          [99, 100, 101, 102, 103, 104, 105],
          [107, 108, 109],
        ], // PĚT
  TEN_MIN: (_hours, minutes) => (minutes < 30 ? [33, 34, 35, 36, 37] : [99, 100, 101, 102, 103, 104, 105]), // DESET
  QUARTER_MIN: (_hours, minutes) =>
    minutes < 30
      ? [77, 78, 79, 80, 81, 82, 83]
      : [
          [90, 91, 92, 93, 94, 95, 96, 97],
          [107, 108, 109],
        ], // PATNÁCT
  TWENTY_MIN: (_hours, minutes) => (minutes < 30 ? [66, 67, 68, 69, 70, 71] : [90, 91, 92, 93, 94, 95, 96, 97]), // DVACET
  TWENTYFIVE_MIN: (_hours, minutes) =>
    minutes < 30
      ? [
          [66, 67, 68, 69, 70, 71],
          [107, 108, 109],
        ]
      : [
          [71, 72, 73, 74, 75, 76],
          [107, 108, 109],
        ],
  HALF: [71, 72, 73, 74, 75, 76], // TŘICET
};

const localeWords = {
  JE: [0, 1], // JE
  JSOU: [2, 3, 4, 5], // JSOU
};

function getLocaleWordKeys(hours: number, _minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = hours >= 2 && hours <= 4 ? ['JSOU'] : ['JE'];
  // const wordKeys: WordKeys<typeof localeWords>[] = ['JE'];
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
  secondaryChars: [0, 1, 2, 3, 4],
  examples: {
    '01:00': 'JE JEDNA',
    '01:05': 'JE JEDNA PĚT',
    '01:10': 'JE JEDNA DESET',
    '01:15': 'JE JEDNA PATNÁCT',
    '01:20': 'JE JEDNA DVACET',
    '01:25': 'JE JEDNA DVACET PĚT',
    '01:30': 'JE JEDNA TŘICET',
    '01:35': 'JSOU DVĚ TŘICET PĚT',
    '01:40': 'JSOU DVĚ ČTYŘICET',
    '01:45': 'JSOU DVĚ ČTYŘICET PĚT',
    '01:50': 'JSOU DVĚ PADESÁT',
    '01:55': 'JSOU DVĚ PADESÁT PĚT',
    '02:00': 'JSOU DVĚ',
    '07:30': 'JE SEDM TŘICET',
  },
} satisfies GridConfig;
