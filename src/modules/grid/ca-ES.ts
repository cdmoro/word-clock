import { CommonWords, LocaleGridConfig, WordKeys } from '../../types';

const grid = [
  'ÉSÓNRLAMUNA', // 0-10 ("ÉS", "UNA")
  'DOSLESNTRES', // 11-21 ("DOS", "TRES")
  'CINCQUARTSU', // 22-32 ("CINC", "QUARTS")
  'MENYSIECINC', // 33-43 ("MENYS", "I", "CINC")
  'DEDRUNAONZE', // 44-54 ("DE", "UNA", "ONZE")
  'DUESTRESETD', // 55-65 ("DUES", "TRES", "SET")
  'QUATREDOTZE', // 66-76 ("QUATRE", "DOTZE")
  'VUITNOUONZE', // 77-87 ("VUIT", "NOU", "ONZE")
  'SISAMDEUNPM', // 88-98 ("SIS", "UN")
  'MENYSIACINC', // 99-109 ("MENYS", "I", "CINC")
];

const commonWords: CommonWords = {
  TWELVE: [72, 73, 74, 75, 76], // DOTZE
  ONE: (_hours, minutes) => (minutes === 30 ? [] : [8, 9, 10]), // UNA
  TWO: [55, 56, 57, 58], // DUES
  THREE: [18, 19, 20, 21], // TRES
  FOUR: [66, 67, 68, 69, 70, 71], // QUATRE
  FIVE: [22, 23, 24, 25], // CINC
  SIX: [88, 89, 90], // SIS
  SEVEN: [62, 63, 64], // SET
  EIGHT: [77, 78, 79, 80], // VUIT
  NINE: [81, 82, 83], // NOU
  TEN: [93, 94, 95], // DEU (es necesario añadirlo en la grilla si es requerido)
  ELEVEN: [51, 52, 53, 54], // ONZE
  FIVE_MIN: [106, 107, 108, 109], // CINC (cinco minutos)
  TEN_MIN: [93, 94, 95], // DEU (diez minutos, puede ser "I" o "MENYS")
  QUARTER_MIN: [26, 27, 28, 29, 30], // QUARTS (un cuarto)
  TWENTY_MIN: [33, 34, 35, 36, 37], // VINT (necesario añadirlo si se usa)
  TWENTYFIVE_MIN: [], // VINT I CINC (veinte y cinco)
  HALF: [
    [11, 12, 13],
    [26, 27, 28, 29, 30, 31],
  ], // MENYS (media)
};

const localeWords = {
  ÉS: [0, 1], // ÉS
  SON: [1, 2, 3], // SÓN
  LES: [14, 15, 16],
  MENYS: [99, 100, 101, 102], // MENYS
  I: [37], // I
  QUART: [28, 29, 30, 31, 32], // QUARTS
  DE: [44, 45],
  LA: [5, 6],
  UNA: [48, 49, 50],
};

function getLocaleWordKeys(hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // Determine whether to use "I" or "MENYS" based on minutes
  if (minutes >= 35) {
    // Use "MENYS" (before) and increment hour
    wordKeys.push('MENYS');
  }
  //   else if (minutes >= 5) {
  //     wordKeys.push('I');
  //   }
  if (minutes >= 30) {
    wordKeys.push('DE');
  }

  // Use "ÉS" for one o'clock, otherwise use "SON" for other hours
  // wordKeys.push(hours % 12 === 1 ? 'ÉS' : 'SON');

  if (hours === 1 && minutes >= 30 && minutes < 35) wordKeys.push('SON', 'UNA');
  else if (hours === 1) wordKeys.push('ÉS', 'LA');
  else if (minutes !== 30) wordKeys.push('LES');
  else wordKeys.push('SON');

  return wordKeys;
}

export default {
  grid,
  charsWithAphostrophe: [46],
  secondaryChars: [0, 1, 2, 3],
  getLocaleWordKeys,
  commonWords,
  localeWords,
} satisfies LocaleGridConfig;
