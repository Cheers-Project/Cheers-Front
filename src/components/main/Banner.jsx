import React from 'react';
import styled from 'styled-components';

const Banner = () => {
  return (
    <BannerWrapper>
      <BannerText>
        다양한 사람들과 술에 대해 이야기하고 <br />
        새로운 모임에 참여해보세요.
      </BannerText>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  height: 100vh;
  padding-top: 20rem;
  background-image: url('https://images.unsplash.com/photo-1614118990889-4805ae35a01b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
`;

const BannerText = styled.p`
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.6;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }

  @media screen and (min-width: 1024px) {
    font-size: 3rem;
  }
`;

export default Banner;
