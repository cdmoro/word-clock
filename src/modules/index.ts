import { initStaticMode } from './static';
import { initClock } from './clock';
import { initFadeMode } from './fade';
import { initFont } from './font';
import { initFullscreenMode } from './fullscreen';
import { initLocale } from './locales';
import { initScreensaverMode } from './screensaver';
import { initTheme } from './themes';
import { initShowTimeMode } from './show-time';
import { initZenMode } from './zen';
import { initGrid } from './grid';

const MODULES = [
  initStaticMode,
  initGrid,
  initClock,
  initFadeMode,
  initFont,
  initFullscreenMode,
  initLocale,
  initScreensaverMode,
  initShowTimeMode,
  initTheme,
  initZenMode,
];

export function initModules() {
  MODULES.forEach((module) => module());
}
