import React from 'react';

import Outer from 'components/common/Outer';
import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Responsive from 'components/common/Responsive';
import BoardDetail from 'components/board/BoardDetail';

const BoardDetailPage = () => {
  return (
    <Outer white>
      <Header />
      <Spacer />
      <Responsive>
        <BoardDetail />
      </Responsive>
    </Outer>
  );
};

export default BoardDetailPage;
