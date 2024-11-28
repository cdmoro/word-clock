import { CommonWords, LocaleGridConfig, WordKeys } from '../../../types';

const flexGrid = [
  ['الساعة', 'الآن', 'الحادية', 'الا', 'الثانية', 'عشر'],
  ['الثانية', 'الواحدة', 'السادسة', 'السابعة'],
  ['الثالثة', 'العاشرة', 'الخامسة', 'أو', 'الرابعة'],
  ['الا', 'الواحدة', 'الا', 'السابعة', 'التاسعة', 'الا'],
  ['العاشرة', 'الثامنة', 'السادسة', 'الواحدة'],
  ['الحادية', 'الثانية', 'الا', 'عشر', 'و', 'الثامنة'],
  ['الثانية', 'والنصف', 'أو', 'الا', 'الثلث', 'الثامنة'],
  ['الا', 'خمس', 'أو', 'الا', 'الربع', 'من', 'الا', 'عشر'],
  ['وعشر', 'الثالثة', 'والربع', 'و', 'والثلث', 'الثانية'],
  ['وخمس', 'السابعة', 'دقائق', 'الا', 'التاسعة'],
];

const commonWords: Partial<CommonWords> = {
  ONE: [1, 1],
  TWO: [1, 0],
  THREE: [2, 0],
  FOUR: [2, 4],
  FIVE: [2, 2],
  SIX: [1, 2],
  SEVEN: [3, 3],
  EIGHT: [4, 1],
  NINE: [3, 4],
  TEN: [2, 1],
  ELEVEN: [
    [0, 2],
    [5, 3],
  ],
  TWELVE: [
    [1, 0],
    [5, 3],
  ],
  FIVE_MIN: [9, 0],
  TEN_MIN: [8, 0],
  QUARTER_MIN: [8, 2],
  HALF: [6, 1],
};

const localeWords = {
  TIME: [0, 0],
  IS: [0, 1],
  MINUTES: [9, 2],
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['TIME', 'IS'];

  if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTER_MIN');
  // else if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY_MIN');
  // else if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTYFIVE_MIN');
  else if (minutes >= 30 && minutes < 35) wordKeys.push('HALF');
  // else if (minutes >= 35 && minutes < 40) wordKeys.push('THIRTY_FIVE');
  // else if (minutes >= 40 && minutes < 45) wordKeys.push('FORTY');
  // else if (minutes >= 45 && minutes < 50) wordKeys.push('FORTY_FIVE');
  // else if (minutes >= 50 && minutes < 55) wordKeys.push('FIFTY');
  // else if (minutes >= 55) wordKeys.push('FIFTY_FIVE');

  if ((minutes >= 5 && minutes < 30) || minutes >= 35) {
    wordKeys.push('MINUTES');
  }

  return wordKeys;
}

export default {
  flexGrid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryWords: [
    [0, 0],
    [0, 1],
  ],
  examples: {
    '7:30': 'الساعة الآن السابعة والنصف',
  },
} satisfies LocaleGridConfig;
