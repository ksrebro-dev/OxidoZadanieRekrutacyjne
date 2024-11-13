const fs = require('fs');
const readline = require('readline');
const { OpenAI } = require('openai');
require('dotenv').config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

readArticle = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error("Nie udało się wczytać pliku. Sprawdź ścieżkę i spróbuj ponownie.");
    return null;
  }
};

generateHTMLForArticle = async (articleContent, output) => {
  const prompt = `Przekonwertuj poniższy artykuł na kod HTML zawierający odpowiednią strukturę za pomocą nagłówków, paragrafów i list, jeśli to konieczne.
  Wstaw tagi <img src="image_placeholder.jpg" alt="[dokładny opis grafiki dla AI]" /> wszędzie tam, gdzie obrazki byłyby pomocne i pozwolą na większe zaangażowanie użytkownika. 
  Pod każdym tagiem <img> umieść podpis za pomocą tagu <figcaption>, opisujący treść obrazka. Pamiętaj:
  - Generuj wyłącznie zawartość między znacznikami <body> i </body>.
  - Nie dodawaj żadnych znaczników <html>, <head> ani <body>.
  - Stosuj właściwą hierarchię nagłówków i sekcje paragrafów, aby strukturyzować treść artykułu.

  Oto treść artykułu:
  ${articleContent}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },  // Twoje zapytanie
      ],
      max_tokens: 3000,
      temperature: 0.4,
    });
    await saveToHtmlFile(completion.choices[0].message.content, output);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      console.log(error);
    }
  }
};

saveToHtmlFile = async (content, filePath) => {
  await fs.promises.writeFile(filePath, content, 'utf-8'); // Zmieniono na promisy
  console.log(`Plik został zapisany jako ${filePath}`);
};

const askForFilePath = () => {
  return new Promise((resolve, reject) => {
    rl.question('Podaj pełną ścieżkę do pliku z artykułem lub wpisz 1 żeby użyć domyślnego pliku: ', (input) => {

    if (input == '1'){
        resolve('./tresc_artykulu.txt');
    }
    else if (fs.existsSync(input) && fs.lstatSync(input).isFile() && input.endsWith('.txt')) {
        resolve(input);
    } else {
        //console.log("Błąd: Nie znaleziono pliku w podanej ścieżce. Spróbuj ponownie.");
        resolve(null);
      }
    });
  });
};

// Główna funkcja wykonawcza
async function main() {
  try {
    let filePath;
    // Pętla, która pyta użytkownika o poprawną ścieżkę do pliku, dopóki nie poda poprawnej
    while (true) {
      filePath = await askForFilePath();
      //console.log(filePath, "tutaj")
      if (filePath) {
        break;
      }
    }

    // Wczytanie treści pliku
    const fileContent = readArticle(filePath);
    if (fileContent) {
      // Ścieżka wyjściowa dla pliku HTML
      const outputPath = 'artykul.html';
      // Generowanie HTML z treści artykułu
      await generateHTMLForArticle(fileContent, outputPath);
    }
    rl.close(); 
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}

main();
