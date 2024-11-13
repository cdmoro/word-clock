import json

# Cargar y ordenar las keys de segundo nivel en el archivo translations.json
def load_and_sort_translations(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        languages = json.load(file)
    
    # Ordenar las keys de segundo nivel en cada idioma
    sorted_languages = {lang: dict(sorted(keys.items())) for lang, keys in languages.items()}
    
    # Guardar el archivo ordenado
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(sorted_languages, file, ensure_ascii=False, indent=2)
    
    return sorted_languages

def check_keys_consistency(languages):
    base_keys = set(languages[next(iter(languages))].keys())

    for lang, keys in languages.items():
        current_keys = set(keys.keys())
        if base_keys != current_keys:
            missing_in_base = base_keys - current_keys
            missing_in_current = current_keys - base_keys
            print(f"Discrepancies found in {lang}:")
            if missing_in_base:
                print(f" - Missing keys in {lang}: {missing_in_base}")
            if missing_in_current:
                print(f" - Extra keys in {lang}: {missing_in_current}")
        else:
            print(f"All keys match in {lang}")

def generate_typescript_type(languages):
    subkeys = languages[next(iter(languages))].keys()

    ts_type = "export type Translations = {\n"
    for key in subkeys:
        key = f"'{key}'" if "-" in key else key
        ts_type += f"  {key}: string;\n"
    ts_type += "};\n"  # Ensure there is a final newline at the end

    with open('src/strings/types.ts', 'w', newline='\n', encoding='utf-8') as ts_file:
        ts_file.write(ts_type)

    print("TypeScript type generated successfully in 'src/strings/types.ts'.")

# Ruta del archivo de traducciones
file_path = 'src/strings/translations.json'

# Cargar, ordenar y verificar consistencia
languages = load_and_sort_translations(file_path)
check_keys_consistency(languages)
generate_typescript_type(languages)
