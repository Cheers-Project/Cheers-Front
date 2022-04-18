import React from 'react';
import styled from 'styled-components';
import { LikeFilled } from '@ant-design/icons';

import * as boardAPI from 'api/board';
import { useMutation, useQueryClient } from 'react-query';
import useCheckLike from 'hooks/useCheckLike';

const LikeBtn = ({ boardInfo }) => {
  const queryClient = useQueryClient();

  const isLiked = useCheckLike(boardInfo.likeUsers);

  const updateLike = useMutation(['like', boardInfo._id], boardAPI.updateLike, {
    onSuccess: (data, id) => {
      queryClient.setQueryData(['board', id], data);
    },
  });

  const handleLikeBtn = () => {
    updateLike.mutate(boardInfo._id);
  };

  return (
    <LikeWrapper>
      <LikeFilled
        className={isLiked ? 'like-active' : 'like'}
        onClick={handleLikeBtn}
      />
      <p className="like-cnt">{boardInfo.like}</p>
    </LikeWrapper>
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
