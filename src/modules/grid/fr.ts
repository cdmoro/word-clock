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

const words = {
  IL: [0, 1],
  EST: [3, 4, 5],
  UNE: [22, 23, 24],
  DEUX: [7, 8, 9, 10],
  TROIS: [15, 16, 17, 18, 19],
  QUATRE: [11, 12, 13, 14, 15, 16],
  CINQ: [33, 34, 35, 36],
  SIX: [37, 38, 39],
  SEPT: [25, 26, 27, 28],
  HUIT: [33, 34, 35, 36],
  NEUF: [22, 23, 24, 25],
  DIX_HOUR: [74, 75, 76],
  ONZE: [55, 56, 57, 58],
  HEURES: [60, 61, 62, 63, 64, 65],
  MIDI: [44, 45, 46, 47],
  MINUIT: [48, 49, 50, 51, 52, 53],
  MOINS: [66, 67, 68, 69, 70],
  DIX_MIN: [74, 75, 76],
  ET: [77, 78],
  VINGT: [88, 89, 90, 91, 92],
  QUART: [80, 81, 82, 83, 84],
  DEMIE: [102, 103, 104, 105, 106],
  CINQ_MIN: [94, 95, 96, 97],
};

const hourWords = [
  'MINUIT', // 0
  'UNE', // 1
  'DEUX', // 2
  'TROIS', // 3
  'QUATRE', // 4
  'CINQ', // 5
  'SIX', // 6
  'SEPT', // 7
  'HUIT', // 8
  'NEUF', // 9
  'DIX_HOUR', // 10
  'ONZE', // 11
  'MIDI', // 12
];

function getWordsToHighlight(hours: number, minutes: number) {
  const wordKeys = [];

  // Use "IL EST" regardless of the hour
  wordKeys.push('IL', 'EST');

  // Determine whether to use "ET" or "MOINS"
  if (minutes >= 35) {
    // Use "MOINS" and move to the next hour
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('MOINS');
  } else if (minutes >= 5) {
    wordKeys.push('ET');
  }

  // Map hour value to the corresponding word
  wordKeys.push(hourWords[hours % 12]);

  wordKeys.push('HEURES');

  // Determine minute words
  if (minutes >= 5 && minutes < 10) wordKeys.push('CINQ_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('DIX_MIN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('QUART');
  else if (minutes >= 20 && minutes < 30) wordKeys.push('VINGT');
  else if (minutes >= 30 && minutes < 35) wordKeys.push('DEMIE');
  else if (minutes >= 35 && minutes < 45) wordKeys.push('VINGT');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('QUART');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('DIX_MIN');
  else if (minutes >= 55 && minutes < 60) wordKeys.push('CINQ_MIN');

  // Return a sorted array of all grid positions to be highlighted
  return wordKeys;
}

export default {
  grid,
  getWordsToHighlight,
  words,
};
