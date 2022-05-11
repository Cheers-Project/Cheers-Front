import client from 'api/index';

export const createComment = (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .post('/comment', payload, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const fetchComment = (id) => {
  return client.get(`/comment/${id}`).then((res) => res.data);
};

export const updateComment = ({ id, payload }) => {
  const accessToken = localStorage.getItem('accessToken');
  return client
    .patch(`/comment/${id}`, payload, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const deleteComment = ({ id, postId }) => {
  const accessToken = localStorage.getItem('accessToken');
  return client
    .delete(`/comment/${id}`, {
      headers: { Authorization: accessToken },
      data: {
        postId,
      },
    })
    .then((res) => res.data);
};
