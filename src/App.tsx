import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import FormPage from './components/FormPage/FormPage';
import ChatPage from './components/Chat/ChatPage';
import DisclaimerPage from './components/Disclaimer/DisclaimerPage';
import DemoPage from './components/Demo/DemoPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
