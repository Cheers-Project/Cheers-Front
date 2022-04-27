import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import * as commentAPI from 'api/comment';
import useOwnedQuery from 'hooks/useOwnedQuery';
import CommentUpdater from 'components/comment/CommentUpdater';

const CommentItem = ({ commentInfo }) => {
  const queryClient = useQueryClient();
  const [updateState, setUpdateState] = useState(false);
  const { id: postId } = useParams();
  const createdDate = format(new Date(commentInfo.createdDate), 'yyyy-MM-dd');

  const { isOwned } = useOwnedQuery(commentInfo.writer._id);

  const deleteComment = useMutation(commentAPI.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
  });

  const handleCommentDelete = () => {
    deleteComment.mutate(commentInfo._id);
  };

  const handleUpdateStateChange = () => {
    setUpdateState(!updateState);
  };

  return (
    <CommentItemWrapper>
      <CommentInfoOuter>
        <CommentInfoWrapper>
          <img
            className="user-profile-img"
            src={commentInfo.writer.profileImg}
            alt="user-profileImg"
          />
          <div className="comment-sub-info">
            <p className="user-profile-nickname">
              {commentInfo.writer.nickname}
            </p>
            <div className="comment-time">{createdDate}</div>
          </div>
        </CommentInfoWrapper>
        {isOwned && !updateState && (
          <UpdateWrapper>
            <button onClick={handleUpdateStateChange}>수정</button>
            <button onClick={handleCommentDelete}>삭제</button>
          </UpdateWrapper>
        )}
      </CommentInfoOuter>
      {!updateState ? (
        <ContentWrapper>
          <p>{commentInfo.content}</p>
        </ContentWrapper>
      ) : (
        <CommentUpdater
          commentInfo={commentInfo}
          handleUpdateStateChange={handleUpdateStateChange}
        />
      )}
    </CommentItemWrapper>
  );
};

const CommentItemWrapper = styled.li`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.color.divider};
`;

const CommentInfoOuter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  .user-profile-img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .comment-sub-info {
    margin-left: 1.5rem;
    .user-profile-nickname {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: 600;
    }
    .comment-time {
      color: ${({ theme }) => theme.color.darkGray};
      font-size: ${({ theme }) => theme.fontSize.sm};
      margin-top: 0.5rem;
    }
  }
`;

const UpdateWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  button {
    color: ${({ theme }) => theme.color.darkGray};
    font-size: ${({ theme }) => theme.fontSize.sm};
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.color.lightCherry};
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem 0 0 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export default React.memo(CommentItem);
