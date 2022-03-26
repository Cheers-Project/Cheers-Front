import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

const accessToken = localStorage.getItem('accessToken');
client.defaults.headers.common['Authorization'] = accessToken;

export default client;
