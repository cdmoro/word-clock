import { CommonWords, LocaleGridConfig } from '../../types';
import { HOURS, MINUTES } from './constants';

const grid = [
  'SONORLEBORE', // 0-10: "SONO", "LE"
  'ÈRLUNASDUEZ', // 11-21: "È" and numbers (1, 2)
  'TREOTTONOVE', // 22-32: numbers (3-8-9)
  'DIECIUNDICI', // 33-43: numbers (10-11)
  'DODICISETTE', // 44-54: numbers (12-7)
  'QUATTROCSEI', // 55-65: numbers (4-6)
  'CINQUEAMENO', // 66-76: numbers (5) and "MENO"
  'ECUNOQUARTO', // 77-87: "E" and "QUARTO"
  'VENTICINQUE', // 88-98: "VENTI" and "CINQUE"
  'DIECIPMEZZA', // 99-109: "DIECI" and "MEZZA"
];

const commonWords: CommonWords = {
  TWELVE: [44, 45, 46, 47, 48, 49],
  ONE: [13, 14, 15, 16],
  TWO: [19, 20, 21],
  THREE: [22, 23, 24],
  FOUR: [55, 56, 57, 58, 59, 60, 61],
  FIVE: [66, 67, 68, 69, 70, 71],
  SIX: [62, 63, 64],
  SEVEN: [50, 51, 52, 53, 54],
  EIGHT: [25, 26, 27, 28],
  NINE: [29, 30, 31, 32],
  TEN: [33, 34, 35, 36, 37],
  ELEVEN: [38, 39, 40, 41, 42, 43],
  FIVE_MIN: [93, 94, 95, 96, 97, 98],
  TEN_MIN: [99, 100, 101, 102, 103],
  QUARTER_MIN: [82, 83, 84, 85, 86, 87],
  TWENTY_MIN: [88, 89, 90, 91, 92],
  TWENTYFIVE_MIN: [88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98],
  HALF: [105, 106, 107, 108, 109],
};

const words = {
  SONO: [0, 1, 2, 3],
  È: [11],
  LE: [5, 6],
  L: [5],
  ORE: [6, 7, 8, 9, 10],
  MENO: [73, 74, 75, 76],
  E: [77],
  ...commonWords,
};

function getWordsToHighlight(hours: number, minutes: number) {
  const wordKeys = [];

  // Determine whether to use "E" or "MENO"
  if (minutes >= 35) {
    // Use "MENO" and move to the next hour
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('MENO');
  } else if (minutes >= 5) {
    wordKeys.push('E');
  }

  // Use "È" for one o'clock, otherwise use "SONO" for other hours
  wordKeys.push(hours % 12 === 1 ? 'È' : 'SONO');
  // wordKeys.push(hours % 12 === 1 ? 'L' : 'LE');
  if (hours % 12 !== 1) {
    wordKeys.push('LE');
  }

  // Map hour value to the corresponding word
  wordKeys.push(HOURS[hours % 12]);

  // Determine minute words
  if (minutes >= 5) {
    wordKeys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  }
  // if (minutes >= 5 && minutes < 10) wordKeys.push('CINQUE_MIN');
  // else if (minutes >= 10 && minutes < 15) wordKeys.push('DIECI_MIN');
  // else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTO');
  // else if (minutes >= 20 && minutes < 25) wordKeys.push('VENTI');
  // else if (minutes >= 25 && minutes < 30) wordKeys.push('VENTICINQUE');
  // else if (minutes >= 30 && minutes < 35) wordKeys.push('MEZZA');
  // else if (minutes >= 35 && minutes < 45) wordKeys.push('VENTI');
  // else if (minutes >= 45 && minutes < 50) wordKeys.push('QUARTO');
  // else if (minutes >= 50 && minutes < 55) wordKeys.push('DIECI_MIN');
  // else if (minutes >= 55 && minutes < 60) wordKeys.push('CINQUE_MIN');

  // Return a sorted array of all grid positions to be highlighted
  return wordKeys;
}

export default {
  grid,
  charsWithAphostrophe: [13],
  getWordsToHighlight,
  words,
} satisfies LocaleGridConfig;

// sono le otto
// sono le otto e cinque
// sono le otto e dieci
// sono le otto e venti
// sono le otto e venticinque
// sono le otto e mezza
// sono le otto e venticinque
// sono le otto e venti minuti
// sono le otto meno un quarto
// sono le otto meno dieci
// è dalle cinque alle otto
