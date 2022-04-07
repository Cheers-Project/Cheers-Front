import React from 'react';
import styled from 'styled-components';

const Outer = ({ children }) => {
  return <OuterWrapper>{children}</OuterWrapper>;
};

const OuterWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default Outer;
