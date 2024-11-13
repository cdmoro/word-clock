import { describe, expect, test } from 'vitest';
import { getCharCoords, getLocaleConfig } from './index';
import { Locale } from '../../types';

const testCases: Record<Locale, Record<string, string>> = {
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
    '12:35': 'È LUNA MENO VENTICINQUE',
  },
  'pt-PT': {
    '12:30': 'SÃO MEIO DIA E MEIA',
    '12:32': 'SÃO MEIO DIA E MEIA',
    '12:35': 'É UMA MENOS VINTE E CINCO',
  },
  'fr-FR': {
    '12:30': 'IL EST MIDI ET DEMIE',
    '12:32': 'IL EST MIDI ET DEMIE',
    '12:35': 'IL EST UNE HEURES MOINS VINGT-CINQ',
  },
  'de-DE': {
    '17:05': 'ES IST FÜNF NACH FÜNF',
    '20:26': 'ES IST FÜNF ZWANZIG NACH ACHT',
  },
  'el-GR': {
    '17:05': 'Η ΩΡΑ ΕΙΝΑΙ ΠΕΝΤΕ ΚΑΙ ΠΕΝΤΕ',
    '20:26': 'Η ΩΡΑ ΕΙΝΑΙ ΟΧΤΩ ΚΑΙ ΕΙΚΟΣΙ ΠΕΝΤΕ',
  },
};

describe('getWordsKeys', () =>
  Object.keys(testCases).forEach((locale) =>
    describe(`${locale}`, () => {
      const { grid } = getLocaleConfig(locale as Locale);

      Object.entries(testCases[locale as Locale]).forEach(([time, phrase]) =>
        test(`${time}`, () => {
          const output = getCharCoords(locale as Locale, time);

          const outputPhrase = output
            .sort((a, b) => a[0] - b[0])
            .map((word) =>
              word
                .map((index) => {
                  const row = Math.floor(index / 11);
                  const col = index % 11;
                  return grid[row][col];
                })
                .join(''),
            )
            .join(' ');

          expect(outputPhrase).toEqual(phrase);
        }),
      );
    }),
  ));
