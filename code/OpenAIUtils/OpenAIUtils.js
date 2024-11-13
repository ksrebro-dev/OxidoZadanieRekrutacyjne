const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { saveToHtmlFile } = require('../FileUtils/FileUtils');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateHTMLForArticle = async (articleContent, output) => {
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
            max_tokens: 4000,
            temperature: 0.4,
        });
        await saveToHtmlFile( output, completion.choices[0].message.content);
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

module.exports = {
    generateHTMLForArticle
}