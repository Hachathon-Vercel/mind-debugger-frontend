// Función para enviar el audio al backend
export const textToAudio = async (text: string) => {
    try {
        const apiBase = process.env.REACT_APP_ENV_BASE;
        const resp = await fetch(`${apiBase}/audio-assistant/audio-assitant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        if (!resp.ok)
            throw new Error("No se pudo realizar la generación del audio");

        const audioFile = await resp.blob();
        const audioUrl = URL.createObjectURL(audioFile);

        console.log({ audioUrl });

        return { ok: true, audioUrl: audioUrl };

    } catch (error) {
        return {
            ok: false,
            message: "No se pudo realizar la generación del audio",
        };
    }
};
