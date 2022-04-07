import React from 'react';
import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Outer from 'components/common/Outer';
import Responsive from 'components/common/Responsive';
import MeetingTemplate from 'components/meeting/MeetingTemplate';
import MeetingEditor from 'components/meeting/MeetingEditor';
import MeetingOption from 'components/meeting/MeetingOption';

const MeetingWritePage = () => {
  return (
    <Outer>
      <Header />
      <Spacer />
      <Responsive>
        <MeetingTemplate>
          <MeetingEditor />
          <MeetingOption />
        </MeetingTemplate>
      </Responsive>
    </Outer>
  );
};

export default MeetingWritePage;
