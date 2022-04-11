import React from 'react';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Responsive from 'components/common/Responsive';
import Banner from 'components/main/Banner';
import MainContent from 'components/main/MainContent';

const MainPage = () => {
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
