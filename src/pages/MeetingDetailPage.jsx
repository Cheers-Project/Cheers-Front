import React from 'react';

import Header from 'components/common/Header';
import Spacer from 'components/common/Spacer';
import Outer from 'components/common/Outer';
import Responsive from 'components/common/Responsive';
import MeetingDetail from 'components/meeting/MeetingDetail';

const MeetingDetailPage = () => {
  return (
    <Outer white>
      <Header />
      <Spacer />
      <Responsive>
        <MeetingDetail />
      </Responsive>
    </Outer>
  );
};

export default MeetingDetailPage;
