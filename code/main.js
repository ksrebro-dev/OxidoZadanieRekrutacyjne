const { closerl, askForFilePath, readArticle } = require('./FileUtils/FileUtils');
const { generateHTMLForArticle} = require('./OpenAIUtils/OpenAIUtils');
const path = require('path');

async function main() {
  try {
    let filePath;
    // Pętla, która pyta użytkownika o poprawną ścieżkę do pliku, dopóki nie poda poprawnej
    while (true) {
      filePath = await askForFilePath();
      if (filePath) {
        break;
      }
    }

    // Wczytanie treści pliku
    const fileContent = readArticle(filePath);
    if (fileContent) {
      console.log("File content", fileContent);
      // Ścieżka wyjściowa dla pliku HTML
      const outputPath = path.resolve(__dirname, '../html/artykul.html');
      // Generowanie HTML z treści artykułu
      await generateHTMLForArticle(outputPath, fileContent );
    }
    closerl();
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}

main();
