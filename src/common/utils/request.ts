import axios from 'axios';

export const request = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: 'http://137.184.182.0',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = '';

    if (error?.response) {
      if (error?.response?.data) {
        message = error.response.data.message;
      }
    } else if (error?.request) {
      message = 'Something went wrong. Please try again later.';
    } else {
      message = 'Something went wrong. Please try again later.';
    }

    return Promise.reject(new Error(message));
  }
);

export const setHeadersAuth = (token: string | undefined) => {
  request.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
};
