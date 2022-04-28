import React from 'react';

import Spacer from 'components/common/Spacer';
import BoardEditor from 'components/board/BoardEditor';
import Responsive from 'components/common/Responsive';
import Header from 'components/common/Header';
import Outer from 'components/common/Outer';

const BoardWritePage = () => {
  return (
    <Outer>
      <Header />
      <Spacer />
      <Responsive>
        <BoardEditor />
      </Responsive>
    </Outer>
  );
};

export default BoardWritePage;
