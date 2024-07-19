import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import FormPage from './components/FormPage/FormPage';
import DisclaimerPage from './components/DisclaimerPage/DisclaimerPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/disclaimerPage" element={<DisclaimerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
