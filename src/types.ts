import TRANSLATIONS from './strings/translations.json';

export type { Translations } from './strings/types';

declare global {
  interface Window {
    highlightGrid: (time: string) => void;
  }
}

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

type Word = number[] | number[][] | ((hours: number, minutes: number) => Word);

export type CommonWords = Record<CommonWordsKey, Word>;

export type LocaleWords = Record<string, Word>;

export type WordKeys<T> = CommonWordsKey | keyof T;

export interface LocaleGridConfig {
  grid: string[];
  charsWithAphostrophe?: number[];
  clockWords: CommonWords & Record<string, Word>;
  getLocaleWordKeys: (hours: number, minutes: number) => string[];
  secondaryChars?: number[];
  getCustomWordKeys?: (time: string) => string[];
}
