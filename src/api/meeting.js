import client from 'api/index';

export const createMeeting = (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .post('/meeting', payload, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const fetchMeeting = async ({ queryKey, pageParam = 1 }) => {
  const { data } = await client.get(
    `/meeting?${queryKey[1]}&page=${pageParam}`,
  );

  return {
    meeting: data.meeting,
    nextPage: pageParam + 1,
    isLastPage: data.isLastPage,
  };
};
