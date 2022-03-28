import client from 'api/index';

export const login = (payload) => {
  try {
    return client.post('/user/login', payload);
  } catch (e) {
    return e.response;
  }
};
export const kakaoCallback = (code) => {
  try {
    return client.get(`/auth/kakao/callback?code=${code}`);
  } catch (e) {
    return e.response;
  }
};

export const kakaoLogin = (payload) => {
  try {
    return client.post('/user/login/kakao', payload);
  } catch (e) {
    return e.response;
  }
};

export const logout = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const res = await client.get('/user/logout', {
      headers: {
        Authorization: accessToken,
      },
    });
    return res;
  } catch (e) {
    return e.response;
  }
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
