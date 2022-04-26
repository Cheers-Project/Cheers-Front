import React from 'react';
import styled from 'styled-components';
import { LikeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import * as boardAPI from 'api/board';
import { useMutation, useQueryClient } from 'react-query';
import useLikeQuery from 'hooks/useLikeQuery';
import { openUserModal, toggleModal } from 'redux/modules/modal';
import StyledButton from 'components/common/StyledButton';
import UserModal from 'components/user/UserModal';
import AlarmModal from 'components/common/AlarmModal';

const LikeBtn = ({ boardInfo }) => {
  const { alarmModal } = useSelector(({ modal }) => modal);
  const userModal = useSelector(({ modal }) => {
    return modal.userModal.isOpen;
  });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const isLiked = useLikeQuery(boardInfo.likeUsers);

  const updateLike = useMutation(['like', boardInfo._id], boardAPI.updateLike, {
    onSuccess: (data, id) => {
      queryClient.setQueryData(['board', id], data);
    },
  });

  const handleLoginModalVisible = () => {
    dispatch(toggleModal({ target: 'alarmModal', visible: false }));
    dispatch(openUserModal({ modal: 'loginModal' }));
  };

  const handleLikeChange = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(toggleModal({ target: 'alarmModal', visible: true }));
      return;
    }
    updateLike.mutate(boardInfo._id);
  };

  return (
    <>
      <LikeWrapper>
        <LikeFilled
          className={isLiked ? 'like-active' : 'like'}
          onClick={handleLikeChange}
        />
        <p className="like-cnt">{boardInfo.like}</p>
      </LikeWrapper>
      {alarmModal && (
        <AlarmModal>
          <p className="notice-text">로그인이 필요합니다.</p>
          <div className="confirm-btn">
            <StyledButton cherry responsive onClick={handleLoginModalVisible}>
              로그인
            </StyledButton>
          </div>
        </AlarmModal>
      )}
      {userModal && <UserModal />}
    </>
  );
};

const LikeWrapper = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  font-size: 4rem;
  .like {
    color: ${({ theme }) => theme.color.lightGray};
  }

  .like-active {
    color: ${({ theme }) => theme.color.darkCherry};
  }

  .like-cnt {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const AlarmWrapper = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1rem;
  animation: fadeIn 0.2s ease-in-out;
  .alarm-msg {
    font-size: ${({ theme }) => theme.fontSize.lg};
    padding-bottom: 2rem;
  }
  .btn-wrapper {
    align-self: flex-end;
    margin-top: 2rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default LikeBtn;
