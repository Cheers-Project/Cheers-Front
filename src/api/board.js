import client from 'api/index';

export const getBoards = (payload) => {
  return client.get('/board', { params: payload }).then((res) => res.data);
};

export const write = async (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await client.post('/board', payload, {
    headers: {
      Authorization: accessToken,
    },
  });
  return res;
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
