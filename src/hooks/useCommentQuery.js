import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as commentAPI from 'api/comment';

const useCommentQuery = () => {
  const { id: postId } = useParams();

  const { data } = useQuery(
    ['comments', postId],
    () => commentAPI.fetchComment(postId),
    {
      refetchOnWindowFocus: false,
    },
  );
  return data?.comments;
};

export default useCommentQuery;
