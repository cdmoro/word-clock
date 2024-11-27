import json
import time
import subprocess
from googletrans import Translator

# Load the original JSON file
with open("src/strings/translations.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Prompt the user for the new locale code (e.g., 'el-GR') and its name in English (e.g., 'Greek')
new_locale = input("Enter the new main locale code (e.g., el-GR): ").strip()
locale_name_english = input(f"Enter the language name in English for '{new_locale}' (e.g., 'Greek'): ").strip()

# Initialize the translator
translator = Translator()

# Translate the locale name from English to the new locale's language
try:
    translation = translator.translate(locale_name_english, dest=new_locale.split('-')[0])
    new_locale_name = translation.text
    print(f"Translated '{locale_name_english}' to '{new_locale_name}' for '{new_locale}'.")
except Exception as e:
    print(f"Error translating locale name: {e}")
    new_locale_name = locale_name_english

# Define a list of keys to copy directly instead of translating
manual_copy_keys = ["document_title"]

# Add the locale name key with parentheses as requested
new_locale_entry = f"{new_locale_name} ({new_locale})"

# Dictionary for new locale translations
new_translations = {}

# Translate or copy each key from 'en-US' into the new locale
for key, text in data['en-US'].items():
    if key == new_locale:  # Avoid self-reference
        continue
    if key in data:  # If it's a main locale key, copy directly
        new_translations[key] = text
        print(f"Copied locale key '{key}': '{text}'")
    elif key in manual_copy_keys:
        new_translations[key] = text
        print(f"Copied '{key}': '{text}' (manual copy)")
    else:
        try:
            translation = translator.translate(text, dest=new_locale.split('-')[0])
            new_translations[key] = translation.text
            print(f"Translated '{text}' -> '{translation.text}'")
            time.sleep(0.5)  # Throttle requests to avoid rate limits
        except Exception as e:
            print(f"Error translating '{text}': {e}")
            new_translations[key] = text  # Fallback to original text if error

# Add the translated locale name entry
new_translations[new_locale] = new_locale_entry

# Insert the new locale translations into all other locales
for locale in data:
    if locale != new_locale:  # Avoid adding to itself
        data[locale][new_locale] = new_locale_entry
        print(f"Added '{new_locale}': '{new_locale_entry}' to '{locale}'")

# Insert the new locale translations into the data
data[new_locale] = new_translations

# Sort all keys alphabetically in each locale
for locale in data:
    data[locale] = dict(sorted(data[locale].items()))

# Save updated JSON data back to file
with open("src/strings/translations.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

subprocess.run(["python", "scripts/generate_strings_type.py"])

print(f"Translations for {new_locale} added and sorted alphabetically in src/strings/translations.json.")
