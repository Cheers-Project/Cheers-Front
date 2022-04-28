import React from 'react';
import styled from 'styled-components';
import { LikeFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import * as boardAPI from 'api/board';
import useLikeQuery from 'hooks/useLikeQuery';
import AlarmModal from 'components/common/AlarmModal';
import useError from 'hooks/useError';
import AlarmContent from 'components/common/AlarmContent';

const LikeBtn = ({ userId }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { board: boardInfo } = queryClient.getQueryData(['board', id]);
  const { error, setError } = useError();

  const isLiked = useLikeQuery(boardInfo.likeUsers);

  const updateLike = useMutation(['like', boardInfo._id], boardAPI.updateLike, {
    mutationKey: ['board', id],
    onSuccess: (data, id) => {
      queryClient.setQueryData(['board', id], data);
    },
  });

  const handleLikeChange = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('로그인 후 이용 가능합니다.');
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
      {error && !userId && (
        <AlarmModal>
          <AlarmContent error={error} />
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

export default LikeBtn;
