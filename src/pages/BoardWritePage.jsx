import React from 'react';

import Spacer from 'components/common/Spacer';
import BoardEditor from 'components/board/BoardEditor';
import Responsive from 'components/common/Responsive';
import Header from 'components/common/Header';

const BoardWritePage = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Responsive>
        <BoardEditor />
      </Responsive>
    </>
  );
};

export default BoardWritePage;
