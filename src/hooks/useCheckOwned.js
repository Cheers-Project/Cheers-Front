import { useState } from 'react';
import { useQuery } from 'react-query';

import * as userAPI from 'api/user';

const useCheckOwned = () => {
  const { data } = useQuery(['user'], userAPI.fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
  console.log(data);
  const userId = data ? data.userInfo._id : '';

  return userId;
};

export default useCheckOwned;
