const grid = [
  'ESONELASUNA', // 0-10
  'DOSITRESOAM', // 11-21
  'CUATROCINCO', // 22-32
  'SEISASIETEN', // 33-43
  'OCHONUEVEPM', // 44-54
  'LADIEZSONCE', // 55-65
  'DOCELYMENOS', // 66-76
  'OVEINTEDIEZ', // 77-87
  'VEINTICINCO', // 88-98
  'MEDIACUARTO', // 99-109
];

const words = {
  ES: [0, 1],
  SON: [1, 2, 3],
  LA: [5, 6],
  LAS: [5, 6, 7],
  UNA: [8, 9, 10],
  DOS: [11, 12, 13],
  TRES: [14, 15, 16, 17],
  CUATRO: [22, 23, 24, 25, 26, 27],
  CINCO: [28, 29, 30, 31, 32],
  SEIS: [33, 34, 35, 36],
  SIETE: [37, 38, 39, 40, 41],
  OCHO: [44, 45, 46, 47],
  NUEVE: [48, 49, 50, 51, 52],
  DIEZ_HOUR: [57, 58, 59, 60],
  ONCE: [62, 63, 64, 65],
  DOCE: [66, 67, 68, 69],
  MENOS: [72, 73, 74, 75, 76],
  Y: [71],
  VEINTE: [78, 79, 80, 81, 82, 83],
  DIEZ_MIN: [84, 85, 86, 87],
  VEINTICINCO: [88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98],
  MEDIA: [99, 100, 101, 102, 103],
  CUARTO: [104, 105, 106, 107, 108, 109],
  CINCO_MIN: [94, 95, 96, 97, 98],
};

const hourWords = [
  'DOCE',
  'UNA',
  'DOS',
  'TRES',
  'CUATRO',
  'CINCO',
  'SEIS',
  'SIETE',
  'OCHO',
  'NUEVE',
  'DIEZ_HOUR',
  'ONCE',
];

function getWordsToHighlight(hours: number, minutes: number) {
  const wordKeys = [];

  // Use "ES" for one o'clock, otherwise use "SON" for other hours
  wordKeys.push(hours === 1 ? 'ES' : 'SON');
  wordKeys.push(hours === 1 ? 'LA' : 'LAS');

  // Determine whether to use "Y" or "MENOS"
  if (minutes >= 35) {
    // Use "MENOS" and move to the next hour
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('MENOS');
  } else if (minutes >= 5) {
    wordKeys.push('Y');
  }

  // Map hour value to the corresponding word
  wordKeys.push(hourWords[hours % 12]);

  // Determine minute words
  if (minutes >= 5 && minutes < 10) wordKeys.push('DIEZ_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('VEINTE');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('CUARTO');
  else if (minutes >= 20 && minutes < 30) wordKeys.push('VEINTICINCO');
  else if (minutes >= 30 && minutes < 35) wordKeys.push('MEDIA');
  else if (minutes >= 35 && minutes < 45) wordKeys.push('VEINTE');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('CUARTO');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('DIEZ_MIN');
  else if (minutes >= 55 && minutes < 60) wordKeys.push('CINCO_MIN');

  // Return a sorted array of all grid positions to be highlighted
  return wordKeys;
}

export default {
  grid,
  getWordsToHighlight,
  words,
};
