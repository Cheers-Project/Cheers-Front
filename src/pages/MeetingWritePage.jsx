import React from 'react';
import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Responsive from 'components/common/Responsive';
import MeetingTemplate from 'components/meeting/MeetingTemplate';
import MeetingEditor from 'components/meeting/MeetingEditor';
import MeetingOption from 'components/meeting/MeetingOption';

const MeetingWritePage = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Responsive>
        <MeetingTemplate>
          <MeetingEditor />
          <MeetingOption />
        </MeetingTemplate>
      </Responsive>
    </>
  );
};

export default MeetingWritePage;
