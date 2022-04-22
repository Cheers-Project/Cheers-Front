import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import * as commentAPI from 'api/comment';
import useOwnedQuery from 'hooks/useOwnedQuery';
import CommentUpdater from './CommentUpdater';

const CommentItem = ({ commentInfo }) => {
  const [update, setUpdate] = useState(false);
  const queryClient = useQueryClient();
  const { isOwned } = useOwnedQuery(commentInfo.writer._id);
  const { id: postId } = useParams();
  const createdDate = format(new Date(commentInfo.createdDate), 'yyyy-MM-dd');

  const deleteComment = useMutation(commentAPI.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
  });

  const handleDeleteBtn = () => {
    deleteComment.mutate(commentInfo._id);
  };

  const handleUpdate = () => {
    setUpdate(!update);
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
        {isOwned && !update && (
          <UpdateWrapper>
            <button onClick={handleUpdate}>수정</button>
            <button onClick={handleDeleteBtn}>삭제</button>
          </UpdateWrapper>
        )}
      </CommentInfoOuter>
      {!update ? (
        <ContentWrapper>
          <p>{commentInfo.content}</p>
        </ContentWrapper>
      ) : (
        <CommentUpdater commentInfo={commentInfo} handleUpdate={handleUpdate} />
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
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
  .comment-sub-info {
    margin-left: 1.5rem;
    .user-profile-nickname {
      font-size: ${({ theme }) => theme.fontSize.xsm};
      font-weight: 600;
      @media screen and (min-width: 768px) {
        font-size: ${({ theme }) => theme.fontSize.md};
      }
    }
    .comment-time {
      color: ${({ theme }) => theme.color.darkGray};
      margin-top: 0.8rem;
    }
  }
`;

const UpdateWrapper = styled.div`
  gap: 1rem;
  button {
    color: ${({ theme }) => theme.color.darkGray};
    font-size: ${({ theme }) => theme.fontSize.sm};
    transition: 0.2s;
    padding-left: 1rem;
    &:hover {
      color: ${({ theme }) => theme.color.lightCherry};
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem 0 0 0;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export default CommentItem;
