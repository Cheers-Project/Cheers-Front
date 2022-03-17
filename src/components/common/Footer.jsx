import React from 'react';
import styled from 'styled-components';
import { GithubOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <FooterWrapper>
      <p>Copyright ⓒ2022 LemonAlcohol. All rights reserved.</p>
      <div>
        <a href={'https://github.com/LemonAlcohol'}>
          <GithubOutlined className="git-logo" />
        </a>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 2rem;
  font-size: 2rem;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .git-logo {
    font-size: 3rem;
  }
`;

export default Footer;
