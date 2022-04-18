import { useQuery } from 'react-query';

import * as userAPI from 'api/user';

const useCheckLike = (likeUsers) => {
  const { data } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const nickname = data ? data.userInfo.nickname : '';

  const isLiked = likeUsers.includes(nickname);

  return isLiked;
};

export default useCheckLike;
