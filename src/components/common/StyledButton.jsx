import React from 'react';
import styled from 'styled-components';

const StyledButton = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

const Button = styled.button`
  width: 5rem;
  font-size: 1.3rem;
  padding: 1rem 0;
  color: #fff;
  border-radius: 0.5rem;
  transition: 0.2s background-color;
  background-color: ${({ color, theme }) =>
    color ? theme.lightCherry : '#ccc'};
  &:hover {
    background-color: ${({ color, theme }) =>
      color ? theme.darkCherry : '#aaa'};
  }
  @media screen and (min-width: 768px) {
    width: 8rem;
    font-size: 1.5rem;
  }
`;

export default StyledButton;
