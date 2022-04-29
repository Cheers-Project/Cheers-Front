import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import MenuList from 'components/common/MenuList';
import { toggleModal } from 'redux/modules/modal';
import * as userAPI from 'api/user';

const Header = ({ black }) => {
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

  const handleMenuModalVisible = () => {
    dispatch(toggleModal({ target: 'menuModal', visible: !menuModal }));
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 200);
    if (window.scrollY > 20) {
      setIsScrolled(true);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <>
      <HeaderOuter black={black} isScrolled={isScrolled}>
        <HeaderInner isScrolled={isScrolled}>
          <Logo>
            <Link to={'/'}>Cheers</Link>
          </Logo>
          <MidNav isScrolled={isScrolled} black={black}>
            <div className="btn-wrapper">
              <Link to={'/board?sort=recent&page=1'} className="mid-nav-btn">
                게시판
              </Link>
              <div className="underline" />
            </div>
            <div className="btn-wrapper">
              <Link to={'/meeting?sort=recent'} className="mid-nav-btn">
                모임
              </Link>
              <div className="underline" />
            </div>
          </MidNav>
          <RightNav onClick={handleMenuModalVisible}>
            {data?.userInfo?.profileImg ? (
              <img
                src={data.userInfo.profileImg}
                alt="프로필이미지"
                className="profileImg"
              />
            ) : (
              <div className="user-wrapper">
                <UserOutlined className="user-icon" />
              </div>
            )}
          </RightNav>
          {menuModal && <MenuList userInfo={data?.userInfo} />}
        </HeaderInner>
        {menuModal && <MenuListOuter onClick={handleMenuModalVisible} />}
      </HeaderOuter>
    </>
  );
};

const HeaderOuter = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  ${({ black }) =>
    black &&
    css`
      background-color: rgba(25, 23, 24, 0.5);
    `};

  ${({ isScrolled, black }) =>
    black && isScrolled
      ? css`
          background-color: ${({ theme }) => theme.color.white};
        `
      : null};
  ${({ isScrolled }) =>
    isScrolled &&
    css`
      box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
    `};

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
  width: 30%;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.color.lightCherry};
  font-weight: 600;
  letter-spacing: 0.2rem;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
  }
  @media screen and (min-width: 1024px) {
    font-size: ${({ theme }) => theme.fontSize.lgTitle};
  }
`;

const MidNav = styled.nav`
  width: 40%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 1.2rem;
  gap: 0.5rem;
  color: #000;
  ${({ black }) =>
    black &&
    css`
      color: #fff;
    `}

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      color: #000;
    `}
  
  @media screen and (min-width: 768px) {
    gap: 10rem;
  }
  .btn-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
  }
  .mid-nav-btn {
    padding: 1rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 500;
    letter-spacing: 0.1rem;
    @keyframes fill {
      from {
        width: 0%;
      }
      to {
        width: calc(100% - 2rem);
      }
    }
    transition: 0.3s;
    &:hover + .underline {
      background-color: ${({ theme }) => theme.color.lightCherry};
      animation: fill 0.3s ease-in-out;
    }
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
  .underline {
    position: absolute;
    left: 1rem;
    bottom: 0;
    width: calc(100% - 2rem);
    height: 2px;
    background-color: inherit;
  }
`;

const RightNav = styled.nav`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 300;
  font-size: ${({ theme }) => theme.fontSize.xsm};
  * {
    pointer-events: none;
  }
  @media screen and (min-width: 768px) {
    padding: 0.5rem 1rem;
  }

  .user-wrapper {
    padding: 0.5rem;
    border-radius: 1rem;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.lightCherry};
  }

  .user-icon {
    padding: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.xsm};
    color: #fff;
    border-radius: 50%;
    border: 1.5px solid #fff;

    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.smTitle};
    }
  }

  .profileImg {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    @media screen and (min-width: 768px) {
      width: 3rem;
      height: 3rem;
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
