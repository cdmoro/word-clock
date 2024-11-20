import { CommonWords, LocaleGridConfig, WordKeys } from '../../../types';

const grid = [
  'SAATRONUÜÇÜ', // 0-10 ("SAAT", "RONU", "ÜÇÜ") - 1:00 (SAAT BİRİ RONU)
  'BİRİALTIYID', // 11-21 ("BİRİ", "ALTIYI", "D") - 1:30 (SAAT BİRİ ALTIYI DOKUZ)
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
  ONE: [11, 12, 13], // BİR
  TWO: [22, 23, 24], // İKİ
  THREE: [8, 9, 10], // ÜÇÜ
  FOUR: [33, 34, 35, 36, 37], // DÖRDÜ
  FIVE: [62, 63, 64, 65], // BEŞİ
  SIX: [15, 16, 17, 18], // ALTI
  SEVEN: [38, 39, 40, 41], // YEDİ
  EIGHT: [44, 45, 46, 47, 48, 49], // SEKİZİ
  NINE: [27, 28, 29, 30, 31], // DOKUZ
  TEN: [5, 6], // ON
  ELEVEN: [[5, 6], [11, 12, 13]], // ON BİR
  TWELVE: [[5, 6], [22, 23, 24]], // ON İKİ
  FIVE_MIN: [99, 100, 101], // BEŞ (five minutes)
  TEN_MIN: [81, 82], // ON (ten minutes)
  QUARTER_MIN: [93, 94, 95, 96, 97, 98], // ÇEYREK (quarter)
  TWENTY_MIN: [83, 84, 85, 86, 87], // YİRMİ (twenty minutes)
  TWENTYFIVE_MIN: [[83, 84, 85, 86, 87], [99, 100, 101]], // YİRMİ BEŞ (twenty-five minutes)
  HALF: [88, 89, 90, 91, 92], // BUÇUK
};

const localeWords = {
  SAAT: [0, 1, 2, 3], // SAAT
  RONU: [7, 8], // RONU
  OTUZ: [69, 70, 71, 72],
  KIRK: [73, 74, 75, 76],
  ELLI: [77, 78, 79, 80],
  GEÇİYOR: [103, 104, 105, 106, 107, 108, 109],
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['SAAT'];

  // Determinar si se debe usar "YARIM" para media hora
  if (minutes !== 0 && minutes !== 30) wordKeys.push('GEÇİYOR')

  if (minutes >= 35 && minutes < 40) wordKeys.push('OTUZ', 'FIVE_MIN')
  else if (minutes >= 40 && minutes < 45) wordKeys.push('KIRK')
  else if (minutes >= 45 && minutes < 50) wordKeys.push('KIRK', 'FIVE_MIN')
  else if (minutes >= 50 && minutes < 55) wordKeys.push('ELLI')
  else if (minutes >= 55) wordKeys.push('ELLI', 'FIVE_MIN')
  // Si es hora exacta (minutos = 0), no necesitamos "YARIM"
  // if (minutes === 0) {
  //   wordKeys.push('RONU'); // Si es en punto, agregar RONU
  // }

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2, 3],
  hourMark: 60,
} satisfies LocaleGridConfig;
