const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const  closerl = () => {
    rl.close();
}

const saveToHtmlFile = async ( filePath, content) => {
    await fs.promises.writeFile(filePath, content, 'utf-8'); // Zmieniono na promisy
    console.log(`Plik został zapisany jako ${filePath}`);
};

const askForFilePath = () => {
    return new Promise((resolve, reject) => {
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

const readArticle = (filePath) => {
    try {
        console.log(filePath);
        return fs.readFileSync(filePath, 'utf-8');

    } catch (error) {
        console.error("Nie udało się wczytać pliku. Sprawdź ścieżkę i spróbuj ponownie.");
        return null;
    }
};

// Eksport każdej funkcji osobno
module.exports = {
    saveToHtmlFile,
    askForFilePath,
    readArticle,
    closerl
};
