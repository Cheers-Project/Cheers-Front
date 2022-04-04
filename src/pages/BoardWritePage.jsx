import React from 'react';
import styled from 'styled-components';

import Spacer from 'components/common/Spacer';
import BoardEditor from 'components/board/BoardEditor';
import Responsive from 'components/common/Responsive';
import Header from 'components/common/Header';

const BoardWritePage = () => {
  return (
    <>
      <Header />
      <Spacer />
      {/* 게시물 작성 영역 */}
      <Responsive>
        <BoardEditor />
      </Responsive>
    </>
  );
};

const BoardWritePageWrapper = styled.div``;

export default BoardWritePage;
