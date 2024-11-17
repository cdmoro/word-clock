import { store } from '../store';

// Define the structure for grouped word data
interface WordData {
  text: string; // The accumulated text for the word
  isSecondary: boolean; // Whether the word is fully secondary
}

export function initFuzzy() {
  document.getElementById('fuzzy')?.addEventListener('click', () => store.toggle('fuzzy'));
}

export function generateFuzzyClockTime() {
  document.querySelector('#fuzzy-clock')!.textContent = '';

  // Select all active characters in the grid
  const activeChars = document.querySelectorAll<HTMLDivElement>('.char.active');

  // Create a map to group characters by their `data-word` attribute
  const words: Record<string, WordData> = {};

  // Iterate over each active character to group them by `data-word`
  activeChars.forEach((char) => {
    // Get the word index from the `data-word` attribute
    const wordIndex = char.getAttribute('data-word');
    if (wordIndex === null) return; // Skip if `data-word` is not present

    // Check if the character has specific classes
    const isSecondary = char.classList.contains('secondary');
    const isApostrophe = char.classList.contains('apostrophe');

    // Initialize the word data if it doesn't exist
    if (!words[wordIndex]) {
      words[wordIndex] = { text: '', isSecondary: true };
    }

    // Append the character to the word text, adding an apostrophe if applicable
    words[wordIndex].text += char.textContent || '';
    if (isApostrophe) {
      words[wordIndex].text += '’';
    }

    // Update `isSecondary` status based on the current character
    if (!isSecondary) {
      words[wordIndex].isSecondary = false;
    }
  });

  // Create a new `div` to hold the grouped words
  const wrapper = document.createElement('div');
  wrapper.classList.add('fuzzy-wrapper');

  // Iterate over the grouped words and construct the resulting HTML
  Object.values(words).forEach(({ text, isSecondary }) => {
    if (isSecondary) {
      // Wrap fully secondary words in a `span` with the class "secondary"
      const span = document.createElement('span');
      span.textContent = text;
      span.classList.add('secondary');
      wrapper.appendChild(span);
    } else if (text) {
      // Append neutral words as plain text
      wrapper.appendChild(document.createTextNode(text));
    }
    // Add a space between words
    wrapper.appendChild(document.createTextNode(' '));
  });

  // Append the constructed `div` to the document body or a specific container
  // document.body.appendChild(newDiv);
  document.querySelector('#fuzzy-clock')!.appendChild(wrapper);
}
