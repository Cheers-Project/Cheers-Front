import { useMutation, useQueryClient } from 'react-query';

const useViewQuery = (api, queryKey) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(api, {
    onSuccess: (data, id) => {
      queryClient.setQueryData([queryKey, id], data);
    },
  });

  return mutation;
};

export default useViewQuery;
