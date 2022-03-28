import React from 'react';
import styled from 'styled-components';
import { GithubOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <FooterOuter>
      <FooterInner>
        <p>Copyright ⓒ2022 CherryAlcohol. All rights reserved.</p>
        <div className="github-wrapper">
          <p>Github</p>
          <a href={'https://github.com/LemonAlcohol'}>
            <GithubOutlined className="git-logo" />
          </a>
        </div>
      </FooterInner>
    </FooterOuter>
  );
};
const FooterOuter = styled.div`
  left: 0;
  right: 0;
  background-color: #fff;
`;

const FooterInner = styled.footer`
  width: 100%;
  padding: 2rem 2rem;
  margin: 0 auto;
  font-size: 1.5rem;
  background-color: #fff;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  display: flex;

  @media screen and (min-width: 768px) {
    max-width: 1024px;
    padding: 2rem 5rem;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1280px;
    padding: 2rem 6rem;
  }

  .github-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .git-logo {
    font-size: 3rem;
  }
`;

export default Footer;
