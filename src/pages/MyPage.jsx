import React from 'react';

import Header from 'components/common/Header';
import Responsive from 'components/common/Responsive';
import Spacer from 'components/common/Spacer';
import SubMenu from 'components/my/SubMenu';

const MyPage = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Responsive>
        <SubMenu />
      </Responsive>
    </>
  );
};

export default MyPage;
