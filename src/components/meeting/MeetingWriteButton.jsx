import React from 'react';
import styled from 'styled-components';

import StyledButton from 'components/common/StyledButton';

const MeetingWriteButton = () => {
  return (
    <ButtonWrapper>
      <StyledButton color="cherry">작성</StyledButton>
      <StyledButton>취소</StyledButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
  padding-bottom: 3rem;
`;

export default MeetingWriteButton;
