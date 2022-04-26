import React from 'react';
import styled from 'styled-components';
import { LikeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import * as boardAPI from 'api/board';
import { useMutation, useQueryClient } from 'react-query';
import useLikeQuery from 'hooks/useLikeQuery';
import { openUserModal, toggleModal } from 'redux/modules/modal';
import StyledButton from 'components/common/StyledButton';
import AlarmModal from 'components/common/AlarmModal';
import { useParams } from 'react-router-dom';
import UserModal from 'components/user/UserModal';
import useOwnedQuery from 'hooks/useOwnedQuery';

const LikeBtn = ({ userId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { board: boardInfo } = queryClient.getQueryData(['board', id]);
  const alarmModal = useSelector(({ modal }) => modal.alarmModal);
  const userModal = useSelector(({ modal }) => {
    return modal.userModal.isOpen;
  });
  const isLiked = useLikeQuery(boardInfo.likeUsers);

  const updateLike = useMutation(['like', boardInfo._id], boardAPI.updateLike, {
    mutationKey: ['board', id],
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
      {alarmModal && !userId && (
        <AlarmModal>
          <p className="notice-text">로그인이 필요합니다.</p>
          <ButtonWrapper>
            <StyledButton cherry responsive onClick={handleLoginModalVisible}>
              로그인
            </StyledButton>
          </ButtonWrapper>
        </AlarmModal>
      )}
      {userModal && !userId && <UserModal />}
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

const ButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 2rem;
`;

export default LikeBtn;
