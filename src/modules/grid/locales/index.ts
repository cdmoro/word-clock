import { ClockConfig, Locale } from '../../../types';
import svSE from './sv-SE';
import deDE from './de-DE';
import elGR from './el-GR';
import enUS from './en-US';
import esES from './es-ES';
import frFR from './fr-FR';
import itIT from './it-IT';
import nlNL from './nl-NL';
import ptPT from './pt-PT';
import noNO from './no-NO';
import csCZ from './cs-CZ';
import trTR from './tr-TR';
import roRO from './ro-RO';
import caES from './ca-ES';
import ruRU from './ru-RU';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import deCH from './de-CH';
import jaJP from './ja-JP';
import heIL from './he-IL';
import arAE from './ar-AE';

const LOCALE_CONFIG: Record<Locale, ClockConfig> = {
  'en-US': enUS,
  'es-ES': esES,
  'it-IT': itIT,
  'fr-FR': frFR,
  'pt-PT': ptPT,
  'el-GR': elGR,
  'de-DE': deDE,
  'nl-NL': nlNL,
  'sv-SE': svSE,
  'no-NO': noNO,
  'cs-CZ': csCZ,
  'tr-TR': trTR,
  'ro-RO': roRO,
  'ca-ES': caES,
  'ru-RU': ruRU,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'de-CH': deCH,
  'ja-JP': jaJP,
  'he-IL': heIL,
  'ar-AE': arAE,
};

export function getLocaleClockType(locale: Locale) {
  return LOCALE_CONFIG[locale].type;
}

export function getLocaleConfig(locale: Locale) {
  return LOCALE_CONFIG[locale];
}
