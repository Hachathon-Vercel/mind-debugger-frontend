import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import './Chat.css';
import sendIcon from '../../assets/images/send-icon.svg';
import AudioPlayer from '../Audio/AudioPlayer';

const Chat = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="bg flex flex-col items-center justify-center p-4 relative min-h-screen">
            <div className="back-container flex items-center absolute top-4 left-4 cursor-pointer" onClick={handleBack}>
                <IoArrowBackOutline className="text-iconColor" size={16} />
                <span className="text-iconColor ml-2">Regresar</span>
            </div>
            <div className="line-container">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className="chat-container-wrapper">
                <div className="chat-container bg-darkBackground p-4 rounded-md shadow-md w-full">
                    <h2 className="text-white text-xl mb-4 box-title">Debugger Chat</h2>
                    <div className="message-container flex flex-col space-y-4">
                        <div className="message received">¡Hola Usuario! ¿Cómo te sientes?</div>

                        <div className="message sent">No muy bien.</div>
                        <div className="audio-message received">
                            <AudioPlayer src={require('../../assets/audios/sample.mp3').default} />
                        </div>
                        <div className="message sent">Entiendo. ¿Cómo hago eso?</div>
                    </div>
                    <div className="input-container mt-4 flex items-center">
                        <input type="text" placeholder="Escribe un mensaje ..." className="flex-grow p-2 rounded-md bg-inputBackground text-white" />
                        <button className="ml-2 p-2 text-white flex items-center justify-center">
                            <img src={sendIcon} alt="Send" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
