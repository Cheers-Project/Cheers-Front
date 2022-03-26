import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/modules/user';

import useModal from 'hooks/useModal';
import UserModal from 'components/user/UserModal';

const MenuList = ({ isLoggedIn, menuModalState }) => {
  const dispatch = useDispatch();

  const [userModalState, handleUserModal, setUserModalState] = useModal({
    login: false,
    regist: false,
    isOpen: false,
  });

  const { isOpen } = userModalState;

  const loginModal = () => {
    setUserModalState({ ...userModalState, login: true, isOpen: true });
  };
  const registModal = () => {
    setUserModalState({ ...userModalState, regist: true, isOpen: true });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <MenuListWrapper modalState={menuModalState}>
      {!isLoggedIn ? (
        <>
          <MenuItem onClick={loginModal}>로그인</MenuItem>
          <MenuItem onClick={registModal}>회원가입</MenuItem>
        </>
      ) : (
        <>
          <MenuItem>마이페이지</MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </>
      )}
      {isOpen && (
        <UserModal
          userModalState={userModalState}
          handleUserModal={handleUserModal}
          setUserModalState={setUserModalState}
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
