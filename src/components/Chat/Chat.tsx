import React, { useEffect, useRef, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import sendIcon from '../../assets/images/send-icon.svg';
import AudioPlayer from '../Audio/AudioPlayer';
import './Chat.css';
import sampleAudio from '../../assets/audios/sample.mp3';
import { userQuestion } from '../../services/questionService';
import { generateTextAsync } from '../../services/sdkOpenAI';
import { textToAudio } from '../../services/audioService';

interface Message {
  text?: string;
  type: 'received' | 'sent' | 'audio';
  url?: string;
}

const Chat: React.FC = () => {
  const location = useLocation();
  const userName = (location.state as { userName: string })?.userName || "Usuario";

  const [messages, setMessages] = useState<Message[]>([
    { text: `¡Hola ${userName}! Me alegra mucho verte hoy. ¿Cómo te estás sintiendo? ¿Cómo puedo ayudarte?`, type: 'received' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const selection = window.getSelection();
      if (selection && selection.type === 'Range') {
        return;
      }

      if (messageContainerRef.current && messageContainerRef.current.contains(event.target as Node)) {
        return;
      }

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


  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, type: 'sent' }]);
      setInputValue('');
      setIsTyping(true);

      try {
        const threadIdValue = localStorage.getItem('threadId') ?? '';
        const answer = await userQuestion(threadIdValue, inputValue);
        const formattedText = await generateTextAsync(answer);
        const { ok, audioUrl } = await textToAudio(formattedText);

        if (ok && audioUrl) {
          setMessages(prevMessages => [
            ...prevMessages,
            { type: 'audio', url: audioUrl }
          ]);
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: answer, type: 'received' }
          ]);
        }

        setIsTyping(false);
      } catch (error) {
        console.error('Error creating thread:', error);
        setIsTyping(false);
      }
    }
  };

  // const handleSend = async () => {
  //   if (inputValue.trim() !== '') {
  //     setMessages([...messages, { text: inputValue, type: 'sent' }]);
  //     setInputValue('');
  //     setIsTyping(true);

  //     setTimeout(() => {
  //       setMessages(prevMessages => [
  //         ...prevMessages,
  //         { type: 'audio', url: sampleAudio }
  //       ]);
  //       setIsTyping(false);
  //     }, 1000);
  //   }
  // };

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
          <div className="message-container flex flex-col space-y-4 mt-6 mb-6" ref={messageContainerRef}>
            {messages.map((message: Message, index: number) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === 'audio' ? (
                  <AudioPlayer
                    url={message.url as string}
                    currentPlaying={currentPlaying}
                    setCurrentPlaying={setCurrentPlaying}
                  />
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
