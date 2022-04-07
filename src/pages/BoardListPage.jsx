import React from 'react';

import BoardList from 'components/board/BoardList';
import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Responsive from 'components/common/Responsive';
import BoardNav from 'components/board/BoardNav';

const BoardListPage = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Responsive>
        <BoardNav />
        <BoardList />
      </Responsive>
    </>
  );
};

export default BoardListPage;
