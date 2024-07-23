import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import './Demo.css';

const Demo = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="form-page flex flex-col items-center justify-center p-4 relative">
            <div className="back-container flex items-center absolute top-4 left-4 cursor-pointer" onClick={handleBack}>
                <IoArrowBackOutline className="text-iconColor" size={16} />
                <span className="text-iconColor ml-2">Regresar</span>
            </div>

        </div>
    );
};

export default Demo;
