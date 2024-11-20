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
    '00:00': 'SÃO MEIA NOITE',
    '12:00': 'SÃO MEIO DIA',
    '12:30': 'SÃO MEIO DIA E MEIA',
    '12:32': 'SÃO MEIO DIA E MEIA',
    '12:35': 'É UMA HORA MENOS VINTE E CINCO',
  },
  'fr-FR': {
    '12:30': 'IL EST MIDI ET DEMIE',
    '12:32': 'IL EST MIDI ET DEMIE',
    '12:35': 'IL EST UNE HEURES MOINS VINGT-CINQ',
  },
  'de-DE': {
    '01:00': 'ES IST EINS UHR',
    '01:05': 'ES IST FÜNF NACH EINS',
    '01:10': 'ES IST ZEHN NACH EINS',
    '01:15': 'ES IST VIERTEL NACH EINS',
    '01:20': 'ES IST ZWANZIG NACH EINS',
    '01:25': 'ES IST FÜNF ZWANZIG NACH EINS',
    '01:30': 'ES IST HALB EINS',
    '01:35': 'ES IST FÜNF ZWANZIG VOR ZWEI',
    '01:40': 'ES IST ZWANZIG VOR ZWEI',
    '01:45': 'ES IST VIERTEL VOR ZWEI',
    '01:50': 'ES IST ZEHN VOR ZWEI',
    '01:55': 'ES IST FÜNF VOR ZWEI',
    '02:00': 'ES IST ZWEI UHR',
    '07:30': 'ES IST HALB SIEBE',
    '10:00': 'ES IST ZEHN UHR',
    '12:00': 'ES IST ZWÖLF UHR',
    '12:30': 'ES IST HALB ZWÖLF',
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
  'cs-CZ': {
    '01:00': 'JE JEDNA',
    '01:05': 'JE JEDNA PĚT',
    '01:10': 'JE JEDNA DESET',
    '01:15': 'JE JEDNA PATNÁCT',
    '01:20': 'JE JEDNA DVACET',
    '01:25': 'JE JEDNA DVACET PĚT',
    '01:30': 'JE JEDNA TŘICET',
    '01:35': 'JSOU DVĚ TŘICET PĚT',
    '01:40': 'JSOU DVĚ ČTYŘICET',
    '01:45': 'JSOU DVĚ ČTYŘICET PĚT',
    '01:50': 'JSOU DVĚ PADESÁT',
    '01:55': 'JSOU DVĚ PADESÁT PĚT',
    '02:00': 'JSOU DVĚ',
    '07:30': 'JE SEDM TŘICET',
  },
  'tr-TR': {
    '01:00': 'SAAT BİR',
    '01:05': 'SAAT BİRİ BEŞ GEÇİYOR',
    '01:10': 'SAAT BİRİ ON GEÇİYOR',
    '01:15': 'SAAT BİRİ ÇEYREK GEÇİYOR',
    '01:20': 'SAAT BİRİ YİRMİ GEÇİYOR',
    '01:25': 'SAAT BİRİ YİRMİ BEŞ GEÇİYOR',
    '01:30': 'SAAT BİR BUÇUK',
    '01:35': 'SAAT BİRİ OTUZ BEŞ GEÇİYOR',
    '01:40': 'SAAT BİRİ KIRK GEÇİYOR',
    '01:45': 'SAAT BİRİ KIRK BEŞ GEÇİYOR',
    '01:50': 'SAAT BİRİ ELLİ GEÇİYOR',
    '01:55': 'SAAT BİRİ ELLİ BEŞ GEÇİYOR',
    '02:00': 'SAAT İKİ',
    '02:05': 'SAAT İKİYİ BEŞ GEÇİYOR',
    '07:30': 'SAAT YEDİ BUÇUK',
    '10:00': 'SAAT ON',
    '10:10': 'SAAT ONU ON GEÇİYOR',
    '12:00': 'SAAT ON İKİ',
    '12:05': 'SAAT ON İKİYİ BEŞ GEÇİYOR',
    '12:30': 'SAAT ON İKİ BUÇUK',
  },
  'ro-RO': {
    '01:00': 'ESTE ORA UNU',
    '01:05': 'ESTE ORA UNU ȘI CINCI',
    '01:10': 'ESTE ORA UNU ȘI ZECE',
    '01:15': 'ESTE ORA UNU ȘI UN SFERT',
    '01:20': 'ESTE ORA UNU ȘI DOUĂZECI',
    '01:25': 'ESTE ORA UNU ȘI DOUĂZECI ȘI CINCI',
    '01:30': 'ESTE ORA UNU ȘI TREIZECI',
    '01:35': 'ESTE ORA DOUĂ FĂRĂ DOUĂZECI ȘI CINCI',
    '01:40': 'ESTE ORA DOUĂ FĂRĂ DOUĂZECI',
    '01:45': 'ESTE ORA DOUĂ FĂRĂ UN SFERT',
    '01:50': 'ESTE ORA DOUĂ FĂRĂ ZECE',
    '01:55': 'ESTE ORA DOUĂ FĂRĂ CINCI',
    '02:00': 'ESTE ORA DOUĂ',
    '02:35': 'ESTE ORA TREI FĂRĂ DOUĂZECI ȘI CINCI',
    '03:00': 'ESTE ORA TREI',
    '03:35': 'ESTE ORA PATRU FĂRĂ DOUĂZECI ȘI CINCI',
    '04:00': 'ESTE ORA PATRU',
    '04:35': 'ESTE ORA CINCI FĂRĂ DOUĂZECI ȘI CINCI',
    '17:00': 'ESTE ORA CINCI',
    '17:35': 'ESTE ORA ȘASE FĂRĂ DOUĂZECI ȘI CINCI',
    '18:00': 'ESTE ORA ȘASE',
    '18:35': 'ESTE ORA ȘAPTE FĂRĂ DOUĂZECI ȘI CINCI',
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
            .map((word) => word.map((index) => grid[Math.floor(index / 11)][index % 11]).join(''))
            .join(' ');

          expect(outputPhrase).toEqual(phrase);
        }),
      );
    }),
  ));
