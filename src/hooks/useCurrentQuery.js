import { useLocation } from 'react-router-dom';
import qs from 'qs';

const useCurrentQuery = () => {
  const location = useLocation();

  const searchParams = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const query = qs.stringify(searchParams);

  return [query, searchParams];
};

export default useCurrentQuery;
