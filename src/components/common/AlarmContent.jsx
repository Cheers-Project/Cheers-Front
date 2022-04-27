import React from 'react';
import styled from 'styled-components';

const AlarmContent = ({ error }) => {
  return (
    <NoticeWrapper>
      <p className="notice-text">{error}</p>
      <LoadingBar />
    </NoticeWrapper>
  );
};

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  .notice-text {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    text-align: center;
    padding-bottom: 2rem;
  }
`;

const LoadingBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.2rem;
  background-color: ${({ theme }) => theme.color.lightCherry};
  animation: fill 1s ease-in-out;
  @keyframes fill {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;

export default AlarmContent;
