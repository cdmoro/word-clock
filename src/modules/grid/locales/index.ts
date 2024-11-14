import { Locale, LocaleGridConfig } from '../../../types';
import deDE from './de-DE';
import elGR from './el-GR';
import enUS from './en-US';
import esES from './es-ES';
import frFR from './fr-FR';
import itIT from './it-IT';
import nlNL from './nl-NL';
import ptPT from './pt-PT';

const LOCALE_CONFIG: Record<Locale, LocaleGridConfig> = {
  'en-US': enUS,
  'es-ES': esES,
  'it-IT': itIT,
  'fr-FR': frFR,
  'pt-PT': ptPT,
  'el-GR': elGR,
  'de-DE': deDE,
  'nl-NL': nlNL,
};

export function getLocaleConfig(locale: Locale) {
  return LOCALE_CONFIG[locale];
}
