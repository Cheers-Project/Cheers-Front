import BoardDetail from 'components/board/BoardDetail';
import Header from 'components/common/Header';
import Responsive from 'components/common/Responsive';
import Spacer from 'components/common/Spacer';
import React from 'react';

const BoardDetailPage = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Responsive>
        <BoardDetail />
      </Responsive>
    </>
  );
};

export default BoardDetailPage;
