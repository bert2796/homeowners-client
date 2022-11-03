import { request } from '../utils';

const path = 'users';

export const getMe = async () => {
  return await request<Data.User>({
    method: 'GET',
    url: `${path}/users/me`,
  });
};
