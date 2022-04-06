import React from 'react';
import styled from 'styled-components';

import MeetingCalendar from 'components/meeting/MeetingCalendar';
import MemberCounter from 'components/meeting/MemberCounter';

const MeetingOption = () => {
  return (
    <OptionWrapper>
      <MeetingCalendar />
      <MemberCounter />
    </OptionWrapper>
  );
};

const OptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export default MeetingOption;
