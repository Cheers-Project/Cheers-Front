import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import MenuList from './MenuList';
import { checkLogin } from 'redux/modules/user';
import { toggleMenuModal } from 'redux/modules/modal';

const Header = () => {
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = useSelector(({ user }) => {
    const { isLoggedIn } = user;
    return isLoggedIn;
  });

  const menuModal = useSelector(({ modal }) => {
    return modal.menuModal;
  });

  const handleMenuModal = () => {
    dispatch(toggleMenuModal(!menuModal));
  };

  const onScroll = throttle(() => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, 400);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      window.addEventListener('scroll', onScroll);
    } else {
      setIsScrolled(true);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) dispatch(checkLogin());
  }, [dispatch]);

  return (
    <>
      <HeaderOuter isScrolled={isScrolled}>
        <HeaderInner>
          <Logo src="https://avatars.githubusercontent.com/u/81244738?v=4" />
          <MidNav isScrolled={isScrolled}>
            <Button>게시판</Button>
            <Button>모임</Button>
          </MidNav>
          <RightNav onClick={handleMenuModal}>
            <UserOutlined className="user-icon" />
          </RightNav>
          {menuModal && menuModal ? <MenuList isLoggedIn={isLoggedIn} /> : ''}
        </HeaderInner>
        {menuModal && <MunuListOuter onClick={handleMenuModal} />}
      </HeaderOuter>
    </>
  );
};

const MunuListOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: 200;
`;

const HeaderOuter = styled.div`
  background-color: ${({ isScrolled }) => {
    return isScrolled ? '#fff' : 'rgba(25,23,24, 0.5)';
  }};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: 0.1s linear;
`;

const HeaderInner = styled.header`
  position: relative;
  width: 100%;
  min-height: 11rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 2rem 2rem;
  @media screen and (min-width: 768px) {
    max-width: 1024px;
    padding: 2rem 5rem;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1280px;
    padding: 2rem 6rem;
  }
`;

const RightNav = styled.nav`
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 1.2rem;
  gap: 0.5rem;
  background-color: #c22d77;
  cursor: pointer;
  z-index: 300;
  * {
    pointer-events: none;
  }
  @media (min-width: 768px) {
    display: flex;
  }
  .user-icon {
    padding: 0.5rem;
    font-size: 2rem;
    color: #fff;
    border-radius: 50%;
    border: 1.5px solid #fff;
  }
`;

const Logo = styled.img`
  width: 7rem;
  border-radius: 50%;
`;

const MidNav = styled.nav`
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 1.2rem;
  gap: 3rem;
  cursor: pointer;
  color: ${({ isScrolled }) => {
    return isScrolled ? '#191718' : '#fff';
  }};
`;

const Button = styled.button`
  color: inherit;
  background-color: inherit;
  padding: 1rem;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  display: flex;
  flex-direction: column;
  &::after {
    transition: 0.2s;
    margin-top: 0.5rem;
    width: 0;
    content: '';
    height: 2px;
    background-color: #c22d77;
  }
  &:hover::after {
    width: 100%;
  }
`;

export default Header;
