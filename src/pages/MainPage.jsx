import React, { useEffect } from 'react';
import axios from 'axios';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Responsive from 'components/common/Responsive';
import Banner from 'components/main/Banner';
import MainContent from 'components/main/MainContent';

const MainPage = () => {
  useEffect(() => {
    // 내 주변 모임 요청
    const searchAroundMeeting = async (lon, lat) => {
      const res = await axios.get(
        `http://localhost:4000/api/meeting/search?lon=${lon}&lat=${lat}`,
      );

      console.log(res);
    };

    // 현재 디바이스의 경도, 위도를 가져옴
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude: lon, latitude: lat } = position.coords;
      searchAroundMeeting(lon, lat);
    });
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <Responsive>
        {/* 메인 컨텐츠 영역 */}
        <MainContent />
      </Responsive>
      <Footer />
    </>
  );
};

export default MainPage;
