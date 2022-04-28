import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import * as commentAPI from 'api/comment';
import StyledInput from 'components/common/StyledInput';
import StyledButton from 'components/common/StyledButton';

const CommentUpdater = ({ commentInfo, handleUpdateStateChange }) => {
  const queryClient = useQueryClient();
  const { id: postId } = useParams();
  const [content, setContent] = useState(commentInfo.content);

  const updateComment = useMutation(commentAPI.updateComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comments', postId]);
      handleUpdateStateChange();
    },
  });

  const handleContnetChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentUpdate = () => {
    const payload = {
      content,
    };
    updateComment.mutate({ payload, id: commentInfo._id });
  };

  return (
    <CommentUpdaterWrapper>
      <StyledInput
        id="commentInput"
        name="comment"
        type="text"
        placeholder="댓글을 입력하세요."
        autoComplete="off"
        value={content}
        className="comment-input"
        onChange={handleContnetChange}
      />
      <ButtonWraper>
        <StyledButton cherry responsive onClick={handleCommentUpdate}>
          수정
        </StyledButton>
        <StyledButton responsive onClick={handleUpdateStateChange}>
          취소
        </StyledButton>
      </ButtonWraper>
    </CommentUpdaterWrapper>
  );
};

const CommentUpdaterWrapper = styled.div`
  padding: 2rem 0 0 0;
  .comment-input {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const ButtonWraper = styled.div`
  padding: 2rem 0 0 0;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`;

export default CommentUpdater;
