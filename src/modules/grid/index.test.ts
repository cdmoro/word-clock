import { describe, expect, test } from 'vitest';
import { ClockConfig, ClockType, Locale } from '../../types';
import { getLocaleConfig } from './locales';
import { getCoords } from './utils';

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

function getOutput(coords: number[][], config: ClockConfig) {
  const { type, grid } = config;

  switch (type) {
    case ClockType.grid: {
      const { charsWithApostrophe } = config;
      return coords.map((word) =>
        word.map((i) => `${grid[Math.floor(i / 11)][i % 11]}${charsWithApostrophe?.includes(i) ? '’' : ''}`).join(''),
      );
    }
    case ClockType.flex:
      return coords.map(([row, pos]) => grid[row][pos]);
    default:
      throw new Error(`Unsopported clock type: ${type}`);
  }
}

describe('Times', () =>
  (Object.keys(TEST_CASES) as Locale[]).forEach((locale) =>
    describe(`Locale: ${locale}`, () => {
      const config = getLocaleConfig(locale);

      Object.entries(TEST_CASES[locale]).forEach(([time, phrase]) =>
        test(`${time} - ${phrase}`, () => {
          const coords = getCoords(locale, time);
          const output = getOutput(coords, config).join(' ');

          expect(output).toEqual(phrase);
        }),
      );
    }),
  ));
