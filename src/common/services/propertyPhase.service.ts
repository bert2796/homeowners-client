import { request } from '../utils';

const path = 'propertyLocationPhases';

export const getPropertyPhases = async () => {
  return await request<Data.PropertySettings[]>({
    method: 'GET',
    url: path,
  });
};
