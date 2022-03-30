import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Responsive from 'components/common/Responsive';
import Banner from 'components/main/Banner';
import MainContent from 'components/main/MainContent';
import * as meetAPI from 'api/meet';
import * as userAPI from 'api/user';

const MainPage = () => {
  useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
  });

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
