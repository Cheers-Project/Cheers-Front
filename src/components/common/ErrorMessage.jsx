import React from 'react';
import styled from 'styled-components';

const ErrorMessage = ({ children }) => {
  return <ErrorText>{children}</ErrorText>;
};

const ErrorText = styled.p`
  display: block;
  height: 2rem;
  padding-top: 0.5rem;
  color: red;
  line-height: 1.1rem;
`;

export default ErrorMessage;
