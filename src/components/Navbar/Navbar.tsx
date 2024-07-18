import React, { useState } from 'react';
import './Navbar.module.css';
import logo from '../../assets/images/vercel-svg.svg';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black p-4 flex items-center justify-between">
            <div className="flex items-center pl-8">
                <img src={logo} alt="Mind Debugger Logo" className="h-6 w-6 mr-2 filter invert" />
                <span className="text-white text-2x1 font-semibold pt-2" style={{ fontFamily: 'Cal Sans' }}>Mind Debugger</span>
            </div>
            <div className="hidden md:flex space-x-6 justify-start flex-grow pl-8">
                <a href="/" className="text-gray-light hover:bg-gray-selection rounded-2xl px-2 py-1" style={{ fontFamily: 'Inter', fontSize: '16px' }}>Home</a>
                <a href="/demo" className="text-gray-light hover:bg-gray-selection rounded-2xl px-2 py-1" style={{ fontFamily: 'Inter', fontSize: '16px' }}>Demo</a>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-light hover:text-white transition duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden absolute top-16 right-0 bg-black w-full flex flex-col items-center space-y-2 py-4">
                    <a href="/" className="text-gray-light hover:bg-gray-selection hover:rounded-lg hover:transition hover:duration-300 hover:px-2 hover:py-1" style={{ fontFamily: 'Inter', fontSize: '16px' }}>Home</a>
                    <a href="/demo" className="text-gray-light hover:bg-gray-selection hover:rounded-lg hover:transition hover:duration-300 hover:px-2 hover:py-1" style={{ fontFamily: 'Inter', fontSize: '16px' }}>Demo</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
