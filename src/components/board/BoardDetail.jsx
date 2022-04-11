import React from 'react';
import { useQuery } from 'react-query';

import * as boardAPI from 'api/board';

const BoardDetail = () => {
  const location = window.location;
  const id = location.pathname.split('/')[2];

  const { data } = useQuery(['board'], () => boardAPI.getBoradById(id), {
    refetchOnWindowFocus: false,
    // staleTime: Infinity,
  });

  console.log(data);
  return <div>상세페이지</div>;
};

export default BoardDetail;
