import { CommonWords, LocaleGridConfig } from '../../types';

const grid = [
  'ÉSÃOUMATRÊS', // 0-10: É, SÃO, UMA, TRÊS
  'MEIOLDIADEZ', // 11-21: MEIO, DIA, DEZ
  'DUASEISETEY', // 22-32: DUAS, SEI, SETE
  'QUATROHNOVE', // 33-43: QUATRO, NOVE
  'CINCOITONZE', // 44-54: CINCO, OITO, ONZE
  'ZMEIALNOITE', // 55-65: MEIA, NOITE
  'HORASYMENOS', // 66-76: HORAS, MENOS
  'VINTECAMEIA', // 77-87: VINTE, "CINCO"
  'UMVQUARTOPM', // 88-98: UM, QUARTO
  'DEZOEYCINCO', // 99-109: DEZ, CINCO
];

const commonWords: CommonWords = {
  TWELVE: [],
  ONE: [4, 5, 6],
  TWO: [22, 23, 24, 25],
  THREE: [7, 8, 9, 10],
  FOUR: [33, 34, 35, 36, 37, 38],
  FIVE: [44, 45, 46, 47, 48],
  SIX: [26, 27, 28, 29],
  SEVEN: [30, 31, 32],
  EIGHT: [48, 49, 50, 51],
  NINE: [40, 41, 42, 43],
  TEN: [18, 19, 20],
  ELEVEN: [51, 52, 53, 54],
  FIVE_MIN: [105, 106, 107, 108, 109],
  TEN_MIN: [99, 100, 101],
  QUARTER_MIN: [91, 92, 93, 94, 95, 96],
  TWENTY_MIN: [77, 78, 79, 80, 81],
  TWENTYFIVE_MIN: [],
  HALF: [84, 85, 86, 87],
};

const localeWords = {
  É: [0],
  SÃO: [1, 2, 3],
  MEIA: [56, 57, 58, 59],
  NOITE: [61, 62, 63, 64, 65],
  MEIO: [11, 12, 13, 14],
  DIA: [16, 17, 18],
  HORAS: [66, 67, 68, 69, 70],
  E: [73],
  E_MIN: [103],
  MENOS: [72, 73, 74, 75, 76],
  VINTE: [77, 78, 79, 80, 81],
  ...commonWords,
};

function getLocaleWordKeys(hours: number, minutes: number) {
  const wordKeys = [];

  // Determine whether to use "Y" or "MENOS"
  if (minutes >= 35) {
    wordKeys.push('MENOS');
  } else if (minutes >= 5) {
    wordKeys.push('E');
  }

  // Use "É" for one o'clock, otherwise use "SÃO" for other hours
  wordKeys.push(hours % 12 === 1 ? 'É' : 'SÃO');

  // Map hour value to the corresponding word
  if (hours === 12) wordKeys.push('MEIO', 'DIA');
  else if (hours === 0) wordKeys.push('MEIA', 'NOITE');
  else wordKeys.push('HORAS');

  // Determine minute words
  if (minutes >= 20 && minutes < 30) wordKeys.push('VINTE', 'E_MIN', 'FIVE_MIN');

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  commonWords,
  localeWords,
} satisfies LocaleGridConfig;
