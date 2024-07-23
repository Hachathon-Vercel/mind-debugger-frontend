import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import './Disclaimer.css';

const Disclaimer = () => {
    const handleBack = () => {
        window.history.back();
    };

    const disclaimerText = [
        "Este sitio web ofrece apoyo emocional mediante inteligencia artificial dirigido a",
        "programadores. Es importante destacar que los consejos y recomendaciones",
        "proporcionados no sustituyen la asesoría profesional de un psicólogo, terapeuta o",
        "cualquier otro profesional de la salud mental. Si experimentas problemas graves o",
        "persistentes, te recomendamos buscar ayuda profesional. El uso de este sitio implica la",
        "aceptación de estos términos."
    ];

    return (
        <div className="form-page flex flex-col items-center justify-center p-4 relative">
            <div className="overlay1 absolute inset-0"></div>
            <div className="overlay2 absolute inset-0"></div>
            <div className="back-container flex items-center absolute top-4 left-4 cursor-pointer" onClick={handleBack}>
                <IoArrowBackOutline className="text-iconColor" size={16} />
                <span className="text-iconColor ml-2">Regresar</span>
            </div>
            <div className="relative z-10 text-center">
                <h1 className="title mt-2 mx-4">
                    <span className="gradient-text">Aviso</span> legal.
                </h1>
                <div className="description mt-3 mb-6 mx-4">
                    {disclaimerText.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
