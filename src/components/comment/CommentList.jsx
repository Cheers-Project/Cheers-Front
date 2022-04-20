import React from 'react';
import styled from 'styled-components';

import useCommentQuery from 'hooks/useCommentQuery';

const CommentList = () => {
  const comments = useCommentQuery();

  console.log(comments);

  return (
    <CommentListOuter>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>{comment.content}</div>
        ))}
    </CommentListOuter>
  );
};

const CommentListOuter = styled.div``;

export default CommentList;
