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

export const fetchMeeting = ({ queryKey }) => {
  return client.get(`/meeting?${queryKey[1]}`).then((res) => res.data);
};
