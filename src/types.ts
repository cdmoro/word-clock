import TRANSLATIONS from './strings/translations.json';

export type { Translations } from './strings/types';

export type Locale = keyof typeof TRANSLATIONS;

export interface Quote {
  id: string;
  quote_first: string;
  quote_time_case: string;
  quote_last: string;
  title: string;
  author: string;
  sfw: string;
}

export interface ResolvedQuote extends Quote {
  fallback: boolean;
  index: number;
  locale: Locale;
  quote_raw: string;
}

type CommonWordsKey =
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

export type CommonWords = Record<CommonWordsKey, number[]>;

export interface LocaleGridConfig {
  grid: string[];
  charsWithAphostrophe?: number[];
  getWordsToHighlight: (hours: number, minutes: number) => string[];
  words: Record<string, number[]>;
}
