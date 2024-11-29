import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';
import { HOURS } from '../constants';

const grid = [
  'השעהראחתעשר', // 0-10
  'ארשתײםרעשרה', // 11-21
  'שלושארבעראמ', // 22-32
  'חמששבעשמונה', // 33-43
  'שתשערוחמישה', // 44-54
  'אועשריםמראש', // 55-65
  'שלושיםועשרה', // 66-76
  'וארבעיםורבע', // 77-87
  'וחמישיםוחצי', // 88-98
  'אבתושרוחמשא', // 99-109
];

const commonWords: CommonWords = {
  ONE: [5, 6, 7], // אחת
  TWO: [13, 14, 15, 16], // שתײם
  THREE: [22, 23, 24, 25], // שלוש
  FOUR: [26, 27, 28, 29], // ארבע
  FIVE: [33, 34, 35], // חמש
  SIX: [35, 36], // שש
  SEVEN: [36, 37, 38], // שבע
  EIGHT: [39, 40, 41, 42, 43], // שמונה
  NINE: [45, 46, 47], // תשע
  TEN: [18, 19, 20], // עשר
  ELEVEN: [
    [5, 6, 7],
    [18, 19, 20, 21],
  ], // אחת עשרה (once)
  TWELVE: [
    [13, 14, 15, 16],
    [18, 19, 20, 21],
  ], // שתים עשרה (doce)
  HALF: [95, 96, 97, 98], // חצי
  QUARTER_MIN: [85, 86, 87], // וחצי
  TWENTY_MIN: [57, 58, 59, 60, 61], // עשרים
  FIVE_MIN: [105, 106, 107, 108], // חמש
  TEN_MIN: [59, 60, 61], // עשר
  TWENTYFIVE_MIN: [
    [105, 106, 107, 108], // חמש
    [57, 58, 59, 60, 61], // עשרים
  ], // עשרים וחמש דקות
};

const localeWords = {
  THE_TIME: [0, 1, 2, 3], // השעה
  THIRTY: [66, 67, 68, 69, 70, 71], // שלושים
  FORTY: [78, 79, 80, 81, 82, 83], // ארבעים
  FIFTY: [89, 90, 91, 92, 93, 94], // חמישים
};

function getCustomWordKeys(time: string) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['THE_TIME'];
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));

  wordKeys.push(HOURS[hours % 12]);

  if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTER_MIN');
  else if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY_MIN');
  else if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTYFIVE_MIN');
  else if (minutes >= 30 && minutes < 35) wordKeys.push('HALF');
  else if (minutes >= 35 && minutes < 40) wordKeys.push('THIRTY', 'FIVE_MIN');
  else if (minutes >= 40 && minutes < 45) wordKeys.push('FORTY');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('FORTY', 'FIVE_MIN');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('FIFTY');
  else if (minutes >= 55) wordKeys.push('FIFTY', 'FIVE_MIN');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  getCustomWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2, 3],
  examples: {
    '01:00': 'השעה אחת',
    '01:05': 'השעה אחת וחמש',
    '01:10': 'השעה אחת רים',
    '01:15': 'השעה אחת רבע',
    '01:20': 'השעה אחת עשרים',
    '01:25': 'השעה אחת עשרים וחמש',
    '01:30': 'השעה אחת וחצי',
    '01:35': 'השעה אחת שלושים וחמש',
    '01:40': 'השעה אחת ארבעים',
    '01:45': 'השעה אחת ארבעים וחמש',
    '01:50': 'השעה אחת חמישים',
    '01:55': 'השעה אחת חמישים וחמש',
    '02:00': 'השעה שתײם',
    '02:15': 'השעה שתײם רבע',
    '03:15': 'השעה שלוש רבע',
    '04:15': 'השעה ארבע רבע',
    '05:15': 'השעה חמש רבע',
    '06:15': 'השעה שש רבע',
    '07:15': 'השעה שבע רבע',
    '07:30': 'השעה שבע וחצי',
    '08:15': 'השעה שמונה רבע',
    '09:15': 'השעה תשע רבע',
    '10:15': 'השעה עשר רבע',
    '11:15': 'השעה אחת עשרה רבע',
    '12:15': 'השעה שתײם עשרה רבע',
  },
} satisfies GridConfig;
