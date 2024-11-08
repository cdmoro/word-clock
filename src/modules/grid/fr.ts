import { CommonWords, LocaleGridConfig } from '../../types';
import { HOURS, MINUTES } from './constants';

const grid = [
  'ILNESTODEUX', // 0-10: "IL", "EST" and numbers (2)
  'QUATRETROIS', // 11-21: numbers (4-3)
  'NEUFUNESEPT', // 22-32: numbers (9-1-7)
  'HUITSIXCINQ', // 33-43: numbers (8-6-5)
  'MIDIXMINUIT', // 44-54: "MIDI" and "MINUIT"
  'ONZERHEURES', // 55-65: "ONZE" and "HEURES"
  'MOINSOLEDIX', // 66-76: "MOINS" and "DIX"
  'ETRQUATRPMD', // 77-87: "ET" and "QUART"
  'VINGT-CINQU', // 88-98: "VINGT" and "CINQ"
  'ETSDEMIEPAM', // 99-109: "ET" and "DEMIE"
];

const commonWords: CommonWords = {
  TWELVE: [66, 67, 68, 69],
  ONE: [26, 27, 28],
  TWO: [7, 8, 9, 10],
  THREE: [17, 18, 19, 20, 21],
  FOUR: [11, 12, 13, 14, 15, 16],
  FIVE: [33, 34, 35, 36],
  SIX: [37, 38, 39],
  SEVEN: [25, 26, 27, 28],
  EIGHT: [33, 34, 35, 36],
  NINE: [22, 23, 24, 25],
  TEN: [46, 47, 48],
  ELEVEN: [55, 56, 57, 58],
  FIVE_MIN: [94, 95, 96, 97],
  TEN_MIN: [74, 75, 76],
  QUARTER_MIN: [80, 81, 82, 83, 84],
  TWENTY_MIN: [88, 89, 90, 91, 92],
  TWENTYFIVE_MIN: [88, 89, 90, 91, 92, 93, 94, 95, 96, 97],
  HALF: [102, 103, 104, 105, 106],
};

const words = {
  IL: [0, 1],
  EST: [3, 4, 5],
  HEURES: [60, 61, 62, 63, 64, 65],
  MIDI: [44, 45, 46, 47],
  MINUIT: [48, 49, 50, 51, 52, 53],
  MOINS: [66, 67, 68, 69, 70],
  ET: [77, 78],
  ...commonWords,
};

function getWordsToHighlight(hours: number, minutes: number) {
  const wordKeys = [];

  // Use "IL EST" regardless of the hour
  wordKeys.push('IL', 'EST');

  // Determine whether to use "ET" or "MOINS"
  if (minutes >= 35) {
    // Use "MOINS" and move to the next hour
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('MOINS');
  } else if (minutes >= 30 && minutes < 35) {
    wordKeys.push('ET');
  }

  // Map hour value to the corresponding word
  wordKeys.push(HOURS[hours % 12]);

  wordKeys.push('HEURES');

  // Determine minute words
  if (minutes >= 5) {
    wordKeys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  }
  // if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  // else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  // else if (minutes >= 15 && minutes < 20) wordKeys.push('LE', 'QUARTER_MIN');
  // else if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY');
  // else if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTYFIVE');
  // else if (minutes >= 30 && minutes < 35) wordKeys.push('HALF');
  // else if (minutes >= 35 && minutes < 45) wordKeys.push('TWENTY');
  // else if (minutes >= 45 && minutes < 50) wordKeys.push('LE', 'QUARTER_MIN');
  // else if (minutes >= 50 && minutes < 55) wordKeys.push('TEN_MIN');
  // else if (minutes >= 55 && minutes < 60) wordKeys.push('FIVE_MIN');

  // Return a sorted array of all grid positions to be highlighted
  return wordKeys;
}

export default {
  grid,
  getWordsToHighlight,
  words,
} satisfies LocaleGridConfig;

// il est huit heures
// il est huit heures cinq
// il est huit heures dix
// il est huit heures vingt
// il est huit heures vingt-cinq
// il est huit heures et demie
// il est huit heures moins vingt-cinq
// il est huit heures moins vingt
// il est huit heures moins le quart
// il est huit heures moins dix
// il est huit heures moins cinq
