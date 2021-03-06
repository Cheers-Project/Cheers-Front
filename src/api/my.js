import client from 'api/index';

export const updateProfileImg = (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .post('/my/profile', payload, {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
};

export const removeProfileImg = () => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .delete('/my/profile', {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const updateNickname = (payload) => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .patch('/my/nickname', payload, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const fetchMyMeeting = () => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .get('/my/meeting', {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const fetchMyBoard = async ({ pageParam = 1 }) => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await client.get(`/my/board?page=${pageParam}`, {
    headers: {
      Authorization: accessToken,
    },
  });

  return {
    boardList: data.boardList,
    nextPage: pageParam + 1,
    isLastPage: data.isLastPage,
  };
};
