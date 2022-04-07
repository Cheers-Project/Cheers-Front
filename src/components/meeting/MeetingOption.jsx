import React from 'react';
import styled from 'styled-components';

import MeetingCalendar from 'components/meeting/MeetingCalendar';
import MemberCounter from 'components/meeting/MemberCounter';
import MeetingLocation from './MeetingLocation';

const MeetingOption = () => {
  return (
    <OptionWrapper>
      <MeetingCalendar />
      <MemberCounter />
      <MeetingLocation />
    </OptionWrapper>
  );
};

const OptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

export default MeetingOption;
