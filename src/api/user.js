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
