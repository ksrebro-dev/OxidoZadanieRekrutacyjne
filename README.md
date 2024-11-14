# OxidoZadanieRekrutacyjne
Projekt pozwala na połączenie się z OpenAI i przekonwertowanie teksu z pliku w odpowiedni sposób.
# Projekt: Konwersja artykułu na HTML przy użyciu OpenAI

Witaj! Ten projekt ma na celu stworzenie aplikacji w JavaScript, która wykorzystuje OpenAI API do konwersji tekstowego artykułu na sformatowany kod HTML. Aplikacja umożliwia:

1. Łączenie się z API OpenAI.
2. Wczytanie artykułu z pliku tekstowego.
3. Przekazanie artykułu do OpenAI z odpowiednim zapytaniem, by wygenerować kod HTML.
4. Zapisanie wygenerowanego kodu HTML do pliku `artykul.html`.

## Wymagania

Aby uruchomić aplikację, potrzebujesz:

- Node.js (w wersji 16 lub wyższej)
- Klucza API do OpenAI (więcej o tym poniżej)

## Instalacja

1. **Sklonuj repozytorium na swój komputer:**

    ```bash
    git clone https://github.com/ksrebro-dev/OxidoZadanieRekrutacyjne.git
    cd OxidoZadanieRekrutacyjne
    ```

2. **Zainstaluj zależności:**

    Użyj poniższego polecenia, aby zainstalować wymagane pakiety:

    ```bash
    npm install
    ```

3. **Skonfiguruj plik `.env`:**

    W katalogu głównym projektu (`OxidoZadanieRekrutacyjne`) stwórz plik `.env` i umieść w nim swój klucz API OpenAI:

    ```
    OPENAI_API_KEY=twój_klucz_api
    ```


4. **Uruchom aplikację:**

    Aby uruchomić aplikację, użyj poniższego polecenia:

    ```bash
    npm start
    ```
    Wpisanie numeru `1` spowoduje zaakceptowanie domyślego pliku z tekstem, bądź można samodzielnie wprowadzić własną ścieżkę do pliku.


   Plik z artykułem zostanie zapisany w folderze `OxidoZadanieRekrutacyjne/html/artykul.html`.

## Jak działa aplikacja?

1. **Wczytanie artykułu:**
    Aplikacja pozwala na wczytanie pliku tekstowego, który zawiera artykuł, który chcemy przekształcić na HTML. Można to zrobić, podając ścieżkę do pliku lub korzystając z domyślnego pliku.

2. **Wysyłanie zapytania do OpenAI:**
    Po wczytaniu artykułu aplikacja przekazuje jego treść do OpenAI z odpowiednim promptem. Celem jest wygenerowanie kodu HTML, który zawiera:
    - Strukturalne tagi HTML, takie jak nagłówki, akapity, listy.
    - Tag `<img>` w miejscach, gdzie można by umieścić obrazy. Wartości atrybutu `alt` tagów `<img>` będą zawierały dokładny opis, który może posłużyć do wygenerowania grafik.

3. **Zapisanie wygenerowanego HTML:**
    Po otrzymaniu odpowiedzi z OpenAI, kod HTML zostaje zapisany w pliku `OxidoZadanieRekrutacyjne/html/artykul.html`.
## Szablon i podgląd
W ramach wykonanego zadania został stworzony szablon, któy jest gotowy do wklejenia zawartości wygenerowanego dokumentu do `body`. Istnieje również plik `podglad.html`, który zawiera style i zawartość wygenerowaną przez AI.
Ścieżka to: `OxidoZadanieRekrutacyjne/html/`.

# Struktura projektu

OxidoZadanieRekrutacyjne
├── code  
│   ├── ObslugaOpenAI  
│   │   └── ObslugaOpenAI.js  
│   ├── ObslugaPlikow  
│   │   └── ObslugaPlikow.js  
│   └── main.js  
├── html  
│   ├── artykul.html  
│   ├── podglad.html  
│   └── szablon.html  
├── .env  
├── package.json  
├── README.md  
└── tresc_artykulu.txt  

### Wyjaśnienie:
- `OxidoZadanieRekrutacyjne` - Główny folder projektu.
- `code` - Zawiera kod źródłowy, podzielony na moduły:
  - `ObslugaOpenAI` - Moduł obsługi OpenAI.
  - `ObslugaPlikow` - Moduł obsługi plików.
  - `main.js` - Główny plik programu.
- `html` - Folder z szablonami i wygenerowanymi plikami HTML.
- `.env` - Plik konfiguracyjny z kluczami API. (należy go dodać samodzielnie i dodać klucz API - opisane powyżej)
- `package.json` - Pliki zarządzające zależnościami projektu.
- `README.md` - Dokumentacja projektu.
- `tresc_artykulu.txt` - Plik z treścią artykułu.

