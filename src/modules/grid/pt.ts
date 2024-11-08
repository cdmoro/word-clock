import { CommonWords, LocaleGridConfig } from '../../types';
import { HOURS, MINUTES } from './constants';

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

const words = {
  É: [0],
  SÃO: [1, 2, 3],
  MEIA: [56, 57, 58, 59],
  NOITE: [61, 62, 63, 64, 65],
  MEIO: [11, 12, 13, 14],
  DIA: [13, 14, 15],
  HORAS: [66, 67, 68, 69, 70],
  E: [73],
  E_MIN: [105],
  MENOS: [72, 73, 74, 75, 76],
  ...commonWords,
};

function getWordsToHighlight(hours: number, minutes: number) {
  const wordKeys = [];

  // Determine whether to use "Y" or "MENOS"
  if (minutes >= 35) {
    // Use "MENOS" and move to the next hour
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('MENOS');
  } else if (minutes >= 5) {
    wordKeys.push('E');
  }

  // Use "É" for one o'clock, otherwise use "SÃO" for other hours
  wordKeys.push(hours % 12 === 1 ? 'É' : 'SÃO');
  wordKeys.push('HORAS');

  // Map hour value to the corresponding word
  if (hours === 12) wordKeys.push('MEIO', 'DIA');
  else if (hours === 0) wordKeys.push('MEIA', 'NOITE');
  else wordKeys.push(HOURS[hours % 12]);

  // Determine minute words
  if (minutes >= 20 && minutes < 30) wordKeys.push('VINTE', 'E_MIN', 'CINCO_MIN');
  else if (minutes >= 5) {
    wordKeys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  }
  // if (minutes >= 5 && minutes < 10) wordKeys.push('CINCO_MIN');
  // else if (minutes >= 10 && minutes < 15) wordKeys.push('DEZ_MIN');
  // else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTO');
  // else if (minutes >= 20 && minutes < 30) wordKeys.push('VINTE', 'E_MIN', 'CINCO_MIN');
  // else if (minutes >= 30 && minutes < 35) wordKeys.push('MEIA');
  // else if (minutes >= 35 && minutes < 40) wordKeys.push('VINTE');
  // else if (minutes >= 40 && minutes < 45) wordKeys.push('VINTE');
  // else if (minutes >= 45 && minutes < 50) wordKeys.push('QUARTO');
  // else if (minutes >= 50 && minutes < 55) wordKeys.push('DEZ_MIN');
  // else if (minutes >= 55 && minutes < 60) wordKeys.push('CINCO_MIN');

  // Return a sorted array of all grid positions to be highlighted
  return wordKeys;
}

export default {
  grid,
  getWordsToHighlight,
  words,
} satisfies LocaleGridConfig;

// Que horas são?
// são oito horas
// são oito e cinco
// são oito e dez
// são oito e vinte
// são oito e vinte e cinco
// são oito e meia
// são vinte e cinco para as oito
// são vinte minutos para as oito
// são um quarto para as oito
// são dez para as oito
// são cinco para as oito
