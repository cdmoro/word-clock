import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';

const grid = [
  'ΗΧΩΡΑΤΕΙΝΑΙ', // 0-10 ("Η ΧΩΡΑ ΤΕΙΝΑΙ" - General grid, start of "Η" - It is)
  'ΜΙΑΔΥΟΤΡΕΙΣ', // 11-21 ("ΜΙΑ ΔΥΟ ΤΡΕΙΣ" - One, Two, Three)
  'ΤΕΣΣΕΡΙΣΕΞΙ', // 22-32 ("ΤΕΣΣΕΡΙΣ ΕΞΙ" - Four, Six)
  'ΠΕΝΤΕΡΟΧΤΩΗ', // 33-43 ("ΠΕΝΤΕ ΟΧΤΩ" - Five, Eight)
  'ΕΦΤΑΕΕΝΤΕΚΑ', // 44-54 ("ΕΦΤΑ ΕΝΤΕΚΑ" - Seven, Eleven)
  'ΔΩΔΕΚΑΕΝΝΙΑ', // 55-65 ("ΔΩΔΕΚΑ ΕΝΝΙΑ" - Twelve, Nine)
  'ΔΕΚΑΧΠΑΡΑΕΡ', // 66-76 ("ΔΕΚΑ ΠΑΡΑ" - Ten, To/Before)
  'ΚΑΙΕΤΕΤΑΡΤΟ', // 77-87 ("ΚΑΙ ΤΕΤΑΡΤΟ" - And, Quarter)
  'ΕΙΚΟΣΙΗΔΕΚΑ', // 88-98 ("ΕΙΚΟΣΙ ΔΕΚΑ" - Twenty, Ten)
  'ΜΙΣΗΕΠΕΝΤΕΡ', // 99-109 ("ΜΙΣΗ ΠΕΝΤΕ" - Half, Five)
];

const commonWords: CommonWords = {
  TWELVE: [55, 56, 57, 58, 59, 60], // ΔΩΔΕΚΑ
  ONE: [11, 12, 13], // ΜΙΑ
  TWO: [14, 15, 16], // ΔΥΟ
  THREE: [17, 18, 19, 20, 21], // ΤΡΕΙΣ
  FOUR: [22, 23, 24, 25, 26, 27, 28, 29], // ΤΕΣΣΕΡΙΣ
  FIVE: [33, 34, 35, 36, 37], // ΠΕΝΤΕ
  SIX: [30, 31, 32], // ΕΞΙ
  SEVEN: [44, 45, 46, 47], // ΕΦΤΑ
  EIGHT: [39, 40, 41, 42], // ΟΧΤΩ
  NINE: [61, 62, 63, 64, 65], // ΕΝΝΙΑ
  TEN: [66, 67, 68, 69], // ΔΕΚΑ
  ELEVEN: [49, 50, 51, 52, 53, 54], // ΕΝΤΕΚΑ
  FIVE_MIN: [104, 105, 106, 107, 108], // ΠΕΝΤΕ
  TEN_MIN: [95, 96, 97, 98], // ΔΕΚΑ
  QUARTER_MIN: [81, 82, 83, 84, 85, 86, 87], // ΤΕΤΑΡΤΟ
  TWENTY_MIN: [88, 89, 90, 91, 92, 93], // ΕΙΚΟΣΙ
  TWENTYFIVE_MIN: [
    [88, 89, 90, 91, 92, 93],
    [104, 105, 106, 107, 108],
  ], // ΜΙΣΗ
  HALF: [99, 100, 101, 102], // ΜΙΣΗ (también para 'media hora')
};

const localeWords = {
  Η: [0],
  ΩΡΑ: [2, 3, 4],
  ΕΙΝΑΙ: [6, 7, 8, 9, 10], // ΕΙΝΑΙ (Es)
  ΠΑΡΑ: [71, 72, 73, 74], // ΠΑΡΑ (Before/To)
  ΚΑΙ: [77, 78, 79], // ΚΑΙ (And)
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['Η', 'ΩΡΑ', 'ΕΙΝΑΙ'];

  // Determine whether to use "ΚΑΙ" or "ΠΑΡΑ" based on minutes
  if (minutes >= 35) {
    // Use "ΠΑΡΑ" (before/to) and increment hour
    wordKeys.push('ΠΑΡΑ');
  } else if (minutes >= 5) {
    wordKeys.push('ΚΑΙ');
  }

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  getLocaleWordKeys,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 2, 3, 4, 6, 7, 8, 9, 10],
  examples: {
    '17:05': 'Η ΩΡΑ ΕΙΝΑΙ ΠΕΝΤΕ ΚΑΙ ΠΕΝΤΕ',
    '20:26': 'Η ΩΡΑ ΕΙΝΑΙ ΟΧΤΩ ΚΑΙ ΕΙΚΟΣΙ ΠΕΝΤΕ',
  },
} satisfies GridConfig;
