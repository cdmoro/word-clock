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

const TEST_CASES: Record<Locale, Record<string, string>> = {
  'en-US': enUS.testCases,
  'es-ES': esES.testCases,
  'it-IT': itIT.testCases,
  'pt-PT': ptPT.testCases,
  'fr-FR': frFR.testCases,
  'de-DE': deDE.testCases,
  'el-GR': elGR.testCases,
  'nl-NL': nlNL.testCases,
  'sv-SE': svSE.testCases,
  'no-NO': noNO.testCases,
  'cs-CZ': csCZ.testCases,
  'tr-TR': trTR.testCases,
  'ro-RO': roRO.testCases,
  'ca-ES': caES.testCases,
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
