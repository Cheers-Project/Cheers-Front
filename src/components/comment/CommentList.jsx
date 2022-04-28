import React from 'react';
import styled from 'styled-components';

import useCommentQuery from 'hooks/useCommentQuery';
import useOwnedQuery from 'hooks/useOwnedQuery';
import CommentItem from 'components/comment/CommentItem';
import CommentWriter from 'components/comment/CommentWriter';

const CommentList = () => {
  const comments = useCommentQuery();
  const { userId } = useOwnedQuery();

  return (
    <CommentListOuter>
      <CommentInfo>
        {comments && <h3>댓글 ( {comments.length} )</h3>}
        {!userId && <p>로그인후 이용 가능합니다.</p>}
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
  padding-bottom: 3rem;
`;

const CommentInfo = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  h3 {
    font-size: ${({ theme }) => theme.fontSize.smTitle};
    font-weight: 600;
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.color.darkGray};
  }
`;

const CommentListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default CommentList;
