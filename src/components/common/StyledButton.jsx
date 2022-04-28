import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledButton = (props) => {
  return props.to ? (
    <StyledLink
      {...props}
      cherry={props.cherry && 1}
      responsive={props.responsive && 1}
    />
  ) : (
    <Button
      {...props}
      cherry={props.cherry && 1}
      responsive={props.responsive && 1}
    />
  );
};

const buttonStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1.2rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #fff;
  line-height: 2rem;
  border-radius: 0.5rem;
  transition: 0.2s background-color;
  background-color: ${({ theme }) => theme.color.lightGray};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.darkGray};
  }

  ${(props) =>
    props.responsive &&
    css`
      @media screen and (min-width: 768px) {
        padding: 0.8rem 1.5rem;
        font-size: ${({ theme }) => theme.fontSize.md};
      }
    `}

  ${(props) =>
    props.cherry &&
    css`
      background-color: ${({ theme }) => theme.color.lightCherry};
      &:hover {
        background-color: ${({ theme }) => theme.color.darkCherry};
      }
    `}
`;

const Button = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

export default StyledButton;
