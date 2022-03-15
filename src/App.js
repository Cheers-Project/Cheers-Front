import RegistPage from 'pages/RegistPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from 'pages/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/regist" element={<RegistPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
