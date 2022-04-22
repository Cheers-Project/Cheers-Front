import React from 'react';
import styled from 'styled-components';

import StyledInput from 'components/common/StyledInput';
import StyledButton from 'components/common/StyledButton';

const CommentUpdater = ({ commentInfo, handleUpdate }) => {
  return (
    <CommentUpdaterWrapper>
      <StyledInput
        id="commentInput"
        name="comment"
        type="text"
        placeholder="댓글을 입력하세요."
        autoComplete="off"
        defaultValue={commentInfo.content}
        className="comment-input"
      />
      <ButtonWraper>
        <StyledButton cherry responsive>
          수정
        </StyledButton>
        <StyledButton responsive onClick={handleUpdate}>
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
