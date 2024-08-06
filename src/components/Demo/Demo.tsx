import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import './Demo.css';

const Demo: React.FC = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="bg">
            <div className="back-container flex items-center absolute top-4 left-4 cursor-pointer" onClick={handleBack}>
                <IoArrowBackOutline className="text-iconColor" size={24} />
                <span className="text-iconColor ml-2">Regresar</span>
            </div>
            <div className="line-container">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className="demo-chat-container-wrapper">
                <div className="demo-chat-container">
                    <div className="demo-video-responsive">
                        <video controls>
                            <source src="/videos/demoVideo.mp4" type="video/mp4" />
                            Tu navegador no soporta la reproducción de videos.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;

