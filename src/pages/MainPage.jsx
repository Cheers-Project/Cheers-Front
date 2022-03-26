import React, { useEffect } from 'react';
import * as meetAPI from 'api/meet';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Responsive from 'components/common/Responsive';
import Banner from 'components/main/Banner';
import MainContent from 'components/main/MainContent';

const MainPage = () => {
  useEffect(() => {
    // 현재 디바이스의 경도, 위도를 가져옴
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude: lon, latitude: lat } = position.coords;
      meetAPI.searchAroundMeeting(lon, lat);
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
