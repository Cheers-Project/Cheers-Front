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

export const searchRecentMeeting = () => {
  return client.get('/meeting?sort=recent').then((res) => res.data);
};

export const searchNearMeeting = (lon, lat) => {
  return client
    .get(`/meeting?sort=near&lon=${lon}&lat=${lat}`)
    .then((res) => res.data);
};
