import { CommonWords, LocaleGridConfig, LocaleWords, WordKeys } from '../../../types';
import { HOURS } from '../constants';

const grid = [
  'ÉSÓNRLAMUNA', // 0-10 ("ÉS", "UNA")
  'DOSLESNTRES', // 11-21 ("DOS", "TRES")
  'CINCQUARTSU', // 22-32 ("CINC", "QUARTS")
  'MENYSIECINC', // 33-43 ("MENYS", "I", "CINC")
  'DEDUNARONZE', // 44-54 ("DE", "UNA", "ONZE")
  'DUESTRESETD', // 55-65 ("DUES", "TRES", "SET")
  'QUATREDOTZE', // 66-76 ("QUATRE", "DOTZE")
  'VUITNOUONZE', // 77-87 ("VUIT", "NOU", "ONZE")
  'SISAMDEUNPM', // 88-98 ("SIS", "UN")
  'MENYSIACINC', // 99-109 ("MENYS", "I", "CINC")
];

const commonWords: CommonWords = {
  TWELVE: [72, 73, 74, 75, 76], // DOTZE
  ONE: (hours, minutes) =>
    (hours === 0 || hours === 12) && minutes >= 10 && minutes < 55 ? [46, 47, 48, 49] : [8, 9, 10], // UNA
  TWO: [55, 56, 57, 58], // DUES
  THREE: [59, 60, 61, 62], // TRES
  FOUR: [66, 67, 68, 69, 70, 71], // QUATRE
  FIVE: (hours, minutes) => (hours === 4 && minutes >= 10 && minutes < 55 ? [106, 107, 108, 109] : [40, 41, 42, 43]), // CINC
  SIX: [88, 89, 90], // SIS
  SEVEN: [62, 63, 64], // SET
  EIGHT: [77, 78, 79, 80], // VUIT
  NINE: [81, 82, 83], // NOU
  TEN: [93, 94, 95], // DEU
  ELEVEN: [84, 85, 86, 87], // ONZE
  FIVE_MIN: (hours, minutes) => {
    if ((hours === 0 || hours === 12) && minutes >= 10 && minutes < 55) return [40, 41, 42, 43];
    if (hours === 0 || hours === 12 || minutes >= 55) return [106, 107, 108, 109];
    else return [40, 41, 42, 43];
  }, // CINC
};

const localeWords: LocaleWords = {
  ÉS: [0, 1], // ÉS
  SON: [1, 2, 3], // SÓN
  LES: [14, 15, 16],
  MENYS: [33, 34, 35, 36, 37], // MENYS
  MENYS_2: [99, 100, 101, 102, 103], // MENYS
  I: [38], // I
  I_2: [104],
  QUART: [26, 27, 28, 29, 30], // QUART
  QUARTS: [26, 27, 28, 29, 30, 31],
  DE: [44, 45],
  LA: [5, 6],
  UN: [8, 9],
  DOS: [11, 12, 13],
  TRES: [18, 19, 20, 21],
  CINC_2: [106, 107, 108, 109],
};

function getCustomWordKeys(time: string) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map((t) => parseInt(t));

  if (minutes >= 10) {
    hours = (hours + 1) % 12 || 12;
  }

  wordKeys.push(HOURS[hours % 12]);

  if ((minutes >= 0 && minutes < 10) || minutes >= 55) {
    if (hours === 1) wordKeys.push('ÉS', 'LA');
    else wordKeys.push('SON', 'LES');
  } else if (minutes >= 10 && minutes < 25) wordKeys.push('ÉS');
  else wordKeys.push('SON');

  if (minutes >= 5 && minutes < 10) wordKeys.push('I_2', 'CINC_2');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('MENYS', 'FIVE_MIN');
  else if (minutes >= 20 && minutes < 25) wordKeys.push('I', 'FIVE_MIN');
  else if (minutes >= 25 && minutes < 30) wordKeys.push('MENYS', 'FIVE_MIN');
  else if (minutes >= 35 && minutes < 40) wordKeys.push('I', 'FIVE_MIN');
  else if (minutes >= 40 && minutes < 45) wordKeys.push('MENYS', 'FIVE_MIN');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('I', 'FIVE_MIN');
  else if (minutes >= 55) wordKeys.push('MENYS_2', 'FIVE_MIN');

  if (minutes >= 10 && minutes < 25) wordKeys.push('UN');
  else if (minutes >= 25 && minutes < 40) wordKeys.push('DOS');
  else if (minutes >= 40 && minutes < 55) wordKeys.push('TRES');

  if (minutes >= 10 && minutes < 25) wordKeys.push('QUART');
  else if (minutes >= 25 && minutes < 55) wordKeys.push('QUARTS');

  if (hours !== 1 && minutes >= 10 && minutes < 55) {
    wordKeys.push('DE');
  }

  return wordKeys;
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
