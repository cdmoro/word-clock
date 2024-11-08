import { CommonWords, LocaleGridConfig } from '../../types';
import { HOURS, MINUTES } from './constants';

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

const commonWords: CommonWords = {
  TWELVE: [93, 94, 95, 96, 97, 98],
  ONE: [55, 56, 57],
  TWO: [74, 75, 76],
  THREE: [61, 62, 63, 64, 65],
  FOUR: [66, 67, 68, 69],
  FIVE: [70, 71, 72, 73],
  SIX: [58, 59, 60],
  SEVEN: [88, 89, 90, 91, 92],
  EIGHT: [77, 78, 79, 80, 81],
  NINE: [51, 52, 53, 54],
  TEN: [99, 100, 101],
  ELEVEN: [82, 83, 84, 85, 86, 87],
  FIVE_MIN: [28, 29, 30, 31],
  TEN_MIN: [38, 39, 40],
  QUARTER_MIN: [13, 14, 15, 16, 17, 18, 19],
  TWENTY_MIN: [22, 23, 24, 25, 26, 27],
  TWENTYFIVE_MIN: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  HALF: [33, 34, 35, 36],
};

const words = {
  IT: [0, 1],
  IS: [3, 4],
  TO: [42, 43],
  PAST: [44, 45, 46, 47],
  O_CLOCK: [104, 105, 106, 107, 108, 109],
  ...commonWords,
};

function getWordsToHighlight(hours: number, minutes: number) {
  const wordKeys = ['IT', 'IS'];

  // Determine whether to use "TO" or "PAST"
  if (minutes >= 35) {
    // Advance to the next hour if the time is between :45 and :59
    hours = (hours + 1) % 12 || 12;
    wordKeys.push('TO');
  } else if (minutes >= 5) {
    wordKeys.push('PAST');
  }

  // Map hour value to corresponding word
  wordKeys.push(HOURS[hours % 12]);

  // Determine minute words
  if (minutes >= 5) {
    wordKeys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  }
  // if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  // else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  // else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTER_MIN');
  // else if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY_MIN');
  // else if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTYFIVE_MIN');
  // else if (minutes >= 30 && minutes < 35) wordKeys.push('HALF');
  // else if (minutes >= 35 && minutes < 40) wordKeys.push('TWENTYFIVE_MIN');
  // else if (minutes >= 40 && minutes < 45) wordKeys.push('TWENTY_MIN');
  // else if (minutes >= 45 && minutes < 50) wordKeys.push('QUARTER_MIN');
  // else if (minutes >= 50 && minutes < 55) wordKeys.push('TEN_MIN');
  // else if (minutes >= 55 && minutes < 60) wordKeys.push('FIVE_MIN');

  // Add "O'CLOCK" for exact hours
  if (minutes < 5) wordKeys.push('O_CLOCK');

  return wordKeys;
}

export default {
  grid,
  charsWithAphostrophe: [104],
  getWordsToHighlight,
  words,
} satisfies LocaleGridConfig;

// it is eight o'clock
// it is five past eight
// it is ten past eight
// it is twenty past eight
// it is twenty-five past eight
// it is half past eight
// it is twenty-five to eight
// it is twenty minutes to eight
// it is quarter to eight
// it is ten to eight
// it is five to eight
