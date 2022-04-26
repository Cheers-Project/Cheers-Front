import React from 'react';
import styled from 'styled-components';
import { LikeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import * as boardAPI from 'api/board';
import useLikeQuery from 'hooks/useLikeQuery';
import { toggleModal } from 'redux/modules/modal';
import StyledButton from 'components/common/StyledButton';
import AlarmModal from 'components/common/AlarmModal';

const LikeBtn = ({ userId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { board: boardInfo } = queryClient.getQueryData(['board', id]);
  const alarmModal = useSelector(({ modal }) => modal.alarmModal);

  const isLiked = useLikeQuery(boardInfo.likeUsers);

  const updateLike = useMutation(['like', boardInfo._id], boardAPI.updateLike, {
    mutationKey: ['board', id],
    onSuccess: (data, id) => {
      queryClient.setQueryData(['board', id], data);
    },
  });

  const handleAlarmModalClose = () => {
    dispatch(toggleModal({ target: 'alarmModal', visible: false }));
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
          <AlarmText className="notice-text">
            로그인 후 이용 가능합니다.
          </AlarmText>
          <ButtonWrapper>
            <StyledButton cherry responsive onClick={handleAlarmModalClose}>
              확인
            </StyledButton>
          </ButtonWrapper>
        </AlarmModal>
      )}
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

const AlarmText = styled.p`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  text-align: center;
  padding-bottom: 2rem;
`;

export default LikeBtn;
