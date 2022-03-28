import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <Dot className="bounce1"></Dot>
      <Dot className="bounce2"></Dot>
      <Dot className="bounce3"></Dot>
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
  width: 1.5rem;
  height: 1.5rem;
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
