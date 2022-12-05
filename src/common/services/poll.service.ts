import { request } from '../utils';

const path = 'polls';

export const getPolls = async () => {
  return await request<Data.Poll[]>({
    method: 'GET',
    url: path,
  });
};
