import React from 'react';
import styled from 'styled-components';

const MeetingTemplate = ({ children }) => {
  return <MeetingWrapper>{children}</MeetingWrapper>;
};

const MeetingWrapper = styled.main`
  height: 100%;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export default MeetingTemplate;
