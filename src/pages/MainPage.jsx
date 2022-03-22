import React from 'react';
import styled from 'styled-components';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

const MainPage = () => {
  return (
    <MainTemplate>
      <Header />
      <Footer />
    </MainTemplate>
  );
};

const MainTemplate = styled.div`
  width: 100%;
`;

export default MainPage;
