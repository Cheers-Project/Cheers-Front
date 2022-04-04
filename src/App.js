import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BoardWritePage from 'pages/BoardWritePage';
import BoardListPage from 'pages/BoardListPage';
import KakaoPage from 'pages/KakaoPage';
import MyPage from 'pages/MyPage';
import RedirectPage from 'pages/RedirectPage';
import MainPage from 'pages/MainPage';
import MyMeeting from 'components/my/MyMeeting';
import MyBoard from 'components/my/MyBoard';
import MyInfo from 'components/my/MyInfo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board">
          <Route index element={<BoardListPage />} />
          <Route path="write" element={<BoardWritePage />} />
        </Route>
        <Route path="/oauth/kakao" element={<KakaoPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<MyInfo />} />
          <Route path="board" element={<MyBoard />} />
          <Route path="meeting" element={<MyMeeting />} />
        </Route>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
