import { describe, expect, test } from 'vitest';
import { getCharCoords } from './index';
import { Locale } from '../../types';
import { getLocaleConfig } from './locales';
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
};

describe('getWordsKeys', () =>
  Object.keys(TEST_CASES).forEach((locale) =>
    describe(`${locale}`, () => {
      const { grid } = getLocaleConfig(locale as Locale);

      Object.entries(TEST_CASES[locale as Locale]).forEach(([time, phrase]) =>
        test(`${time} - ${phrase}`, () => {
          const output = getCharCoords(locale as Locale, time);

          const outputPhrase = output
            .map((word) => word.map((index) => grid[Math.floor(index / 11)][index % 11]).join(''))
            .join(' ');

          expect(outputPhrase).toEqual(phrase.replace(/’/g, ''));
        }),
      );
    }),
  ));
