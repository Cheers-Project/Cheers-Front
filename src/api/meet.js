import client from 'api/index';

export const searchAroundMeeting = async (lon, lat) => {
  try {
    const res = await client.get(`/meeting?lon=${lon}&lat=${lat}`);
    return res;
  } catch (e) {
    return e.response;
  }
};
