import React from 'react';
import styled from 'styled-components';

const Spinner = (props) => {
  return (
    <SpinnerWrapper>
      <Dot {...props} className="bounce1"></Dot>
      <Dot {...props} className="bounce2"></Dot>
      <Dot {...props} className="bounce3"></Dot>
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  gap: 2rem;
  .bounce1 {
    animation-delay: -0.32s;
  }
  .bounce2 {
    animation-delay: -0.16s;
  }
`;

const Dot = styled.div`
  width: ${(props) => (props.small ? '0.8rem' : '1.5rem')};
  height: ${(props) => (props.small ? '0.8rem' : '1.5rem')};
  background-color: #333;
  border-radius: 100%;
  display: inline-block;
  animation: bounce 1.2s infinite ease-in-out both;
  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

export default Spinner;
