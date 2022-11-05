import { request } from '../utils';

const path = 'auth';

export const login = async (params: { username: string; password: string }) => {
  return await request<{ accessToken: string }>({
    data: params,
    method: 'POST',
    url: path,
  });
};
