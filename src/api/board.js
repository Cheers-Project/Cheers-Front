import client from 'api/index';

export const getBoards = (queryKey) => {
  return client.get(`/board?${queryKey}`).then((res) => res.data);
};

export const getBoradById = (id, type) => {
  return client.get(`/board/${id}?type=${type}`).then((res) => res.data);
};

export const updateBoard = ({ payload, id }) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .patch(`/board/${id}`, payload, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const updateLike = (id) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .patch(`/board/like/${id}`, null, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const writeBoard = (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .post('/board', payload, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const deleteBoard = (id) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .delete(`/board/${id}`, {
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
