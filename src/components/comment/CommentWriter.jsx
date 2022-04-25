import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import * as commentAPI from 'api/comment';
import StyledInput from 'components/common/StyledInput';
import StyledButton from 'components/common/StyledButton';

const CommentWriter = () => {
  const queryClient = useQueryClient();
  const { id: postId } = useParams();
  const [content, setContent] = useState('');

  const createComment = useMutation(['comment'], commentAPI.createComment, {
    onSuccess: (_, variables) => {
      console.log(variables);
      const { postId } = variables;
      queryClient.invalidateQueries(['comments', postId]);
      setContent('');
    },
  });

  const handleCommentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    const payload = {
      postId,
      content,
    };
    createComment.mutate(payload);
  };

  return (
    <CommentWriterWrapper>
      <StyledInput
        id="commentInput"
        name="comment"
        type="text"
        placeholder="댓글을 입력하세요."
        autoComplete="off"
        onChange={handleCommentChange}
        value={content}
        className="comment-input"
      />
      <StyledButton onClick={handleCommentSubmit} cherry responsive>
        작성
      </StyledButton>
    </CommentWriterWrapper>
  );
};

const CommentWriterWrapper = styled.div`
  width: 100%;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  .comment-input {
    width: 100%;
    flex: 1;
  }
`;

export default CommentWriter;
