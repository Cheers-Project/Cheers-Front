import React from 'react';
import styled from 'styled-components';

import BoardBanner from 'assets/images/board-banner.jpeg';
import MeetBanner from 'assets/images/meet-banner.jpg';
import MeetingSlider from 'components/main/MeetingSlider';
import StyledButton from 'components/common/StyledButton';

const MainContent = () => {
  return (
    <MainTemplate>
      <MeetingSlider />
      <Outer>
        <Inner bg={MeetBanner}>
          <h3 className="sub-title">다양한 모임에 참여하세요.</h3>
          <StyledButton cherry responsive>
            모임
          </StyledButton>
        </Inner>
        <Inner bg={BoardBanner}>
          <h3 className="sub-title">술에 대해 이야기하세요.</h3>
          <StyledButton cherry responsive>
            게시판
          </StyledButton>
        </Inner>
      </Outer>
    </MainTemplate>
  );
};

const MainTemplate = styled.main`
  padding: 3rem 0;
`;

const Outer = styled.div`
  margin: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }

  .sub-title {
    margin-bottom: 2rem;
    font-size: ${({ theme }) => theme.fontSize.smTitle};
    font-weight: 600;
    color: #fff;

    position: relative;
  }
`;

const Inner = styled.section`
  flex: 1 1 0%;
  padding: 2.5rem;
  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;

  min-height: 35rem;

  background-image: ${({ bg }) => `url(${bg})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

export default MainContent;
