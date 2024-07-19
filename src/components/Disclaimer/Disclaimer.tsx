import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import './Disclaimer';

const Disclaimer = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="form-page flex flex-col items-center justify-center p-4 relative">
            <div className="overlay1 absolute inset-0"></div>
            <div className="overlay2 absolute inset-0"></div>
            <div className="relative z-10 text-center">
                <div className="absolute top-4 left-4 cursor-pointer" onClick={handleBack}>
                    <IoArrowBackOutline className="text-iconColor" size={24} />
                    <span className="text-iconColor ml-2">Regresar</span>
                </div>
                <h1 className="gradient-text title mt-2">
                    Aviso <span className="title">legal</span>
                </h1>
                <p className="text-paragraphColor text-sm font-light">
                    Este sitio web ofrece apoyo emocional mediante inteligencia artificial dirigido a
                    programadores y emprendedores. Es importante destacar que los consejos y
                    recomendaciones proporcionados no sustituyen la asesoría profesional de un psicólogo,
                    terapeuta o cualquier otro profesional de la salud mental. Si experimentas problemas
                    graves o persistentes, te recomendamos buscar ayuda profesional. El uso de este sitio
                    implica la aceptación de estos términos.
                </p>
            </div>
        </div>
    );
};

export default Disclaimer;
