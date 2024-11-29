import { ClockType, CommonWords, FlexConfig, WordKeys } from '../../../types';

const grid = [
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
  TWENTY_MIN: [6, 4],
  TWENTYFIVE_MIN: [8, 4],
  HALF: [6, 1],
};

const localeWords = {
  TIME: [0, 0],
  IS: [0, 1],
  AND: [5, 4],
  TO: [5, 2],
  MINUTES: [9, 2],
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['TIME', 'IS'];

  if ((minutes >= 5 && minutes < 30) || minutes >= 35) {
    wordKeys.push('MINUTES');
  }

  if (minutes >= 5 && minutes < 30) wordKeys.push('AND');
  else if (minutes >= 35) wordKeys.push('TO');

  return wordKeys;
}

export default {
  type: ClockType.flex,
  grid,
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
} satisfies FlexConfig;
