import { ClockType, CommonWords, GridConfig, WordKeys } from '../../../types';
import { HOURS } from '../constants';

const grid = [
  '現在の時刻は六午前午後', // 0-10   "現在の時刻は" ("The current time is"), "六" ("Six"), "午前" ("AM"), "午後" ("PM")
  '一四時半七八分時九二五', // 11-21  "一" ("One"), "四" ("Four"), "時" ("Hour"), "半" ("Half"), "七" ("Seven"), "八" ("Eight"), "分" ("Minute"), "九" ("Nine"), "二" ("Two"), "五" ("Five")
  '五時半七時半二十一時半', // 22-32  "五時半" ("Five-thirty"), "七時半" ("Seven-thirty"), "二十一時半" ("Twenty-one thirty")
  '十二時半十時半八時半一', // 33-43  "十二時半" ("Twelve-thirty"), "十時半" ("Ten-thirty"), "八時半" ("Eight-thirty"), "一" ("One")
  '九時半六時半三時半です', // 44-54  "九時半" ("Nine-thirty"), "六時半" ("Six-thirty"), "三時半" ("Three-thirty"), "です" ("It is")
  '二十五分六九五分四まで', // 55-65  "二十五分" ("Twenty-five minutes"), "五分" ("Five minutes"), "四" ("Four"), "まで" ("Until")
  'あと三五分十分八二六七', // 66-76  "あと" ("Remaining"), "三" ("Three"), "五分" ("Five minutes"), "十分" ("Ten minutes"), "八" ("Eight"), "二" ("Two"), "六" ("Six"), "七" ("Seven")
  '二十分九時六一十五分八', // 77-87  "二十分" ("Twenty minutes"), "九時" ("Nine o'clock"), "十五分" ("Fifteen minutes"), "八" ("Eight")
  '四二十五分二十分六九三', // 88-98  "二十五分" ("Twenty-five minutes"), "二十分" ("Twenty minutes"), "六" ("Six"), "九" ("Nine"), "三" ("Three")
  '六十五分二四三一五です', // 99-109 "六十五分" ("Sixty-five minutes"), "五" ("Five"), "です" ("It is")
];

const commonWords: Partial<CommonWords> = {
  ONE: [30, 31], // 一時 (1 o'clock)
  TWO: [34, 35], // 二時 (2 o'clock)
  THREE: [50, 51], // 三時 (3 o'clock)
  FOUR: [12, 13], // 四時 (4 o'clock)
  FIVE: [22, 23], // 五時 (5 o'clock)
  SIX: [47, 48], // 六時 (6 o'clock)
  SEVEN: [25, 26], // 七時 (7 o'clock)
  EIGHT: [40, 41], // 八時 (8 o'clock)
  NINE: [44, 45], // 九時 (9 o'clock)
  TEN: [37, 38], // 十時 (10 o'clock)
  ELEVEN: [29, 30, 31], // 十一時 (11 o'clock)
  TWELVE: [33, 34, 35], // 十二時 (12 o'clock)
  FIVE_MIN: [69, 70], // 五分
  TEN_MIN: [71, 72], // 十分
  TWENTY_MIN: [77, 78, 79], // 二十分
  TWENTYFIVE_MIN: [89, 90, 91, 92], // 二十五分
  QUARTER_MIN: [84, 85, 86], // 十五分
};

const localeWords = {
  NOW: [0, 1, 2, 3, 4, 5], // 現在の時刻は
  END: [53, 54], // です (ending marker for sentences)
  END_2: [108, 109], // です (ending marker for sentences)
  ONE_HALF: [32], // 半
  TWO_HALF: [36], // 半
  THREE_HALF: [52], // 半
  FOUR_HALF: [14], // 半
  FIVE_HALF: [24], // 半
  SIX_HALF: [49], // 半
  SEVEN_HALF: [27], // 半
  EIGHT_HALF: [42], // 半
  NINE_HALF: [46], // 半
  TEN_HALF: [39], // 半
  ELEVEN_HALF: [32], // 半
  TWELVE_HALF: [36], // 半
  UNTIL: [64, 65], // まで
};

function getCustomWordKeys(time: string) {
  const wordKeys: WordKeys<typeof localeWords>[] = ['NOW'];
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map((t) => parseInt(t));

  if (minutes >= 35) {
    hours = (hours + 1) % 12 || 12;
  }

  const hoursKey = HOURS[hours % 12];
  wordKeys.push(hoursKey);

  if ((minutes >= 0 && minutes < 5) || (minutes >= 30 && minutes < 35)) wordKeys.push('END');
  else wordKeys.push('END_2');

  if (minutes >= 5 && minutes < 10) wordKeys.push('FIVE_MIN');
  else if (minutes >= 10 && minutes < 15) wordKeys.push('TEN_MIN');
  else if (minutes >= 15 && minutes < 20) wordKeys.push('QUARTER_MIN');
  else if (minutes >= 20 && minutes < 25) wordKeys.push('TWENTY_MIN');
  else if (minutes >= 25 && minutes < 30) wordKeys.push('TWENTYFIVE_MIN');
  else if (minutes >= 30 && minutes < 35) wordKeys.push(`${hoursKey}_HALF`);
  else if (minutes >= 35 && minutes < 40) wordKeys.push('TWENTYFIVE_MIN');
  else if (minutes >= 40 && minutes < 45) wordKeys.push('TWENTY_MIN');
  else if (minutes >= 45 && minutes < 50) wordKeys.push('QUARTER_MIN');
  else if (minutes >= 50 && minutes < 55) wordKeys.push('TEN_MIN');
  else if (minutes >= 55) wordKeys.push('FIVE_MIN');

  if (minutes >= 35) wordKeys.push('UNTIL');

  return wordKeys;
}

export default {
  type: ClockType.grid,
  grid,
  clockWords: {
    ...commonWords,
    ...localeWords,
  },
  secondaryChars: [0, 1, 2, 3, 4, 5],
  getCustomWordKeys,
  examples: {
    '01:00': '現在の時刻は 一時 です',
    '01:05': '現在の時刻は 一時 五分 です',
    '01:10': '現在の時刻は 一時 十分 です',
    '01:15': '現在の時刻は 一時 十五分 です',
    '01:20': '現在の時刻は 一時 二十分 です',
    '01:25': '現在の時刻は 一時 二十五分 です',
    '01:30': '現在の時刻は 一時 半 です',
    '01:35': '現在の時刻は 二時 まで 二十五分 です',
    '01:40': '現在の時刻は 二時 まで 二十分 です',
    '01:45': '現在の時刻は 二時 まで 十五分 です',
    '01:50': '現在の時刻は 二時 まで 十分 です',
    '01:55': '現在の時刻は 二時 まで 五分 です',
    '02:00': '現在の時刻は 二時 です',
    '10:00': '現在の時刻は 十時 です',
    '12:00': '現在の時刻は 十二時 です',
    '12:30': '現在の時刻は 十二時 半 です',
    '17:05': '現在の時刻は 五時 五分 です',
    '20:26': '現在の時刻は 八時 二十五分 です',
    '07:30': '現在の時刻は 七時 半 です',
    '19:30': '現在の時刻は 七時 半 です',
  },
} satisfies GridConfig;
