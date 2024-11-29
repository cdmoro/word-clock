import { store } from '../../store';
import { drawFlexGrid } from './types/flex';
import { drawGrid } from './types/grid';

export function initGrid() {
  if (store.get('flex')) {
    drawFlexGrid();
  } else {
    drawGrid();
  }
}
