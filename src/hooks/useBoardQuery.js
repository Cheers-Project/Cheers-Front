import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import * as boardAPI from 'api/board';

const useBoardQuery = (type) => {
  const { id } = useParams();

  const { data, isSuccess } = useQuery(
    ['board', id],
    () => boardAPI.getBoradById(id, type),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
      retry: false,
    },
  );

  return { boardInfo: data?.board, isSuccess };
};

export default useBoardQuery;
