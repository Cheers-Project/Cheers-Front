import client from 'api/index';

export const getBoards = (payload) => {
  return client.get('/board', { params: payload }).then((res) => res.data);
};

export const increaseView = (id, payload) => {
  return client.patch(`/board/${id}`).then((res) => res.data);
};

export const getBoradById = (id) => {
  return client.get(`/board/${id}`).then((res) => res.data);
};

export const write = (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .post('/board', payload, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const uploadImg = async (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await client.post('/board/image', payload, {
    headers: {
      Authorization: accessToken,
      'Content-type': 'multipart/form-data',
    },
  });
  return res;
};
