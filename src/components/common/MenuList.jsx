import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

import * as userAPI from 'api/user';
import UserModal from 'components/user/UserModal';
import { initializeModal, openUserModal } from 'redux/modules/modal';
import { initializeForm } from 'redux/modules/meeting';

const MenuList = ({ userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userModal = useSelector(({ modal }) => {
    return modal.userModal.isOpen;
  });

  const { refetch } = useQuery(['logout'], userAPI.logout, {
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,

    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      localStorage.removeItem('accessToken');
      dispatch(initializeModal());
      navigate('/');
    },
  });

  const handleLoginModalVisible = () => {
    dispatch(openUserModal({ modal: 'loginModal' }));
  };
  const handleRegistModalVisible = () => {
    dispatch(openUserModal({ modal: 'registModal' }));
  };

  const handleLogout = () => {
    refetch();
  };

  const handlePageRouter = (routePage) => {
    dispatch(initializeModal());
    navigate(routePage);
  };

  return (
    <MenuListWrapper>
      {!userInfo ? (
        <>
          <MenuItem onClick={handleLoginModalVisible}>로그인</MenuItem>
          <MenuItem onClick={handleRegistModalVisible}>회원가입</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => handlePageRouter('/board/write')}>
            게시물 작성
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(initializeForm());
              handlePageRouter('/meeting/write');
            }}
          >
            모임 생성
          </MenuItem>
          <MenuItem onClick={() => handlePageRouter('/mypage')}>
            마이페이지
          </MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </>
      )}
      {userModal && <UserModal />}
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
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  letter-spacing: 0.1rem;
  cursor: pointer;
`;

export default MenuList;
