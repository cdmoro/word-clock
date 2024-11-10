import { describe, expect, test } from 'vitest';
import { getWordsKeys } from './index';
import { Locale } from '../../types';

const dictionary: Partial<Record<Locale, Record<string, string>>> = {
  'en-US': {
    TWENTYFIVE: 'TWENTYFIVE_MIN',
  },
  'es-ES': {
    UNA: 'ONE',
    DOCE: 'TWELVE',
    MEDIA: 'HALF',
    VEINTICINCO: 'TWENTYFIVE_MIN',
  },
  'fr-FR': {
    UNE: 'ONE',
    MIDI: 'TWELVE',
    DEMIE: 'HALF',
    'VINGT-CINQ': 'TWENTYFIVE_MIN',
  },
  'pt-BR': {
    UMA: 'ONE',
    MEIA: 'HALF',
    VINTE_E_CINCO: 'TWENTYFIVE_MIN',
    MEIO_DIA: 'TWELVE',
    ONZE: 'ELEVEN',
    DEZ: 'TEN',
  },
  'it-IT': {
    UNA: 'ONE',
    DODICI: 'TWELVE',
    MEZZA: 'HALF',
    VENTICINQUE: 'TWENTYFIVE_MIN',
  },
};

const testCases: Partial<Record<Locale, Record<string, string>>> = {
  'en-US': {
    '12:30': 'IT IS HALF PAST TWELVE',
    '12:32': 'IT IS HALF PAST TWELVE',
    '12:35': 'IT IS TWENTYFIVE TO ONE',
  },
  'es-ES': {
    '12:30': 'SON LAS DOCE Y MEDIA',
    '12:32': 'SON LAS DOCE Y MEDIA',
    '12:35': 'ES LA UNA MENOS VEINTICINCO',
  },
  'it-IT': {
    '12:30': 'SONO LE DODICI E MEZZA',
    '12:32': 'SONO LE DODICI E MEZZA',
    '12:35': 'È L UNA MENO VENTICINQUE',
  },
  'pt-BR': {
    '12:30': 'SÃO MEIO_DIA E MEIA',
    '12:32': 'SÃO MEIO_DIA E MEIA',
    '12:35': 'É UMA MENOS VINTE_E_CINCO',
  },
  'fr-FR': {
    '12:30': 'IL EST MIDI ET DEMIE',
    '12:32': 'IL EST MIDI ET DEMIE',
    '12:35': 'IL EST UNE HEURES MOINS VINGT-CINQ',
  },
};

describe('getWordsKeys', () =>
  Object.keys(testCases).forEach((locale) =>
    describe(`${locale}`, () =>
      // @ts-expect-error Add German test cases
      Object.entries(testCases[locale as Locale]).forEach(([time, words]) =>
        test(`${time}`, () => {
          const output = getWordsKeys(locale as Locale, time);
          expect(output.sort()).toEqual(
            words
              .split(' ')
              .map((key) => dictionary[locale as Locale]?.[key] || key)
              .sort(),
          );
        }),
      )),
  ));
