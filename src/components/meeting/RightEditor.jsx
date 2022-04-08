import React from 'react';
import styled from 'styled-components';

import MeetingCalendar from 'components/meeting/MeetingCalendar';
import MeetingLocation from 'components/meeting/MeetingLocation';

const RightEditor = () => {
  return (
    <RightEditorWrapper>
      <MeetingCalendar />
      <MeetingLocation />
    </RightEditorWrapper>
  );
};

const RightEditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex: 1;
`;

export default RightEditor;
