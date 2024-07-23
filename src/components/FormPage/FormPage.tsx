import React, { useState, useRef } from 'react';
import './FormPage.css';
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const FormPage: React.FC = () => {
    const [showNameInput, setShowNameInput] = useState(false);
    const [name, setName] = useState("");
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowNameInput(true);
        setTimeout(() => {
            nameInputRef.current?.focus();
        }, 0);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim()) {
            navigate('/chat');
        }
    };

    return (
        <div className="form-page flex flex-col items-center justify-center p-4 relative">
            <div className="overlay1 absolute inset-0"></div>
            <div className="overlay2 absolute inset-0"></div>
            <div className="relative z-10 text-center">
                <h1 className="title mt-2">
                    Debuguea <span className="gradient-text">tu mente con la</span> IA.
                </h1>
                <p className="description mt-6 mb-6">
                    Nuestro chatbot de IA ofrece apoyo emocional para programadores, planteando<br />
                    preguntas y generando audio para ayudarte a manejar el estrés.
                </p>

                <div className="form-container">
                    <h2 className="form-title mb-2">Selecciona tu nivel de experiencia</h2>
                    <p className="form-subtitle mb-2">Nivel de experiencia</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="radio-label">
                                Junior
                                <input type="radio" name="experience" value="junior" onChange={handleRadioChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="radio-label">
                                Intermedio
                                <input type="radio" name="experience" value="intermediate" onChange={handleRadioChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="radio-label">
                                Senior
                                <input type="radio" name="experience" value="senior" onChange={handleRadioChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="radio-label">
                                No soy programador/a
                                <input type="radio" name="experience" value="not-programmer" onChange={handleRadioChange} />
                            </label>
                        </div>
                        {showNameInput && (
                            <div className="form-group">
                                <label className="form-subtitle" htmlFor="name">Tu nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="input"
                                    ref={nameInputRef}
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className={`submit-button mt-2 ${name.trim() ? 'active' : 'inactive'}`}
                            disabled={!name.trim()}
                        >
                            Siguiente
                        </button>
                    </form>
                </div>
                <div className="legal-container flex items-center">
                    <p className="legal-text">¿Tienes problemas serios? Consulta nuestro <a href="/DisclaimerPage" className="aviso">Aviso legal</a></p>
                    <FiArrowUpRight className="legal-icon" />
                </div>
            </div>
        </div>
    );
};

export default FormPage;
