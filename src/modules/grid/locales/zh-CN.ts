import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';
import { HOURS } from '../constants';

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

const commonWords: Partial<CommonWords> = {
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
  FIVE_MIN: [75, 76],
  QUARTER_MIN: [84, 85, 86],
  TEN_MIN: [71, 72],
  TWENTY_MIN: [96, 97, 98],
  TWENTYFIVE_MIN: [83, 84, 85, 86],
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
  THIRTY_FIVE: [106, 107, 108, 109],
  FORTY: [103, 104, 105],
  FORTY_FIVE: [89, 90, 91, 92], // 四十五分
  FIFTY: [93, 94, 95],
  FIFTY_FIVE: [79, 80, 81, 82],
};

function getCustomWordKeys(time: string) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['NOW', 'TIME'];
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));

  wordKeys.push(hours >= 0 && hours <= 11 ? 'AM' : 'PM');

  const hoursKey = HOURS[hours % 12];
  wordKeys.push(hoursKey);

  if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTER_MIN');
  else if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY_MIN');
  else if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTYFIVE_MIN');
  else if (minutes >= 30 && minutes < 35) wordKeys.push(`${hoursKey}_HALF`);
  else if (minutes >= 35 && minutes < 40) wordKeys.push('THIRTY_FIVE');
  else if (minutes >= 40 && minutes < 45) wordKeys.push('FORTY');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('FORTY_FIVE');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('FIFTY');
  else if (minutes >= 55) wordKeys.push('FIFTY_FIVE');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 3, 4],
  getCustomWordKeys,
  examples: {
    '07:30': '现在 时间 上午 七点 半',
    '19:30': '现在 时间 下午 七点 半',
  },
} satisfies GridConfig;
