// Función para enviar la pregunta del usuario
export const userQuestion = async (threadId: string, question: string, apiKey: string): Promise<string> => {
    try {
        const apiBase = process.env.REACT_APP_ENV_BASE;
        const response = await fetch(`${apiBase}/sam-assistant/user-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ threadId, question, apiKey })
        });
        if (!response.ok) {
            throw new Error(`Error sending question: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data.text;
    } catch (error) {
        console.error('Error sending question:', error);
        throw error;
    }
};
