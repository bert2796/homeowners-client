import { request } from '../utils';

const path = 'propertyLocationBlocks';

export const getPropertyBlocks = async () => {
  return await request<Data.PropertySettings[]>({
    method: 'GET',
    url: path,
  });
};
