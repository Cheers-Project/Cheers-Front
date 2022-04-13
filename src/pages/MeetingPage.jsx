import React from 'react';

import Outer from 'components/common/Outer';
import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Responsive from 'components/common/Responsive';

import MeetingList from 'components/meeting/MeetingList';
import MeetingNav from 'components/meeting/MeetingNav';

const MeetingPage = () => {
  return (
    <Outer>
      <Header />
      <Spacer />
      <Responsive>
        <MeetingNav />
        <MeetingList />
      </Responsive>
    </Outer>
  );
};

export default MeetingPage;
