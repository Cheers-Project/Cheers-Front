import client from 'api/index';

export const login = async (payload) => {
  try {
    const res = await client.post('/api/user/login', payload);
    console.log(res);
    return res;
  } catch (e) {
    console.log(e.response);
  }
};

export const regist = async (payload) => {
  try {
    const res = await client.post('/api/user/regist', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e.response);
  }
};
