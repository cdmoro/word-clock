import { store } from '../store';

export function initMiniMode() {
  document.getElementById('mini')?.addEventListener('click', () => store.toggle('mini'));
}
