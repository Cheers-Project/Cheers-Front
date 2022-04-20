import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';

import * as commentAPI from 'api/comment';
import StyledInput from 'components/common/StyledInput';
import StyledButton from 'components/common/StyledButton';
import { useParams } from 'react-router-dom';

const CommentWriter = () => {
  const { id: postId } = useParams();
  const [content, setContent] = useState('');

  const createComment = useMutation(['comment'], commentAPI.createComment);

  const changeComment = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
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
        onChange={changeComment}
      />
      <StyledButton onClick={handleSubmit} cherry>
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
  align-items: center;
  gap: 0.5rem;
`;

export default CommentWriter;
