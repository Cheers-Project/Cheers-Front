import RegistPage from 'pages/RegistPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/regist" element={<RegistPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
