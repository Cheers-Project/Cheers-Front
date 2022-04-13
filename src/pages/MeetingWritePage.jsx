import React from 'react';

import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Outer from 'components/common/Outer';
import Responsive from 'components/common/Responsive';
import WriteTemplate from 'components/meeting/WriteTemplate';
import LeftEditor from 'components/meeting/LeftEditor';
import RightEditor from 'components/meeting/RightEditor';
import MeetingWriteButton from 'components/meeting/MeetingWriteButton';

const MeetingWritePage = () => {
  return (
    <Outer>
      <Header />
      <Spacer />
      <Responsive>
        <WriteTemplate>
          <LeftEditor />
          <RightEditor />
        </WriteTemplate>
        <MeetingWriteButton />
      </Responsive>
    </Outer>
  );
};

export default MeetingWritePage;
