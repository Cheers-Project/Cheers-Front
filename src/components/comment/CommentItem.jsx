import React from 'react';
import styled from 'styled-components';

import * as commentAPI from 'api/comment';
import useOwnedQuery from 'hooks/useOwnedQuery';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

const CommentItem = ({ commentInfo }) => {
  const queryClient = useQueryClient();
  const { isOwned } = useOwnedQuery(commentInfo.writer._id);
  const { id: postId } = useParams();

  const deleteComment = useMutation(commentAPI.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
  });

  const handleDeleteBtn = () => {
    deleteComment.mutate(commentInfo._id);
  };

  return (
    <CommentItemWrapper>
      <CommentUserInfo>
        <img
          className="user-profile-img"
          src={commentInfo.writer.profileImg}
          alt="user-profileImg"
        />
        <p className="user-profile-nickname">{commentInfo.writer.nickname}</p>
      </CommentUserInfo>
      <div>
        <p>{commentInfo.content}</p>
      </div>
      {isOwned && (
        <div>
          <button>수정</button>
          <button onClick={handleDeleteBtn}>삭제</button>
        </div>
      )}
    </CommentItemWrapper>
  );
};

const CommentItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .user-profile-img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .user-profile-nickname {
    font-size: ${({ theme }) => theme.fontSize.xsm};
    @media screen and (min-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
`;

export default CommentItem;
