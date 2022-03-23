import React from 'react';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Responsive from 'components/common/Responsive';
import Banner from 'components/main/Banner';

const MainPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Responsive>{/* 메인 컨텐츠 영역 */}</Responsive>
      <Footer />
    </>
  );
};

export default MainPage;
