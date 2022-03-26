import React from 'react';
import styled from 'styled-components';

import useModal from 'hooks/useModal';
import LoginModal from 'components/login/LoginModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/modules/user';

const MenuList = ({ isLoggedIn, menuModalState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginModalState, handleLoginModal, setLoginModalState] = useModal();
  const handleRegist = () => {
    navigate('/regist');
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <MenuListWrapper modalState={menuModalState}>
      {!isLoggedIn ? (
        <>
          <MenuItem onClick={handleLoginModal}>로그인</MenuItem>
          <MenuItem onClick={handleRegist}>회원가입</MenuItem>
        </>
      ) : (
        <>
          <MenuItem>마이페이지</MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </>
      )}
      {loginModalState && (
        <LoginModal
          loginModalState={loginModalState}
          handleLoginModal={handleLoginModal}
          setLoginModalState={setLoginModalState}
        />
      )}
    </MenuListWrapper>
  );
};

const MenuListWrapper = styled.ul`
  position: absolute;
  top: 8rem;
  right: 2rem;

  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid #c22d77;
  animation: dropdown 0.3s ease-in-out;

  z-index: 300;

  @media screen and (min-width: 768px) {
    right: 5rem;
  }

  @media screen and (min-width: 1024px) {
    right: 6rem;
  }

  @keyframes dropdown {
    from {
      transform: translateY(-50%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const MenuItem = styled.li`
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  cursor: pointer;
`;

export default MenuList;
