import { store } from '../store';

export function initFadeMode() {
  document.getElementById('fade')?.addEventListener('click', () => store.toggle('fade'));
}
