import React from 'react';
import styled from 'styled-components';

const RegistTemplate = ({ children }) => {
  return <RegistWrapper>{children}</RegistWrapper>;
};

const RegistWrapper = styled.div`
  height: 100vh;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export default RegistTemplate;
