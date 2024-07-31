import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import './Chat.css';
import sendIcon from '../../assets/images/send-icon.svg';
import AudioPlayer from '../Audio/AudioPlayer';

interface Message {
  text?: string;
  type: 'received' | 'sent' | 'audio';
  src?: string;
}

const Chat: React.FC = () => {
  const location = useLocation();
  const userName = (location.state as { userName: string })?.userName || "Usuario";

  const [messages, setMessages] = useState<Message[]>([
    { text: `¡Hola ${userName}! ¿Cómo te sientes?`, type: 'received' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, type: 'sent' }]);
      setInputValue('');
      setIsTyping(true);

      // Simula una respuesta de la IA después de un retraso
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'Respuesta del chat', type: 'received' }]);
        setIsTyping(false);
      }, 5000);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg flex flex-col items-center justify-center relative">
      <div className="back-container flex items-center absolute top-4 cursor-pointer" onClick={handleBack}>
        <IoArrowBackOutline className="text-iconColor" size={16} />
        <span className="text-iconColor ml-2">Regresar</span>
      </div>
      <div className="line-container">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="chat-container-wrapper">
        <div className="chat-container bg-darkBackground p-4 rounded-md shadow-md w-full relative">
          <h2 className="text-white mb-4 box-title">Debugger Chat</h2>
          <div className="message-container flex flex-col space-y-4 mt-6 mb-6">
            {messages.map((message: Message, index: number) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === 'audio' ? (
                  <AudioPlayer src={message.src as string} />
                ) : (
                  message.text
                )}
              </div>
            ))}
            {isTyping && (
              <div className="message received typing-indicator">
                <div className="typing">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Escribe un mensaje ..."
              className="flex-grow p-2 rounded-md bg-inputBackground"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="ml-2 p-2 text-white flex items-center justify-center hover-icon"
              onClick={handleSend}
            >
              <img src={sendIcon} alt="Send" className="w-8 h-8 mt-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
