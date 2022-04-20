import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

const Outer = ({ children, ...rest }) => {
  return <OuterWrapper {...rest}>{children}</OuterWrapper>;
};

const OuterWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ white }) =>
    white &&
    css`
      background-color: ${({ theme }) => theme.color.white};
    `}
`;

export default Outer;
