import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import MenuList from './MenuList';
import { toggleModal } from 'redux/modules/modal';
import * as userAPI from 'api/user';

const Header = () => {
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);

  const menuModal = useSelector(({ modal }) => {
    return modal.menuModal;
  });

  const { data } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const handleMenuModal = () => {
    dispatch(toggleModal({ target: 'menuModal', visible: !menuModal }));
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
  return (
    <>
      <HeaderOuter isScrolled={isScrolled}>
        <HeaderInner>
          <Logo>
            <Link to={'/'}>
              Cherry
              <br /> Alcohol
            </Link>
          </Logo>
          <MidNav isScrolled={isScrolled}>
            <Link to={'/board?sort=recent&page=1'} className="mid-nav-btn">
              게시판
            </Link>
            <Link to={'/meeting?sort=recent'} className="mid-nav-btn">
              모임
            </Link>
          </MidNav>
          <RightNav onClick={handleMenuModal}>
            {data?.userInfo?.profileImg ? (
              <img
                src={data.userInfo.profileImg}
                alt="프로필이미지"
                className="profileImg"
              />
            ) : (
              <UserOutlined className="user-icon" />
            )}
          </RightNav>
          {menuModal && <MenuList userInfo={data?.userInfo} />}
        </HeaderInner>
        {menuModal && <MenuListOuter onClick={handleMenuModal} />}
      </HeaderOuter>
    </>
  );
};

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

const Logo = styled.h1`
  font-size: 2rem;
  color: #c22d77;
  font-weight: 600;
  letter-spacing: 0.2rem;
  cursor: pointer;
`;

const RightNav = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1.2rem;
  gap: 0.5rem;
  color: #fff;
  background-color: #c22d77;
  cursor: pointer;
  z-index: 300;
  font-size: 1.2rem;
  * {
    pointer-events: none;
  }
  @media (min-width: 768px) {
    display: flex;
  }
  .user-icon {
    padding: 0.5rem;
    font-size: 1.2rem;
    color: #fff;
    border-radius: 50%;
    border: 1.5px solid #fff;
    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
  }

  .profileImg {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

const MidNav = styled.nav`
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 1.2rem;
  gap: 0.5rem;
  color: ${({ isScrolled }) => {
    return isScrolled ? '#000' : '#fff';
  }};
  @media screen and (min-width: 768px) {
    gap: 10rem;
  }
  .mid-nav-btn {
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    &::after {
      display: block;
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
    @media screen and (min-width: 768px) {
      font-size: 1.6rem;
    }
  }
`;

const MenuListOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: 200;
`;

export default Header;
