import { describe, expect, test } from 'vitest';
import { getWordsKeys } from './index';
import { Locale } from '../../types';

const testCases = {
  'en-US': {
    '12:30': ['IT', 'IS', 'HALF', 'PAST', 'TWELVE'],
    '12:32': ['IT', 'IS', 'HALF', 'PAST', 'TWELVE'],
    '12:35': ['IT', 'IS', 'TWENTYFIVE_MIN', 'TO', 'ONE'],
  },
  'es-ES': {
    '12:30': ['SON', 'LAS', 'TWELVE', 'Y', 'HALF'],
    '12:32': ['SON', 'LAS', 'TWELVE', 'Y', 'HALF'],
    '12:35': ['ES', 'LA', 'ONE', 'MENOS', 'TWENTYFIVE_MIN'],
  },
};

describe('getWordsKeys', () => {
  Object.keys(testCases).forEach((locale) => {
    describe(`${locale}`, () => {
      Object.entries(testCases[locale as keyof typeof testCases]).forEach(([time, output]) => {
        test(`${time}`, () => {
          const wordKeys = getWordsKeys(locale as Locale, time);
          expect(wordKeys).toEqual(expect.arrayContaining(output));
        });
      });
    });
  });
});
