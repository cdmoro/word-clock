import { getClockMethods } from './types';

export function initGrid() {
  const { drawClock } = getClockMethods();
  drawClock();
}
