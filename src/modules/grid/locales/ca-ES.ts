import { CommonWords, LocaleGridConfig, LocaleWords, WordKeys } from '../../../types';
import { HOURS } from '../constants';

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
  ONE: [8, 9, 10], // UNA
  TWO: [55, 56, 57, 58], // DUES
  THREE: [59, 60, 61, 62], // TRES
  FOUR: [66, 67, 68, 69, 70, 71], // QUATRE
  FIVE: [40, 41, 42, 43], // CINC
  SIX: [88, 89, 90], // SIS
  SEVEN: [62, 63, 64], // SET
  EIGHT: [77, 78, 79, 80], // VUIT
  NINE: [81, 82, 83], // NOU
  TEN: [93, 94, 95], // DEU (es necesario añadirlo en la grilla si es requerido)
  ELEVEN: [84, 85, 86, 87], // ONZE
  FIVE_MIN: (hours, minutes) => (hours === 12 || minutes >= 55 ? [106, 107, 108, 109] : [40, 41, 42, 43]), // CINC (cinco minutos)
  TEN_MIN: [93, 94, 95], // DEU (diez minutos, puede ser "I" o "MENYS")
  QUARTER_MIN: [26, 27, 28, 29, 30], // QUARTS (un cuarto)
  TWENTY_MIN: [33, 34, 35, 36, 37], // VINT (necesario añadirlo si se usa)
  TWENTYFIVE_MIN: [], // VINT I CINC (veinte y cinco)
  HALF: [
    // [11, 12, 13],
    // [26, 27, 28, 29, 30, 31],
  ], // MENYS (media)
};

const localeWords: LocaleWords = {
  ÉS: [0, 1], // ÉS
  SON: [1, 2, 3], // SÓN
  LES: [14, 15, 16],
  MENYS: [33, 34, 35, 36, 37], // MENYS
  MENYS_2: [99, 100, 101, 102, 103], // MENYS
  I: (hours) => (hours === 12 ? [104] : [38]), // I
  QUART: [26, 27, 28, 29, 30], // QUART
  DE: [44, 45],
  LA: [5, 6],
  UNA: [48, 49, 50],
  UN: [8, 9],
  DOS: [11, 12, 13],
  TRES: [18, 19, 20, 21],
  QUARTS: [26, 27, 28, 29, 30, 31],
  D: [46],
};

function getLocaleWordKeys(hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // Determine whether to use "I" or "MENYS" based on minutes
  // if (minutes >= 35) {
  // Use "MENYS" (before) and increment hour
  // wordKeys.push('MENYS');
  // }
  //   else if (minutes >= 5) {
  //     wordKeys.push('I');
  //   }
  // if (minutes >= 30) {
  //   wordKeys.push('DE');
  // }

  // Use "ÉS" for one o'clock, otherwise use "SON" for other hours
  // wordKeys.push(hours % 12 === 1 ? 'ÉS' : 'SON');
  if (hours === 1 && minutes >= 15 && minutes < 20) wordKeys.push('ÉS', 'UN', 'D', 'UNA');
  else if (hours === 1) wordKeys.push('ÉS', 'LA');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('ÉS');
  else if (minutes >= 25 && minutes < 55) wordKeys.push('SON');
  else if (hours > 1) wordKeys.push('SON', 'LES');
  // else wordKeys.push('SON', 'LES');

  if (minutes >= 5 && minutes < 10) wordKeys.push('I', 'FIVE');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('I', 'TEN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('UN', 'QUART', 'DE');
  else if (minutes >= 20 && minutes < 25) wordKeys.push('ÉS', 'UN', 'QUART', 'I', 'FIVE_MIN', 'DE');
  else if (minutes >= 25 && minutes < 30) wordKeys.push('DOS', 'QUARTS', 'MENYS', 'FIVE_MIN', 'DE');
  else if (minutes >= 30 && minutes < 35) wordKeys.push('DOS', 'QUARTS', 'DE');
  else if (minutes >= 35 && minutes < 40) wordKeys.push('DOS', 'QUARTS', 'I', 'FIVE_MIN', 'DE');
  else if (minutes >= 40 && minutes < 45) wordKeys.push('TRES', 'QUARTS', 'MENYS', 'FIVE_MIN', 'DE');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('TRES', 'QUARTS', 'DE');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('TRES', 'QUARTS', 'I', 'FIVE_MIN', 'DE');
  else if (minutes >= 55) wordKeys.push('MENYS', 'FIVE_MIN');

  // if (hours === 1 && minutes >= 30 && minutes < 35) wordKeys.push('SON', 'UNA');
  // else if (hours === 1) wordKeys.push('LA');
  // else if (minutes !== 30) wordKeys.push('SON', 'LES');
  // else wordKeys.push('SON');

  return wordKeys.map((word) => {
    if (hours === 11 && word === 'MENYS') {
      return `${word}_2`;
    }

    return word;
  });
}

export function getCustomWordKeys(time: string) {
  const wordKeys = [];

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map((t) => parseInt(t));
  // hours = (hours + (minutes >= 15 ? 1 : 0)) % 12 || 12;

  if (minutes >= 15) {
    hours = (hours + 1) % 12 || 12;
  }

  wordKeys.push(HOURS[hours % 12]);
  // if (minutes >= 5) {
  //   wordKeys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  // }

  return [...getLocaleWordKeys(hours, minutes), ...wordKeys];
}

export default {
  grid,
  charsWithApostrophe: [46],
  secondaryChars: [0, 1, 2, 3, 5, 6, 14, 15, 16],
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  getCustomWordKeys,
} satisfies LocaleGridConfig;
