import React, { useState, useRef } from 'react';
import './FormPage.css';
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createThread } from '../../services/assistantThread';
import { userQuestion } from '../../services/questionService';

const FormPage: React.FC = () => {
    const [showNameInput, setShowNameInput] = useState(false);
    const [name, setName] = useState("");
    const [experience, setExperience] = useState("");
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExperience(e.target.value);
        setShowNameInput(true);
        setTimeout(() => {
            nameInputRef.current?.focus();
        }, 0);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim()) {
            navigate('/chat', { state: { userName: name.trim() } });
        }
        // Llama a la función createThread para crear un nuevo thread
        const threadId = await createThread();
        console.log('Thread created with ID:', threadId);
        localStorage.setItem('threadId', threadId);
        localStorage.setItem('name', name);
        localStorage.setItem('experience', experience);
        const userName = name;
        const userExperience = experience;
        const presentationMessage = `Hola, me llamo ${userName} y soy ${userExperience}`;

        // Send the presentation message
        const answer = await userQuestion(threadId, presentationMessage);
        console.log(answer);

    };

    return (
        <div className="form-page flex flex-col items-center justify-center p-4 relative">
            <div className="overlay1 absolute inset-0"></div>
            <div className="overlay2 absolute inset-0"></div>
            <div className="relative z-10 text-center">
                <h1 className="title">
                    Debuguea <span className="gradient-text">tu mente con la</span> IA.
                </h1>
                <p className="description mt-4 mb-4">
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
                    <p className="legal-text">¿Tienes problemas serios? Consulta nuestro <a href="/disclaimer" className="aviso">Aviso legal</a></p>
                    <Link to="/disclaimer" className="legal-icon">
                        <FiArrowUpRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FormPage;
