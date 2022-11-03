import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setHeadersAuth = (token: string | undefined) => {
  request.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
};
