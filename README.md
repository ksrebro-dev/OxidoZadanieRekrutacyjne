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
    git clone <adres_repozytorium>
    cd <nazwa_folderu>
    ```

2. **Zainstaluj zależności:**

    Użyj poniższego polecenia, aby zainstalować wymagane pakiety:

    ```bash
    npm install
    ```

3. **Skonfiguruj plik `.env`:**

    W katalogu głównym projektu stwórz plik `.env` i umieść w nim swój klucz API OpenAI:

    ```
    OPENAI_API_KEY=twój_klucz_api
    ```

    Jeśli nie masz jeszcze klucza, możesz go uzyskać, rejestrując się na [platformie OpenAI](https://platform.openai.com/).

4. **Uruchom aplikację:**

    Aby uruchomić aplikację, użyj poniższego polecenia:

    ```bash
    npm start
    ```

    Aplikacja poprosi Cię o podanie ścieżki do pliku z artykułem lub zaakceptowanie domyślnej ścieżki (`./tresc_artykulu.txt`).

## Jak działa aplikacja?

1. **Wczytanie artykułu:**
    Aplikacja pozwala na wczytanie pliku tekstowego, który zawiera artykuł, który chcemy przekształcić na HTML. Można to zrobić, podając ścieżkę do pliku lub korzystając z domyślnego pliku.

2. **Wysyłanie zapytania do OpenAI:**
    Po wczytaniu artykułu aplikacja przekazuje jego treść do OpenAI z odpowiednim zapytaniem. Celem jest wygenerowanie kodu HTML, który zawiera:
    - Strukturalne tagi HTML, takie jak nagłówki, akapity, listy.
    - Tag `<img>` w miejscach, gdzie można by umieścić obrazy. Wartości atrybutu `alt` tagów `<img>` będą zawierały dokładny opis, który może posłużyć do wygenerowania grafik.

3. **Zapisanie wygenerowanego HTML:**
    Po otrzymaniu odpowiedzi z OpenAI, kod HTML zostaje zapisany w pliku `artykul.html`.

## Przykład działania

1. Program zapyta o ścieżkę do pliku z artykułem.
2. Po wczytaniu pliku artykuł zostaje przekształcony na HTML i zapisany w pliku `artykul.html`.
3. Jeśli w artykule występują miejsca, w których OpenAI uznaje, że obrazki są pomocne, zostaną dodane tagi `<img src="image_placeholder.jpg" alt="[dokładny opis grafiki dla AI]" />` wraz z podpisami w tagu `<figcaption>`.

## Struktura projektu

- `index.js` – główny plik aplikacji, odpowiedzialny za wczytywanie pliku, komunikację z API OpenAI oraz zapis do pliku HTML.
- `.env` – plik z kluczem API OpenAI.
- `tresc_artykulu.txt` – przykładowy plik z artykułem do konwersji.
- `artykul.html` – wynikowy plik HTML wygenerowany przez aplikację.
  

