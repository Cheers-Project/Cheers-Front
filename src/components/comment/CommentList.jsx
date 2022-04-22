import React from 'react';
import styled from 'styled-components';

import useCommentQuery from 'hooks/useCommentQuery';
import useOwnedQuery from 'hooks/useOwnedQuery';
import CommentItem from './CommentItem';
import CommentWriter from './CommentWriter';

const CommentList = () => {
  const comments = useCommentQuery();
  const { userId } = useOwnedQuery();

  return (
    <CommentListOuter>
      <CommentInfo>
        {comments && <h3>댓글 ( {comments.length} )</h3>}
      </CommentInfo>
      {userId && <CommentWriter />}
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

const CommentInfo = styled.div`
  padding: 2rem 0;
  h3 {
    font-size: ${({ theme }) => theme.fontSize.mdTitle};
    font-weight: 600;
  }
`;

const CommentListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default CommentList;
