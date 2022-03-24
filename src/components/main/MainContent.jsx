import React from 'react';
import styled from 'styled-components';

import BoardBanner from 'assets/images/board-banner.jpeg';
import MeetBanner from 'assets/images/meet-banner.jpg';
import MeetSlider from 'components/main/MeetSlider';

const MainContent = () => {
  return (
    <MainTemplate>
      <MeetSlider />
      <Outer>
        <Inner bg={MeetBanner}>
          <h3 className="sub-title">다양한 모임에 참여하세요.</h3>
          <button className="nav-btn">모임</button>
        </Inner>
        <Inner bg={BoardBanner}>
          <h3 className="sub-title">술에 대해 이야기하세요.</h3>
          <button className="nav-btn">게시판</button>
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
    font-size: 2rem;
    font-weight: 600;
    color: #fff;

    position: relative;
  }

  .nav-btn {
    padding: 1.2rem 2rem;
    border-radius: 0.5rem;
    background-color: #c22d77;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.2rem;
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
