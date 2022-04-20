import { useQuery } from 'react-query';

import * as userAPI from 'api/user';

const useOwnedQuery = (writerId) => {
  const { data } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const userId = data ? data.userInfo._id : '';

  const isOwned = writerId === userId ? true : false;

  return { isOwned, userId };
};

export default useOwnedQuery;
