import React from 'react';
import styled from 'styled-components';
import { GithubOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <FooterOuter>
      <FooterInner>
        <p>Copyright ⓒ2022 Cheers. All rights reserved.</p>
        <div className="github-wrapper">
          <p>Github</p>
          <a href={'https://github.com/Cheers-Project'}>
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
  font-size: ${({ theme }) => theme.fontSize.md};
  background-color: #fff;
  text-align: center;
  line-height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media screen and (min-width: 768px) {
    max-width: 1024px;
    padding: 2rem 5rem;
    flex-direction: row;
    font-size: ${({ theme }) => theme.fontSize.lg};
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
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.lgTitle};
    }
  }
`;

export default Footer;
