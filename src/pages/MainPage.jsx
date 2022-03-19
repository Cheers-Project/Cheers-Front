import React from 'react';
import styled from 'styled-components';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

const MainPage = () => {
  return (
    <MainTemplate>
      <Header />
      <div style={{ fontSize: '100px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ullam
        modi, quae nemo quidem ratione est quisquam? Placeat, ab enim!
        Doloremque saepe adipisci id, unde commodi pariatur aliquam iste
        facilis!
      </div>
      <Footer />
    </MainTemplate>
  );
};

const MainTemplate = styled.div`
  width: 100%;
`;

export default MainPage;
