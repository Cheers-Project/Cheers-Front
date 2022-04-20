import { useQuery } from 'react-query';
import * as commentAPI from 'api/comment';
import { useParams } from 'react-router-dom';

const useCommentQuery = () => {
  const { id: postId } = useParams();

  const { data } = useQuery(
    ['comments', postId],
    () => commentAPI.fetchComment(postId),
    {
      refetchOnWindowFocus: false,
      enabled: !!postId,
      cacheTime: 0,
      retry: false,
    },
  );
  return data?.comments;
};

export default useCommentQuery;
