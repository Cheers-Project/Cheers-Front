import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import KakaoPage from 'pages/KakaoPage';
import RegistPage from 'pages/RegistPage';
import MainPage from 'pages/MainPage';

import RedirectPage from 'pages/RedirectPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/oauth/kakao" element={<KakaoPage />} />
        <Route path="/regist" element={<RegistPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
