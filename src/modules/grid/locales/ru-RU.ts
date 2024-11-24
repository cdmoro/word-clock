import { CommonWords, LocaleGridConfig } from '../../../types';

const grid = [
  'ОДИНПЯТЬДВА', // 0-10   "ОДИН" (one), "ПЯТЬ" (five), "ДВА" (two)
  'ДЕШЕСТЬВЯТЬ', // 11-21  "ДЕ" (part of "ДЕСЯТЬ" - ten), "ШЕСТЬ" (six), "ВЯТЬ" (part of "ДЕВЯТЬ" - nine)
  'ВОЧЕСЕМЬТРИ', // 22-32  "ВО" (part of "ВОСЕМЬ" - eight), "ЧЕСЕМЬ" (part of "ВОСЕМЬ" - eight), "ТРИ" (three)
  'ТЫДВЕРЕСЯТЬ', // 33-43  "ТЫ" (fragment), "ДВЕРЕСЯТЬ" (part of "ДВЕНАДЦАТЬ" - twelve)
  'НАДЦАТЬЧАСА', // 44-54  "НАДЦАТЬ" (suffix for 11-19), "ЧАСА" (hour)
  'ЧАСОВДСОРОК', // 55-65  "ЧАСОВ" (hours), "СОРОК" (forty)
  'ТРИДВАДПЯТЬ', // 66-76  "ТРИД" (thirty fragment), "ПЯТЬ" (five)
  'ПЯТНАДЕЦАТЬ', // 77-87  "ПЯТНАД" (fifteen), "ДЕЦАТЬ" (suffix for 11-19)
  'АМДЕСЯТСЯТЬ', // 88-98  "АМ" (fragment), "ДЕСЯТЬ" (ten)
  'ПЯТЬЯРМИНУТ', // 99-109 "ПЯТЬ" (five), "МИНУТ" (minutes)
];

const commonWords: CommonWords = {
  ONE: [0, 1, 2, 3], // "ОДИН" (one)
  TWO: [8, 9, 10], // "ДВА" (two)
  THREE: [21, 22, 23], // "ТРИ" (three)
  FOUR: [], // Not explicitly in the grid
  FIVE: [4, 5, 6, 7], // "ПЯТЬ" (five)
  SIX: [12, 13, 14, 15], // "ШЕСТЬ" (six)
  SEVEN: [26, 27, 28, 29], // СЕМЬ
  EIGHT: [18, 19, 20], // "ВОСЕМЬ" (eight)
  NINE: [27, 28, 29], // "ДЕВЯТЬ" (nine)
  TEN: [32, 33, 34], // "ДЕСЯТЬ" (ten)
  ELEVEN: [
    [0, 1, 2, 3],
    [44, 45, 46, 47, 48, 59, 50],
  ],
  FIVE_MIN: [99, 100, 101, 102],
  HALF: [
    [66, 67, 68, 69],
    [84, 85, 86, 87],
  ],
  QUARTER_MIN: (_hours, minutes) =>
    minutes >= 15 && minutes < 20
      ? [77, 78, 79, 80, 81, 82]
      : [
          [61, 62, 63, 64, 65],
          [99, 100, 101, 102],
        ],
  TEN_MIN: [],
  TWELVE: [
    [35, 36, 37],
    [44, 45, 46, 47, 48, 59, 50],
  ],
  TWENTY_MIN: [],
  TWENTYFIVE_MIN: [],
};

const localeWords = {
  PAST: [33, 34], // Not explicitly in the grid; placeholder for "после" (past)
  TO: [44, 45], // Not explicitly in the grid; placeholder for "до" (to)
  TWENTY: [30, 31, 32, 33], // Fragment in "ДВАДЦАТЬ" (twenty)
  THIRTY: [55, 56, 57], // Fragment in "ТРИДЦАТЬ" (thirty)
  HOUR: [51, 52, 53], // "ЧАС" (hour)
  HOURS: [51, 52, 53, 54], // "ЧАСА" (hours)
  HOURS_2: [55, 56, 57, 58, 59], // "ЧАСОВ" (hours)
  MINUTES: [105, 106, 107, 108, 109], // "МИНУТ" (minutes)
};

function getLocaleWordKeys(hours: number, _minutes: number) {
  const wordKeys = [];

  if (hours === 1) wordKeys.push('HOUR');
  else if (hours >= 2 && hours < 5) wordKeys.push('HOURS');
  else wordKeys.push('HOURS_2');

  wordKeys.push('MINUTES');

  return wordKeys;
}

export default {
  grid,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  getLocaleWordKeys,
  secondaryChars: [105, 106, 107, 108, 109],
} satisfies LocaleGridConfig;
