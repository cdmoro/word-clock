import { describe, expect, test } from 'vitest';
import { getCharCoords } from './index';
import { Locale } from '../../types';
import { getLocaleConfig } from './locales';

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
    '22:58': 'SONO LE UNDICI MENO CINQUE',
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
  'nl-NL': {
    '01:00': 'HET IS ÉÉN UUR',
    '01:05': 'HET IS VIJF OVER ÉÉN',
    '01:10': 'HET IS TIEN OVER ÉÉN',
    '01:15': 'HET IS OVER KWART ÉÉN',
    '01:20': 'HET IS TIEN VOOR HALF TWEE',
    '01:25': 'HET IS VIJF VOOR HALF TWEE',
    '01:30': 'HET IS HALF TWEE',
    '01:35': 'HET IS VIJF OVER HALF TWEE',
    '01:40': 'HET IS TIEN OVER HALF TWEE',
    '01:45': 'HET IS KWART VOOR TWEE',
    '01:50': 'HET IS TIEN VOOR TWEE',
    '01:55': 'HET IS VIJF VOOR TWEE',
    '02:00': 'HET IS TWEE UUR',
    '14:00': 'HET IS TWEE UUR',
    '05:55': 'HET IS VIJF VOOR ZES',
    '17:55': 'HET IS VIJF VOOR ZES',
  },
  'sv-SE': {
    '01:00': 'KLOCKAN ÄR ETT',
    '01:05': 'KLOCKAN ÄR FEM ÖVER ETT',
    '01:10': 'KLOCKAN ÄR TIO ÖVER ETT',
    '01:15': 'KLOCKAN ÄR KVART ÖVER ETT',
    '01:20': 'KLOCKAN ÄR TJUGO ÖVER ETT',
    '01:25': 'KLOCKAN ÄR FEM I HALV TVÅ',
    '01:30': 'KLOCKAN ÄR HALV TVÅ',
    '01:35': 'KLOCKAN ÄR FEM ÖVER HALV TVÅ',
    '01:40': 'KLOCKAN ÄR TJUGO I TVÅ',
    '01:45': 'KLOCKAN ÄR KVART I TVÅ',
    '01:50': 'KLOCKAN ÄR TIO I TVÅ',
    '01:55': 'KLOCKAN ÄR FEM I TVÅ',
    '02:00': 'KLOCKAN ÄR TVÅ',
  },
  'no-NO': {
    '01:00': 'KLOKKEN ER ETT',
    '01:05': 'KLOKKEN ER FEM OVER ETT',
    '01:10': 'KLOKKEN ER TI OVER ETT',
    '01:15': 'KLOKKEN ER KVART OVER ETT',
    '01:20': 'KLOKKEN ER TI PÅ HALV TO',
    '01:25': 'KLOKKEN ER FEM PÅ HALV TO',
    '01:30': 'KLOKKEN ER HALV TO',
    '01:35': 'KLOKKEN ER FEM OVER HALV TO',
    '01:40': 'KLOKKEN ER TI OVER HALV TO',
    '01:45': 'KLOKKEN ER KVART PÅ TO',
    '01:50': 'KLOKKEN ER TI PÅ TO',
    '01:55': 'KLOKKEN ER FEM PÅ TO',
    '02:00': 'KLOKKEN ER TO',
  },
};

describe('getWordsKeys', () =>
  Object.keys(testCases).forEach((locale) =>
    describe(`${locale}`, () => {
      const { grid } = getLocaleConfig(locale as Locale);

      Object.entries(testCases[locale as Locale]).forEach(([time, phrase]) =>
        test(`${time} - ${phrase}`, () => {
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
