// Funcion para crear el threatd
export const createThread = async (apiKey: string): Promise<string> => {
    try {
        const apiBase = process.env.REACT_APP_ENV_BASE;
        console.log(apiKey, "apiKey: ")
        const response = await fetch(`${apiBase}/sam-assistant/create-thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ apiKey }),
        });

        if (!response.ok) {
            throw new Error(`Error creating thread: ${response.statusText}`);
        }

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Error creating thread:', error);
        throw error;
    }
};
