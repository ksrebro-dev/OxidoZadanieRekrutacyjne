const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Tworzy interfejs readline do pobierania danych od użytkownika
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Zamyka interfejs readline.
 */
const closerl = () => {
    rl.close();
};

/**
 * Zapisuje wygenerowaną zawartość do pliku HTML.
 *
 * @async
 * @function
 * @param {string} filePath - Ścieżka do pliku, do którego ma być zapisana zawartość.
 * @param {string} content - Zawartość, która ma być zapisana w pliku.
 * @returns {Promise<void>} - Zwraca Promise, który zostanie rozwiązany po zapisaniu pliku.
 */
const saveToHtmlFile = async (filePath, content) => {
    await fs.promises.writeFile(filePath, content, 'utf-8'); 
    console.log(`Plik został zapisany jako ${filePath}`);
};

/**
 * Pyta użytkownika o ścieżkę do pliku lub używa domyślnego pliku.
 *
 * @function
 * @returns {Promise<string|null>} - Obiekt Promise, który zwraca ścieżkę do pliku lub `null`, jeśli ścieżka jest nieprawidłowa.
 */
const askForFilePath = () => {
    return new Promise((resolve) => {
        rl.question('Podaj pełną ścieżkę do pliku z artykułem lub wpisz 1 żeby użyć domyślnego pliku: ', (input) => {
            if (input == '1') {
                resolve(path.resolve(__dirname, '../../tresc_artykulu.txt'));
            }
            else if (fs.existsSync(input) && fs.lstatSync(input).isFile() && input.endsWith('.txt')) {
                resolve(input);
            } else {
                console.log("Błąd: Nie znaleziono pliku w podanej ścieżce. Spróbuj ponownie.");
                resolve(null);
            }
        });
    });
};

/**
 * Wczytuje zawartość artykułu z pliku.
 *
 * @function
 * @param {string} filePath - Ścieżka do pliku z artykułem.
 * @returns {string|null} - Zwraca zawartość pliku jako string lub `null`, jeśli wystąpił błąd.
 */
const readArticle = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Nie udało się wczytać pliku. Sprawdź ścieżkę i spróbuj ponownie.");
        return null;
    }
};

// Eksportowanie funkcji, aby mogły być używane w innych plikach
module.exports = {
    saveToHtmlFile,
    askForFilePath,
    readArticle,
    closerl
};
