import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

let openai: any;

// Función para establecer la API key
export const setApiKey = (apiKey: string): void => {
    openai = createOpenAI({
        apiKey: apiKey,
        compatibility: 'strict'
    });
};

// Función asincrónica para generar texto
export const generateTextAsync = async (prompt: string, apiKey: string): Promise<string> => {
    setApiKey(apiKey);
    const model = openai('gpt-3.5-turbo');
    const newPrompt = "Por favor, formatea este texto para que se envíe sin caracteres especiales y deje los signos de puntuación. Los textos son en español. Envía los acentos y tildes y demás elementos que ayuden a una lectura más fluida del texto. Intenta un máximo de 100 palabras por respuesta. Siempre termina con una pregunta. No abrumes al usuario con tanta información. Habla de una cosa a la vez. Sé empático y amigable. Menciona el nombre del usuario de vez en cuando. Usa estrategias para generar rapport" + prompt;
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
