import { ClockType, CommonWords, GridConfig, HourKey, WordKeys } from '../../../types';
import { HOURS } from '../constants';

const grid = [
  'SAATRONUÜÇÜ', // 0-10 ("SAAT", "RONU", "ÜÇÜ")
  'BİRİALTIYID', // 11-21 ("BİRİ", "ALTIYI", "D")
  'İKİYİDOKUZU', // 22-32 ("İKİYİ", "DOKUZU")
  'DÖRDÜYEDİYİ', // 33-43 ("DÖRDÜ", "YEDİYİ")
  'SEKİZİYARIM', // 44-54 ("SEKİZİ", "YARIM")
  'DÖRTAMSBEŞİ', // 55-65 ("DÖRT", "AMS", "BEŞİ")
  'KPMOTUZKIRK', // 66-76 ("OTUZ", "KIRK")
  'ELLİONYİRMİ', // 77-87 ("ELLİ", "ON", "YİRMİ")
  'BUÇUKÇEYREK', // 88-98 ("BUÇUK", "ÇEYREK")
  'BEŞMGEÇİYOR', // 99-109 ("BEŞ", "GEÇİYOR")
];

const commonWords: CommonWords = {
  TWELVE: [
    [5, 6],
    [22, 23, 24],
  ], // ON İKİ
  ONE: [11, 12, 13], // BİR
  TWO: [22, 23, 24], // İKİ
  THREE: [8, 9], // ÜÇ
  FOUR: [55, 56, 57, 58], // DÖRT
  FIVE: [62, 63, 64], // BEŞ
  SIX: [15, 16, 17, 18], // ALTI
  SEVEN: [38, 39, 40, 41], // YEDİ
  EIGHT: [44, 45, 46, 47, 48], // SEKİZ
  NINE: [27, 28, 29, 30, 31], // DOKUZ
  TEN: [5, 6], // ON
  ELEVEN: [
    [5, 6],
    [11, 12, 13],
  ], // ON BİR
  FIVE_MIN: [99, 100, 101], // BEŞ (five minutes)
  TEN_MIN: [81, 82], // ON (ten minutes)
  QUARTER_MIN: [93, 94, 95, 96, 97, 98], // ÇEYREK
  TWENTY_MIN: [83, 84, 85, 86, 87], // YİRMİ
  TWENTYFIVE_MIN: [
    [83, 84, 85, 86, 87],
    [99, 100, 101],
  ], // YİRMİ BEŞ
  HALF: [88, 89, 90, 91, 92], // BUÇUK
};

const ACUSATIVE_HOURS = {
  TWELVE_AC: [
    [5, 6],
    [22, 23, 24, 25, 26],
  ], // ON İKİYİ
  ONE_AC: [11, 12, 13, 14], // BİRİ
  TWO_AC: [22, 23, 24, 25, 26], // İKİYİ
  THREE_AC: [8, 9, 10], // ÜÇÜ
  FOUR_AC: [33, 34, 35, 36, 37], // DÖRDÜ
  FIVE_AC: [62, 63, 64, 65], // BEŞİ
  SIX_AC: [15, 16, 17, 18, 19, 20], // ALTIYI
  SEVEN_AC: [38, 39, 40, 41, 42, 43], // YEDİYİ
  EIGHT_AC: [44, 45, 46, 47, 48, 49], // SEKİZİ
  NINE_AC: [27, 28, 29, 30, 31, 32], // DOKUZU
  TEN_AC: [5, 6, 7], // ONU
  ELEVEN_AC: [
    [5, 6],
    [11, 12, 13, 14],
  ], // ON BİRİ
};

const localeWords = {
  SAAT: [0, 1, 2, 3], // SAAT
  OTUZ: [69, 70, 71, 72], // THIRTY
  KIRK: [73, 74, 75, 76], // FORTY
  ELLI: [77, 78, 79, 80], // FIFTY
  GEÇİYOR: [103, 104, 105, 106, 107, 108, 109], // PAST
  ...ACUSATIVE_HOURS,
};

function getCustomWordKeys(time: string) {
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));
  const wordKeys: WordKeys<typeof localeWords>[] = ['SAAT'];

  let hourKey = HOURS[hours % 12];

  if ((minutes >= 5 && minutes < 30) || minutes >= 35) {
    hourKey += '_AC';
  }

  wordKeys.push(hourKey as HourKey);

  if ((minutes >= 5 && minutes < 30) || minutes >= 35) wordKeys.push('GEÇİYOR');

  if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTER_MIN');
  else if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY_MIN');
  else if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTYFIVE_MIN');
  else if (minutes >= 30 && minutes < 35) wordKeys.push('HALF');
  else if (minutes >= 35 && minutes < 40) wordKeys.push('OTUZ', 'FIVE_MIN');
  else if (minutes >= 40 && minutes < 45) wordKeys.push('KIRK');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('KIRK', 'FIVE_MIN');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('ELLI');
  else if (minutes >= 55) wordKeys.push('ELLI', 'FIVE_MIN');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  getCustomWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2, 3],
  examples: {
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
} satisfies GridConfig;
