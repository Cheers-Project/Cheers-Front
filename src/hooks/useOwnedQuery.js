import { useQuery } from 'react-query';

import * as userAPI from 'api/user';

const useOwnedQuery = () => {
  const { data } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const userId = data ? data.userInfo._id : '';

  return userId;
};

export default useOwnedQuery;
