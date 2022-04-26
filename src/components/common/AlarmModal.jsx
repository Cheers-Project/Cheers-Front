import React from 'react';
import styled from 'styled-components';

import ModalWrapper from 'components/common/ModalWrapper';

const AlarmModal = ({ children }) => {
  return (
    <ModalWrapper>
      <AlarmWrapper>{children}</AlarmWrapper>;
    </ModalWrapper>
  );
};

const AlarmWrapper = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1rem;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default AlarmModal;
