import { store } from '../store';

export function initFocus() {
  document.getElementById('focus')?.addEventListener('click', () => store.toggle('focus'));
}
