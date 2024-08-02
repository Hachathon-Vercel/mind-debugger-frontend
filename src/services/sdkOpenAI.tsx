import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const openai = createOpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    compatibility: 'strict'
});

// Función asincrónica para generar texto
export const generateTextAsync = async (prompt: string): Promise<string> => {
    const model = openai('gpt-3.5-turbo');
    const newPrompt = "Por favor, formatea este texto para que se envie sin caracteres especiales y deje los signos de puntuación. Los textos son en español. Envia los acentos y tildes y demás elementos que ayuden a una lectura más fluida del texto." + prompt;
    try {
        const result = await generateText({
            model: model,
            prompt: newPrompt,
        });
        return result.text;
    } catch (error) {
        console.error('Error generando el texto:', error);
        throw error;
    }
};
