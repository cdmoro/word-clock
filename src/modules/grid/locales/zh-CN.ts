import { CommonWords, LocaleGridConfig, WordKeys } from '../../../types';

const grid = [
  '现在是时间昼上午下午夜', // 0-10   "现在是" = "It is", "时间" = "time"
  '十一点半四点五点半六八', // 11-21  "十一" = "eleven", "点" = "o'clock", "半" = "half", etc.
  '七点半一九点半四十五分', // 22-32  "七" = "seven", "九" = "nine", "四十五分" = "forty-five minutes"
  '四十分三十五分零五分七', // 33-43  "四十" = "forty", "零五分" = "five minutes"
  '六二十五分二十分五十分', // 44-54  "二十" = "twenty", "五十" = "fifty"
  '五三点半六点十二点半点', // 55-65  "十二" = "twelve", "三点半" = "three-thirty"
  '十点八点三十分一零五分', // 66-76  "三十分" = "thirty minutes"
  '六三五十五分二十五分整', // 77-87  "五十五分" = "fifty-five minutes"
  '三四十五分五十分二十分', // 88-98  "四十五分" = "forty-five minutes"
  '二十分八四十分三十五分', // 99-109 "三十五分" = "thirty-five minutes"
];

const commonWords: CommonWords = {
  ONE: [12, 13], // 一点 (1 o'clock)
  TWO: [62, 63], // 二点 (2 o'clock)
  THREE: [56, 57], // 三点 (3 o'clock)
  FOUR: [15, 16], // 四点 (4 o'clock)
  FIVE: [17, 18], // 五点 (5 o'clock)
  SIX: [59, 60], // 六点 (6 o'clock)
  SEVEN: [22, 23], // 七点 (7 o'clock)
  EIGHT: [68, 69], // 八点 (8 o'clock)
  NINE: [27, 28], // 九点 (9 o'clock)
  TEN: [66, 67], // 十点 (10 o'clock)
  ELEVEN: [11, 12, 13], // 十一点 (11 o'clock)
  TWELVE: [61, 62, 63], // 十二点 (12 o'clock)
  HALF: [], // 半 (half past)
  FIVE_MIN: [],
  QUARTER_MIN: [],
  TEN_MIN: [],
  TWENTY_MIN: [],
  TWENTYFIVE_MIN: [],
};

const localeWords = {
  NOW: [0, 1], // 现在 (now)
  TIME: [3, 4], // 是 (is)
  EXACT: [76], // 整 (exactly)
  ONE_HALF: [14], // 半
  TWO_HALF: [64], // 半
  THREE_HALF: [58], // 半
  FOUR_HALF: [19], // 半
  FIVE_HALF: [19], // 半
  SIX_HALF: [64], // 半
  SEVEN_HALF: [24], // 半
  EIGHT_HALF: [70, 71, 72], // 三十分
  NINE_HALF: [28], // 半
  TEN_HALF: [70, 71, 72], // 三十分
  ELEVEN_HALF: [14], // 半
  TWELVE_HALF: [64], // 半
  AM: [6, 7],
  PM: [8, 9],
  '5': [38, 39], // 五分 (5 minutes)
  '10': [42, 43], // 十分 (10 minutes)
  '15': [32, 33, 34, 35], // 十五分 (15 minutes)
  '20': [50, 51], // 二十分 (20 minutes)
  '25': [54, 55], // 二十五分 (25 minutes)
  '30': [46, 47], // 三十分 (30 minutes)
  '35': [68, 69], // 三十五分 (35 minutes)
  '40': [12, 13], // 四十分 (40 minutes)
  '45': [26, 27], // 四十五分 (45 minutes)
  '50': [52, 53], // 五十分 (50 minutes)
  '55': [64, 65], // 五十五分 (55 minutes)
};

function getLocaleWordKeys(_hours: number, minutes: number) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['NOW', 'TIME'];

  if (minutes >= 0 && minutes < 5) {
    wordKeys.push('EXACT');
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
  secondaryChars: [0, 1, 3, 4],
  hourMark: 60,
  examples: {
    '07:30': '现在 时间 七点 ', // 现在 时间 上午 七点半
  },
} satisfies LocaleGridConfig;
