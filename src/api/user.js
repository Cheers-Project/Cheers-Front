import client from 'api/index';

export const login = async (payload) => {
  try {
    const res = await client.post('/user/login', payload);
    return res;
  } catch (e) {
    return e.response;
  }
};
export const kakaoCallback = async (code) => {
  try {
    const res = await client.get(`/auth/kakao/callback?code=${code}`);
    return res;
  } catch (e) {
    return e.response;
  }
};

export const kakaoLogin = async (payload) => {
  try {
    const res = await client.post('/user/login/kakao', payload);
    return res;
  } catch (e) {
    return e.response;
  }
};

export const regist = async (payload) => {
  try {
    const res = await client.post('/user/regist', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
