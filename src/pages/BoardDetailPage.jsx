import React from 'react';

import Outer from 'components/common/Outer';
import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Responsive from 'components/common/Responsive';
import BoardDetail from 'components/board/BoardDetail';
import CommentList from 'components/comment/CommentList';

const BoardDetailPage = () => {
  return (
    <Outer white>
      <Header />
      <Spacer />
      <Responsive>
        <BoardDetail />
        <CommentList />
      </Responsive>
    </Outer>
  );
};

export default BoardDetailPage;
