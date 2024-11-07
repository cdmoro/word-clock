const grid = [
  'ITLISASAMPM', // 0-10
  'ACQUARTERDC', // 11-21
  'TWENTYFIVEX', // 22-32
  'HALFSTENFTO', // 33-43
  'PASTERUNINE', // 44-54
  'ONESIXTHREE', // 55-65
  'FOURFIVETWO', // 66-76
  'EIGHTELEVEN', // 77-87
  'SEVENTWELVE', // 88-98
  'TENSEOCLOCK', // 99-109
];

const charsWithAphostrophe = [104];

const words = {
  IT_IS: [0, 1, 3, 4],
  A_QUARTER: [12, 13, 14, 15, 16, 17, 18],
  TWENTY: [22, 23, 24, 25, 26, 27],
  FIVE_MINUTES: [28, 29, 30, 31],
  HALF: [33, 34, 35, 36],
  TEN_MINUTES: [37, 38, 39],
  TO: [40, 41],
  PAST: [44, 45, 46, 47],
  ONE: [55, 56, 57],
  SIX: [58, 59, 60],
  THREE: [61, 62, 63, 64, 65],
  FOUR: [66, 67, 68, 69],
  FIVE_HOUR: [70, 71, 72, 73],
  TWO: [74, 75, 76],
  EIGHT: [77, 78, 79, 80, 81],
  ELEVEN: [82, 83, 84, 85, 86, 87],
  SEVEN: [88, 89, 90, 91, 92],
  TWELVE: [93, 94, 95, 96, 97, 98],
  TEN_HOUR: [99, 100, 101],
  O_CLOCK: [104, 105, 106, 107, 108, 109],
};

const hourWords = [
  'TWELVE',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE_HOUR',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN_HOUR',
  'ELEVEN',
];

function getPositionsToHighlight(hours: number, minutes: number): number[] {
  const wordKeys = ['IT_IS'];

  // Determine whether to use "TO" or "PAST"
  if (minutes >= 45) {
    // Advance to the next hour if the time is between :45 and :59
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('TO');
  } else if (minutes >= 5) {
    wordKeys.push('PAST');
  }

  // Map hour value to corresponding word
  wordKeys.push(hourWords[hours % 12]);

  // Determine minute words
  if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MINUTES');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MINUTES');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('A_QUARTER');
  else if (minutes >= 20 && minutes < 30) wordKeys.push('TWENTY');
  else if (minutes >= 30 && minutes < 40) wordKeys.push('HALF');

  // Add "O'CLOCK" for exact hours
  if (minutes < 5 || minutes >= 55) wordKeys.push('O_CLOCK');
  return wordKeys
    .map((word) => words[word as keyof typeof words])
    .flat()
    .sort((a, b) => a - b);
}

export default {
  grid,
  charsWithAphostrophe,
  getPositionsToHighlight,
};
