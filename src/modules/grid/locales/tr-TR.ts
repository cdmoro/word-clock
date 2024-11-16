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
  ONE: [0, 1, 2], // BİRİ
  TWO: [22, 23, 24], // İKİYİ
  THREE: [33, 34, 35], // ÜÇÜ
  FOUR: [44, 45], // DÖRDÜ
  FIVE: [55, 56], // BEŞİ
  SIX: [66, 67], // ALTI
  SEVEN: [77, 78], // YEDİ
  EIGHT: [88, 89], // SEKİZİ
  NINE: [99, 100], // DOKUZ
  TEN: [111, 112], // ON
  ELEVEN: [122, 123], // BİRİ
  TWELVE: [133, 134], // ON İKİ
  FIVE_MIN: [77, 78, 79], // BEŞ (five minutes)
  TEN_MIN: [11, 12, 13], // ON (ten minutes)
  QUARTER_MIN: [22, 23, 24, 25, 26], // ÇEYREK (quarter)
  TWENTY_MIN: [111, 112, 113], // YİRMİ (twenty minutes)
  TWENTYFIVE_MIN: [121, 122, 123], // YİRMİ BEŞ (twenty-five minutes)
  HALF: [21, 22], // YARIM (half)
};

const localeWords = {
  SAAT: [0, 1, 2, 3, 4, 5, 6], // SAAT
  RONU: [7, 8], // RONU
  YARIM: [21, 22], // YARIM
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['SAAT', 'RONU'];

  // Determinar si se debe usar "YARIM" para media hora
  if (minutes === 30) {
    wordKeys.push('YARIM'); // Si son 30 minutos, agregar YARIM
  }

  // Si es hora exacta (minutos = 0), no necesitamos "YARIM"
  if (minutes === 0) {
    wordKeys.push('RONU'); // Si es en punto, agregar RONU
  }

  return wordKeys;
}

export default {
  grid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
} satisfies LocaleGridConfig;
