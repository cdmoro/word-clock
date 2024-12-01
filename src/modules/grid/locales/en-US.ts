import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

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

const localeWords = {
  IT: [0, 1],
  IS: [3, 4],
  TO: [42, 43],
  PAST: [44, 45, 46, 47],
  O_CLOCK: [104, 105, 106, 107, 108, 109],
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['IT', 'IS'];

  // Determine whether to use "TO" or "PAST"
  if (minutes >= 35) {
    wordKeys.push('TO');
  } else if (minutes >= 5) {
    wordKeys.push('PAST');
  }

  // Add "O'CLOCK" for exact hours
  if (minutes < 5) wordKeys.push('O_CLOCK');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  charsWithApostrophe: [104],
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 3, 4],
  fuzzyDictionary: {
    'o’clock': 'O’Clock',
  },
  examples: {
    '12:30': 'IT IS HALF PAST TWELVE',
    '12:32': 'IT IS HALF PAST TWELVE',
    '12:35': 'IT IS TWENTYFIVE TO ONE',
  },
} satisfies GridConfig;
