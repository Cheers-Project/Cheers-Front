import React from 'react';
import styled from 'styled-components';

import useCommentQuery from 'hooks/useCommentQuery';
import CommentItem from './CommentItem';

const CommentList = () => {
  const comments = useCommentQuery();

  return (
    <CommentListOuter>
      <CommentListWrapper>
        {comments &&
          comments.map((comment) => (
            <CommentItem key={comment._id} commentInfo={comment} />
          ))}
      </CommentListWrapper>
    </CommentListOuter>
  );
};

const CommentListOuter = styled.div`
  padding: 3rem 0;
`;

const CommentListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default CommentList;
