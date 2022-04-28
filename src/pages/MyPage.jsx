import React from 'react';
import styled from 'styled-components';

import Header from 'components/common/Header';
import Responsive from 'components/common/Responsive';
import Spacer from 'components/common/Spacer';
import SubMenu from 'components/my/SubMenu';
import Outer from 'components/common/Outer';

const MyPage = () => {
  return (
    <Outer>
      <Header />
      <Spacer />
      <Responsive>
        <Inner>
          <SubMenu />
        </Inner>
      </Responsive>
    </Outer>
  );
};

const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
`;

export default MyPage;
