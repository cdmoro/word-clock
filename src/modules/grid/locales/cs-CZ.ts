import { CommonWords, LocaleGridConfig, WordKeys } from '../../../types';

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
  FIVE: [107, 108, 109], // PĚT
  SIX: [41, 42, 43, 44], // ŠEST
  SEVEN: [22, 23, 24, 25], // SEDM
  EIGHT: [44, 45, 46], // OSM
  NINE: [11, 12, 13, 14, 15], // DEVĚT
  TEN: [61, 62, 63, 64, 54], // DESET
  ELEVEN: [47, 48, 49, 50, 51, 52, 53, 54], // JEDENÁCT
  FIVE_MIN: [16, 17, 18], // PĚT (cinco minutos)
  TEN_MIN: [33, 34, 35, 36, 37], // DESET (diez minutos)
  QUARTER_MIN: [77, 78, 79, 80, 81, 82, 83], // PATNÁCT (quince minutos)
  TWENTY_MIN: [66, 67, 68, 69, 70, 71], // DVACET (veinte minutos)
  TWENTYFIVE_MIN: [88, 89, 90, 91, 92, 93, 94],
  HALF: [71, 72, 73, 74, 75, 76], // TŘICET
};

const localeWords = {
  JE: [0, 1], // JE
  JSOU: [2, 3, 4], // JSOU
  //   OVER: [88, 89, 90, 91, 92], // ČTYŘICET
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = minutes === 0 ? ['JE'] : ['JSOU'];

  // Lógica para determinar "HALF" o "OVER"
  if (minutes >= 25 && minutes <= 35) {
    wordKeys.push('HALF');
  }
  //   else if (minutes > 35) {
  //     wordKeys.push('OVER');
  //   }

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2, 3, 4],
} satisfies LocaleGridConfig;
