import { describe, expect, test } from 'vitest';
import { ClockType, Locale } from '../../types';
import { getLocaleConfig } from './locales';
import { getCharCoords } from './types/grid';
import { getWordCoords } from './types/flex';

import enUS from './locales/en-US';
import esES from './locales/es-ES';
import itIT from './locales/it-IT';
import ptPT from './locales/pt-PT';
import frFR from './locales/fr-FR';
import deDE from './locales/de-DE';
import elGR from './locales/el-GR';
import nlNL from './locales/nl-NL';
import svSE from './locales/sv-SE';
import noNO from './locales/no-NO';
import csCZ from './locales/cs-CZ';
import trTR from './locales/tr-TR';
import roRO from './locales/ro-RO';
import caES from './locales/ca-ES';
import ruRU from './locales/ru-RU';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';
import deCH from './locales/de-CH';
import jaJP from './locales/ja-JP';
import heIL from './locales/he-IL';
import arAE from './locales/ar-AE';

const TEST_CASES: Record<Locale, Record<string, string>> = {
  'en-US': enUS.examples,
  'es-ES': esES.examples,
  'it-IT': itIT.examples,
  'pt-PT': ptPT.examples,
  'fr-FR': frFR.examples,
  'de-DE': deDE.examples,
  'el-GR': elGR.examples,
  'nl-NL': nlNL.examples,
  'sv-SE': svSE.examples,
  'no-NO': noNO.examples,
  'cs-CZ': csCZ.examples,
  'tr-TR': trTR.examples,
  'ro-RO': roRO.examples,
  'ca-ES': caES.examples,
  'ru-RU': ruRU.examples,
  'zh-CN': zhCN.examples,
  'zh-TW': zhTW.examples,
  'de-CH': deCH.examples,
  'ja-JP': jaJP.examples,
  'he-IL': heIL.examples,
  'ar-AE': arAE.examples,
};

function getOutput(locale: Locale, type: ClockType, grid: string[] | string[][], time: string) {
  if (type === ClockType.grid) {
    return getCharCoords(locale, time).map((word) =>
      word.map((index) => grid?.[Math.floor(index / 11)][index % 11]).join(''),
    );
  }

  if (type === ClockType.flex) {
    return getWordCoords(locale, time).map(([row, pos]) => grid[row][pos]);
  }

  throw new Error(`Unsopported clock type: ${type}`);
}

describe('Times', () =>
  (Object.keys(TEST_CASES) as Locale[]).forEach((locale) =>
    describe(`Locale: ${locale}`, () => {
      const { type, grid } = getLocaleConfig(locale);

      Object.entries(TEST_CASES[locale]).forEach(([time, phrase]) =>
        test(`${time} - ${phrase}`, () => {
          const output = getOutput(locale, type, grid, time).join(' ');

          expect(output).toEqual(phrase.replace(/’/g, ''));
        }),
      );
    }),
  ));
