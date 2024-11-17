import { store } from '../store';

interface WordData {
  text: string;
  isSecondary: boolean;
}

export function initFuzzy() {
  document.getElementById('fuzzy')?.addEventListener('click', () => store.toggle('fuzzy'));
}

export function generateFuzzyClockTime() {
  document.querySelector('#fuzzy-clock')!.textContent = '';

  const words: Record<string, WordData> = {};
  const activeChars = document.querySelectorAll<HTMLDivElement>('.char.active');

  activeChars.forEach((char) => {
    const wordIndex = char.getAttribute('data-word');
    if (wordIndex === null) return;

    const isSecondary = char.classList.contains('secondary');
    const isApostrophe = char.classList.contains('apostrophe');

    if (!words[wordIndex]) {
      words[wordIndex] = { text: '', isSecondary: true };
    }

    words[wordIndex].text += char.textContent || '';
    if (isApostrophe) {
      words[wordIndex].text += '’';
    }

    if (!isSecondary) {
      words[wordIndex].isSecondary = false;
    }
  });

  const content: string[] = [];

  Object.values(words).forEach(({ text, isSecondary }) =>
    content.push(isSecondary ? `<span class="secondary">${text}</span>` : text),
  );

  document.querySelector('#fuzzy-clock')!.innerHTML = `<div class="fuzzy-wrapper">${content.join(' ')}</div>`;
}
