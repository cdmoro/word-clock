import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';
import { HOURS } from '../constants';

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

const commonWords: Partial<CommonWords> = {
  ONE: [0, 1, 2, 3], // "ОДИН" (one)
  TWO: [8, 9, 10], // "ДВА" (two)
  THREE: [21, 22, 23], // "ТРИ" (three)
  FOUR: [
    [24, 25], // ЧЕ
    [33, 34], // ТЫ
    [38, 39], // РЕ
  ], // ЧЕТЫРЕ *
  FIVE: [4, 5, 6, 7], // "ПЯТЬ" (five)
  SIX: [13, 14, 15, 16, 17], // "ШЕСТЬ" (six)
  SEVEN: [26, 27, 28, 29], // СЕМЬ
  EIGHT: [
    [22, 23],
    [26, 27, 28, 29],
  ], // "ВОСЕМЬ" (eight) *
  NINE: [
    [11, 12],
    [18, 19, 20, 21],
  ], // "ДЕВЯТЬ" (nine) *
  TEN: [
    [11, 12],
    [40, 41, 42, 43],
  ], // "ДЕСЯТЬ" (ten) *
  ELEVEN: [
    [0, 1, 2, 3], // ОДИН
    [44, 45, 46, 47, 48, 49, 50], // НАДЦАТЬ
  ],
  TWELVE: [
    [35, 36, 37], // ДВЕ
    [44, 45, 46, 47, 48, 49, 50], // НАДЦАТЬ
  ],
  FIVE_MIN: [99, 100, 101, 102], // ПЯТЬ
  TEN_MIN: [90, 91, 92, 93, 95, 94],
};

const localeWords = {
  FIFTEEN: [77, 78, 79, 80, 81, 82],
  TWENTY: [
    [69, 70, 71],
    [84, 85, 86, 87],
  ], // Fragment in "ДВАЦАТЬ" (twenty)
  THIRTY: [
    [66, 67, 68, 69],
    [84, 85, 86, 87],
  ], // Fragment in "ТРИДЦАТЬ" (thirty)
  FORTY: [61, 62, 63, 64, 65],
  FIFTY: [
    [73, 74, 75, 76],
    [90, 91, 92, 93, 94],
  ],
  HOUR: [51, 52, 53], // "ЧАС" (hour)
  HOURS: [51, 52, 53, 54], // "ЧАСА" (hours)
  HOURS_2: [55, 56, 57, 58, 59], // "ЧАСОВ" (hours)
  MINUTES: [105, 106, 107, 108, 109], // "МИНУТ" (minutes)
};

function getCustomWordKeys(time: string) {
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  wordKeys.push(HOURS[hours % 12]);

  if (hours === 1) wordKeys.push('HOUR');
  else if (hours >= 2 && hours < 5) wordKeys.push('HOURS');
  else wordKeys.push('HOURS_2');

  if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  if (minutes >= 15 && minutes < 20) wordKeys.push('FIFTEEN');
  if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY');
  if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTY', 'FIVE_MIN');
  if (minutes >= 30 && minutes < 35) wordKeys.push('THIRTY');
  if (minutes >= 35 && minutes < 40) wordKeys.push('THIRTY', 'FIVE_MIN');
  if (minutes >= 40 && minutes < 45) wordKeys.push('FORTY');
  if (minutes >= 45 && minutes < 50) wordKeys.push('FORTY', 'FIVE_MIN');
  if (minutes >= 50 && minutes < 55) wordKeys.push('FIFTY');
  if (minutes >= 55) wordKeys.push('FIFTY', 'FIVE_MIN');

  if (minutes >= 5) wordKeys.push('MINUTES');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  getCustomWordKeys,
  secondaryChars: [105, 106, 107, 108, 109],
  fuzzyDictionary: {
    'Один надцать': 'Одинадцать',
    'Две надцать': 'Двенадцать',
    'Че ты ре': 'Четыре',
    'два цать': 'двадцать',
    'Де вять': 'Девять',
  },
  examples: {
    '01:00': 'ОДИН ЧАС',
    '01:05': 'ОДИН ЧАС ПЯТЬ МИНУТ',
    '01:10': 'ОДИН ЧАС ДЕСЯСТ МИНУТ',
    '01:15': 'ОДИН ЧАС ПЯТНАД МИНУТ',
    '01:20': 'ОДИН ЧАС ДВА ЦАТЬ МИНУТ',
    '01:25': 'ОДИН ЧАС ДВА ЦАТЬ ПЯТЬ МИНУТ',
    '01:30': 'ОДИН ЧАС ТРИД ЦАТЬ МИНУТ',
    '01:35': 'ОДИН ЧАС ТРИД ЦАТЬ ПЯТЬ МИНУТ',
    '01:40': 'ОДИН ЧАС СОРОК МИНУТ',
    '01:45': 'ОДИН ЧАС СОРОК ПЯТЬ МИНУТ',
    '01:50': 'ОДИН ЧАС ПЯТЬ ДЕСЯТ МИНУТ',
    '01:55': 'ОДИН ЧАС ПЯТЬ ДЕСЯТ ПЯТЬ МИНУТ',
    '02:00': 'ДВА ЧАСА',
    '07:30': 'СЕМЬ ЧАСОВ ТРИД ЦАТЬ МИНУТ',
    '05:00': 'ПЯТЬ ЧАСОВ',
    '17:00': 'ПЯТЬ ЧАСОВ',
  },
} satisfies GridConfig;
