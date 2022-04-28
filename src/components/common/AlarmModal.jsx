import React from 'react';
import styled from 'styled-components';

import ModalOverlay from 'components/common/ModalOverlay';

const AlarmModal = ({ children }) => {
  return (
    <ModalOverlay>
      <AlarmWrapper>{children}</AlarmWrapper>;
    </ModalOverlay>
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
