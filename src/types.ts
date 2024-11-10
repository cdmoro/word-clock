import TRANSLATIONS from './strings/translations.json';

export type { Translations } from './strings/types';

export type Locale = keyof typeof TRANSLATIONS;

export type CommonWordsKey =
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR'
  | 'FIVE'
  | 'SIX'
  | 'SEVEN'
  | 'EIGHT'
  | 'NINE'
  | 'TEN'
  | 'ELEVEN'
  | 'TWELVE'
  | 'FIVE_MIN'
  | 'TEN_MIN'
  | 'QUARTER_MIN'
  | 'TWENTY_MIN'
  | 'TWENTYFIVE_MIN'
  | 'HALF';

type Word = number[] | number[][];
export type CommonWords = Record<CommonWordsKey, Word | ((hours: number, minutes: number) => Word)>;
export type WordKeys<T> = CommonWordsKey | keyof T;

export interface LocaleGridConfig {
  grid: string[];
  charsWithAphostrophe?: number[];
  commonWords: CommonWords;
  getLocaleWordKeys: (hours: number, minutes: number) => string[];
  localeWords: Record<string, number[]>;
}
