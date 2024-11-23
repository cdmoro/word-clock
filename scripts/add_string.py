import json
import subprocess
import time
from googletrans import Translator
from collections import OrderedDict

# Path to your JSON file
json_path = "src/strings/translations.json"

def translate_text(text, target_lang, retries=3, delay=1):
    """
    Translate text to the target language using googletrans-new with retries.
    """
    translator = Translator()
    for attempt in range(retries):
        try:
            # Use `dest` for specifying the target language
            translation = translator.translate(text, dest=target_lang)
            return translation.text
        except Exception as e:
            print(f"Error translating to {target_lang} (attempt {attempt + 1}): {e}")
            time.sleep(delay)  # Wait before retrying
    print(f"Failed to translate to {target_lang}. Using original text.")
    return text  # Return original text if all retries fail

def add_and_translate_key(new_key, english_text):
    """
    Add a new key to the JSON file and translate it to other languages.
    """
    # Load the JSON file
    with open(json_path, "r", encoding="utf-8") as file:
        translations = json.load(file)

    # Add English text to the en-US dictionary
    translations["en-US"][new_key] = english_text

    # Translate and add to other languages
    for lang_code in translations:
        if lang_code != "en-US":
            # Google Translate uses 2-letter codes, so we extract the first two characters
            translations[lang_code][new_key] = translate_text(
                english_text, lang_code[:2]
            )

    # Sort translations alphabetically by key
    sorted_translations = {
        lang: dict(OrderedDict(sorted(trans.items())))
        for lang, trans in translations.items()
    }

    # Write back to the JSON file
    with open(json_path, "w", encoding="utf-8") as file:
        json.dump(sorted_translations, file, ensure_ascii=False, indent=2)

    # Regenerate TypeScript types
    subprocess.run(["python", "scripts/generate_strings_type.py"])

new_key = input("Key: ").lower().replace(" ", "_")
english_text = input("Content: ")
add_and_translate_key(new_key, english_text)