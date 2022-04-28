import React from 'react';
import styled from 'styled-components';

import banner from 'assets/images/banner.jpg';

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
  background-image: url(${banner});
`;

const BannerText = styled.p`
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 1.6;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
  }

  @media screen and (min-width: 1024px) {
    font-size: ${({ theme }) => theme.fontSize.lgTitle};
  }
`;

export default Banner;
