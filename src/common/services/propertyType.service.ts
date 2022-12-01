import { request } from '../utils';

const path = 'propertyTypes';

export const getPropertyTypes = async () => {
  return await request<Data.PropertySettings[]>({
    method: 'GET',
    url: path,
  });
};
