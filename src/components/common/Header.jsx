import React from 'react';
import styled from 'styled-components';

import useModal from 'hooks/useModal';

import LoginModal from 'components/login/LoginModal';
import Menu from './Menu';

const Header = () => {
  const [modalState, handleModal] = useModal();

  return (
    <HeaderWrapper>
      <Logo src="https://avatars.githubusercontent.com/u/81244738?v=4" />
      <RightNav>
        <Button onClick={handleModal}>로그인</Button>
      </RightNav>
      <Menu />
      {modalState && (
        <LoginModal modalState={modalState} handleModal={handleModal} />
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem 2.5rem;
  @media screen and (min-width: 768px) {
    padding: 2rem 5rem;
  }

  @media screen and (min-width: 1024px) {
    padding: 2rem 6rem;
  }
`;

const RightNav = styled.nav`
  gap: 1.5rem;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Logo = styled.img`
  width: 7rem;
  border-radius: 50%;
`;

const Button = styled.button`
  background-color: #fff;
  padding: 1rem;
  border: 2px solid #fff47d;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
`;

export default Header;
