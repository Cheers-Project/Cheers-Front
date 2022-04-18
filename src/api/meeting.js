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

export const fetchMeetingDetail = ({ queryKey }) => {
  return client.get(`/meeting/${queryKey[1]}`).then((res) => res.data);
};

export const increaseView = (id) => {
  return client.patch(`/meeting/${id}`).then((res) => res.data);
};
