const { closerl, askForFilePath, readArticle } = require('./ObslugaPlikow/ObslugaPlikow');
const { generateHTMLForArticle } = require('./ObslugaOpenAI/ObslugaOpenAI');
const path = require('path');

/**
 * Główna funkcja programu, która zarządza procesem:
 * - pobierania ścieżki do pliku z artykułem od użytkownika,
 * - wczytywania treści pliku,
 * - generowania kodu HTML na podstawie artykułu,
 * - zapisywania wygenerowanego HTML do pliku.
 * 
 * @async
 * @function
 * @returns {Promise<void>} - Zwraca Promise, który rozwiązuje się po zakończeniu całego procesu.
 * 
 * @description
 * Funkcja main() działa jako główny punkt wejścia do programu. Wykorzystuje pętlę do uzyskania poprawnej
 * ścieżki pliku od użytkownika, a następnie wczytuje treść artykułu, generuje na jej podstawie kod HTML 
 * przy użyciu API OpenAI i zapisuje wynikowy plik HTML. W przypadku błędów wyświetla stosowny komunikat.
 */
async function main() {
  try {
    let filePath;

    while (true) {
      filePath = await askForFilePath(); 
      if (filePath) {
        break; 
      }
    }

    const fileContent = readArticle(filePath);
    if (fileContent) {
      const outputPath = path.resolve(__dirname, '../html/artykul.html');
      await generateHTMLForArticle(fileContent, outputPath);
    }

    closerl();
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}

main();
