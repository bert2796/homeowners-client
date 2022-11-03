import axios from 'axios';

export const get = <T>(params: { url: string }) => {
  return axios<T>({
    method: 'GET',
    url: params.url,
  });
};
