import { initStaticMode } from './static';
import { initClock } from './clock';
import { initFont } from './font';
import { initFullscreenMode } from './fullscreen';
import { initLocale } from './locales';
import { initTheme } from './themes';
import { initShowTimeMode } from './show-time';
import { initZenMode } from './zen';
import { initGrid } from './grid';
import { initFocus } from './focus';
import { initFuzzy } from './fuzzy';
import { initSolid } from './solid';
import { initMiniMode } from './mini';

const MODULES = [
  initStaticMode,
  initGrid,
  initClock,
  initFont,
  initFullscreenMode,
  initLocale,
  initShowTimeMode,
  initTheme,
  initZenMode,
  initFocus,
  initFuzzy,
  initSolid,
  initMiniMode,
];

export function initModules() {
  MODULES.forEach((module) => module());
}
