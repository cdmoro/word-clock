import TRANSLATIONS from './strings/translations.json';

export type { Translations } from './strings/types';

declare global {
  interface Window {
    highlightGrid: (time: string) => void;
    highlightFlexGrid: (time: string) => void;
  }
}

export type Locale = keyof typeof TRANSLATIONS;

export type HourKey =
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
  | 'TWELVE';

export type MinuteKey = 'FIVE_MIN' | 'TEN_MIN' | 'QUARTER_MIN' | 'TWENTY_MIN' | 'TWENTYFIVE_MIN' | 'HALF';

export type CommonWordsKey = HourKey | MinuteKey;

type Word = number[] | number[][] | ((hours: number, minutes: number) => Word);

export type CommonWords = Record<CommonWordsKey, Word>;

export type LocaleWords = Record<string, Word>;

export type WordKeys<T> = CommonWordsKey | keyof T;

export enum ClockType {
  grid = 'grid',
  flex = 'flex',
}

interface CommonConfig {
  type: ClockType;
  clockWords: Record<string, Word>;
  getLocaleWordKeys?: (hours: number, minutes: number) => string[];
  getCustomWordKeys?: (time: string) => string[];
  hourMark?: number;
  fuzzyCapitalWords?: string[];
  fuzzyDictionary?: Record<string, string>;
  examples: Record<string, string>;
}

export interface GridConfig extends CommonConfig {
  type: ClockType.grid;
  grid: string[];
  charsWithApostrophe?: number[];
  secondaryChars?: number[];
}

export interface FlexConfig extends CommonConfig {
  type: ClockType.flex;
  grid: string[][];
  clockWords: Record<string, Word>;
  secondaryWords?: number[][];
}

export type ClockConfig = GridConfig | FlexConfig;
