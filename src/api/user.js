import client from 'api/index';

export const fetchUser = () => {
  const accessToken = localStorage.getItem('accessToken');

  return client
    .get('/user', {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const login = (payload) => {
  return client.post('/user/login', payload).then((res) => res.data);
};

export const kakaoCallback = (code) => {
  try {
    return client.get(`/auth/kakao/callback?code=${code}`);
  } catch (e) {
    return e.response;
  }
};

export const kakaoLogin = (payload) => {
  return client.post('/user/login/kakao', payload).then((res) => res.data);
};

export const logout = () => {
  const accessToken = localStorage.getItem('accessToken');

  return client.get('/user/logout', {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const regist = (payload) => {
  try {
    return client.post('/user/regist', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (e) {
    return e.response;
  }
};
