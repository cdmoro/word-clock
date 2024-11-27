import { CommonWords, LocaleGridConfig, WordKeys } from '../../../types';

const grid = [
  'השעהראחתעשר',
  'ארשתײםרעשרה',
  'שלושארבעראמ',
  'חמששבעשמונה',
  'שתשערוחמישה',
  'אועשריםמראש',
  'שלושיםועשרה',
  'וארבעיםורבע',
  'וחמישיםוחצי',
  'אבתושרוחמשא',
];

const commonWords: CommonWords = {
  ONE: [5, 6, 7], // אחת
  TWO: [11, 12, 13], // שתיים
  THREE: [22, 23, 24], // שלוש
  FOUR: [27, 28, 29], // ארבע
  FIVE: [33, 34, 35], // חמש
  SIX: [44, 45, 46], // שש
  SEVEN: [48, 49, 50], // שבע
  EIGHT: [51, 52, 53], // שמונה
  NINE: [55, 56, 57], // תשע
  TEN: [59, 60, 61], // עשר
  ELEVEN: [2, 3, 4], // אחת עשרה (once)
  TWELVE: [8, 9, 10], // שתים עשרה (doce)
  HALF: [88, 89, 90], // חצי
  QUARTER_MIN: [77, 78, 79], // רבע
  TWENTY_MIN: [55, 56, 57], // עשרים
  FIVE_MIN: [33, 34, 35], // חמש (cinco)
  TEN_MIN: [59, 60, 61], // עשר (diez)
  TWENTYFIVE_MIN: [
    [33, 34, 35], // חמש (cinco)
    [55, 56, 57], // עשרים (veinte)
  ], // עשרים וחמש דקות (veinticinco)
};

const localeWords = {
  ES: [0, 1, 2], // השעה
  UNTIL: [66, 67, 68], // עד
  REMAINING: [55, 56, 57], // עוד
  HOUR: [44, 45, 46], // שעה
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = [];

  // Agregar la hora básica
  wordKeys.push('ES');

  // Determinar minutos
  if (minutes === 0) {
    wordKeys.push('HOUR'); // Hora exacta
  } else if (minutes > 30) {
    wordKeys.push('UNTIL', 'REMAINING'); // Después de la media
  } else {
    wordKeys.push('REMAINING'); // Antes de la media
  }

  // Ajustar para "חצי" (media) o "רבע" (cuarto)
  if (minutes === 15) {
    wordKeys.push('QUARTER_MIN');
  } else if (minutes === 30) {
    wordKeys.push('HALF');
  }

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2],
  examples: {
    '01:00': 'השע אחת שתש', //'השעה אחת שעה',
    // '01:05': 'השעה אחת עוד חמש דקות',
    // '01:10': 'השעה אחת עוד עשר דקות',
    // '01:15': 'השעה אחת רבע',
    // '01:20': 'השעה אחת עוד עשרים דקות',
    // '01:25': 'השעה אחת עוד עשרים וחמש דקות',
    // '01:30': 'השעה אחת חצי',
    // '01:35': 'השעה שתיים עד עשרים וחמש דקות',
    // '01:40': 'השעה שתיים עד עשרים דקות',
    // '01:45': 'השעה שתיים עד רבע',
    // '01:50': 'השעה שתיים עד עשר דקות',
    // '01:55': 'השעה שתיים עד חמש דקות',
    // '02:00': 'השעה שתיים שעה',
  },
} satisfies LocaleGridConfig;
