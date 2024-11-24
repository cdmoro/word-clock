import { CommonWords, LocaleGridConfig } from '../../../types';

const grid = [
  'ОДИНПЯТЬДВА', // "ОДИН" (one), "ПЯТЬ" (five), "ДВА" (two)
  'ДЕШЕСТЬВЯТЬ', // "ДЕ" (part of "ДЕСЯТЬ" - ten), "ШЕСТЬ" (six), "ВЯТЬ" (part of "ДЕВЯТЬ" - nine)
  'ВОЧЕСЕМЬТРИ', // "ВО" (part of "ВОСЕМЬ" - eight), "ЧЕСЕМЬ" (part of "ВОСЕМЬ" - eight), "ТРИ" (three)
  'ТЫДВЕРЕСЯТЬ', // "ТЫ" (fragment), "ДВЕРЕСЯТЬ" (part of "ДВЕНАДЦАТЬ" - twelve)
  'НАДЦАТЬЧАСА', // "НАДЦАТЬ" (suffix for 11-19), "ЧАСА" (hour)
  'ЧАСОВДСОРОК', // "ЧАСОВ" (hours), "СОРОК" (forty)
  'ТРИДВАДПЯТЬ', // "ТРИДВАД" (thirty fragment), "ПЯТЬ" (five)
  'ПЯТНАДЕЦАТЬ', // "ПЯТНАД" (fifteen), "ДЕЦАТЬ" (suffix for 11-19)
  'АМДЕСЯТСЯТЬ', // "АМ" (fragment), "ДЕСЯТЬ" (ten)
  'ПЯТЬЯРМИНУТ', // "ПЯТЬ" (five), "МИНУТ" (minutes)
];

const commonWords: CommonWords = {
  ONE: [0, 1, 2, 3], // "ОДИН" (one)
  TWO: [8, 9, 10], // "ДВА" (two)
  THREE: [21, 22, 23], // "ТРИ" (three)
  FOUR: [], // Not explicitly in the grid
  FIVE: [4, 5, 6, 7], // "ПЯТЬ" (five)
  SIX: [12, 13, 14, 15], // "ШЕСТЬ" (six)
  SEVEN: [], // Not explicitly in the grid
  EIGHT: [18, 19, 20], // "ВОСЕМЬ" (eight)
  NINE: [27, 28, 29], // "ДЕВЯТЬ" (nine)
  TEN: [32, 33, 34], // "ДЕСЯТЬ" (ten)
  ELEVEN: [],
  FIVE_MIN: [],
  HALF: [],
  QUARTER_MIN: [],
  TEN_MIN: [],
  TWELVE: [],
  TWENTY_MIN: [],
  TWENTYFIVE_MIN: [],
};

const localeWords = {
  EXACTLY: [48, 49], // Not explicitly in the grid; placeholder for "точно" (exactly)
  PAST: [33, 34], // Not explicitly in the grid; placeholder for "после" (past)
  TO: [44, 45], // Not explicitly in the grid; placeholder for "до" (to)
  FIFTEEN: [67, 68, 69, 70, 71], // "ПЯТНАДЦАТЬ" (fifteen)
  TWENTY: [30, 31, 32, 33], // Fragment in "ДВАДЦАТЬ" (twenty)
  THIRTY: [55, 56, 57], // Fragment in "ТРИДЦАТЬ" (thirty)
  FORTY: [44, 45, 46, 47], // "СОРОК" (forty)
  HOURS: [38, 39, 40, 41, 42], // "ЧАСА" (hour)
  MINUTES: [95, 96, 97, 98, 99], // "МИНУТ" (minutes)
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys = ['EXACTLY'];

  if (minutes > 0 && minutes <= 30) {
    wordKeys.push('PAST');
  } else if (minutes > 30) {
    wordKeys.push('TO');
  }

  return wordKeys;
}

export default {
  grid,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  getLocaleWordKeys,
} satisfies LocaleGridConfig;
