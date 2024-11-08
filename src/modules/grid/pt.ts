const grid = [
  'ÉSÃOUMATRÊS', // 0-10: É, SÃO, UMA, TRÊS
  'MEIOLDIADEZ', // 11-21: MEIO, DIA, DEZ
  'DUASEISETEY', // 22-32: DUAS, SEI, SETE
  'QUATROHNOVE', // 33-43: QUATRO, NOVE
  'CINCOITONZE', // 44-54: CINCO, OITO, ONZE
  'ZMEIALNOITE', // 55-65: MEIA, NOITE
  'HORASYMENOS', // 66-76: HORAS, Y, MENOS
  'VINTECAMEIA', // 77-87: VINTE, "CINCO"
  'UMVQUARTOPM', // 88-98: UM, QUARTO
  'DEZOEYCINCO', // 99-109: DEZ, CINCO
];

const words = {
  É: [0],
  SÃO: [1, 2, 3],
  UMA: [4, 5, 6],
  DUAS: [22, 23, 24, 25],
  TRÊS: [7, 8, 9, 10],
  QUATRO: [33, 34, 35, 36, 37, 38],
  CINCO: [44, 45, 46, 47, 48],
  SEIS: [26, 27, 28, 29],
  SETE: [30, 31, 32],
  OITO: [49, 50, 51, 52],
  NOVE: [39, 40, 41, 42],
  DEZ_HOUR: [18, 19, 20, 21],
  ONZE: [51, 52, 53, 54],
  MEIA_NOITE: [56, 57, 58, 59, 61, 62, 63, 64, 65],
  MEIA: [84, 85, 86, 87],
  DIA: [13, 14, 15],
  NOITE: [57, 58, 59, 60, 61],
  HORAS: [66, 67, 68, 69, 70],
  E: [73],
  MENOS: [72, 73, 74, 75, 76],
  VINTE: [77, 78, 79, 80, 81],
  QUARTO: [91, 92, 93, 94, 95, 96],
  CINCO_MIN: [105, 106, 107, 108, 109],
  DEZ_MIN: [99, 100, 101, 102],
};

const hourWords = [
  'DOZE', // 0
  'UMA', // 1
  'DUAS', // 2
  'TRÊS', // 3
  'QUATRO', // 4
  'CINCO', // 5
  'SEIS', // 6
  'SETE', // 7
  'OITO', // 8
  'NOVE', // 9
  'DEZ_HOUR', // 10
  'ONZE', // 11
];

function getWordsToHighlight(hours: number, minutes: number) {
  const wordKeys = [];

  // Use "É" for one o'clock, otherwise use "SÃO" for other hours
  wordKeys.push(hours === 1 ? 'É' : 'SÃO');
  // wordKeys.push('HORAS');

  // Determine whether to use "Y" or "MENOS"
  if (minutes >= 35) {
    // Use "MENOS" and move to the next hour
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('MENOS');
  } else if (minutes >= 5) {
    wordKeys.push('E');
  }

  // Map hour value to the corresponding word
  if (hours === 12) {
    wordKeys.push('MEIA_NOITE');
  } else {
    wordKeys.push(hourWords[hours % 12]);
  }

  // Determine minute words
  if (minutes >= 5 && minutes < 10) wordKeys.push('CINCO_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('DEZ_MIN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTO');
  else if (minutes >= 20 && minutes < 30) wordKeys.push('VINTE');
  else if (minutes >= 30 && minutes < 35) wordKeys.push('MEIA');
  else if (minutes >= 35 && minutes < 45) wordKeys.push('VINTE');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('QUARTO');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('DEZ_MIN');
  else if (minutes >= 55 && minutes < 60) wordKeys.push('CINCO_MIN');

  // Return a sorted array of all grid positions to be highlighted
  return wordKeys;
}

export default {
  grid,
  getWordsToHighlight,
  words,
};
