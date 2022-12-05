import { UtilityCreateParams, UtilityEditParams } from '../../types';
import { request } from '../utils';

const path = 'utilities';

export const getUtilities = async () => {
  return await request<Data.Utility[]>({
    method: 'GET',
    url: path,
  });
};

export const getUtility = async (id: number) => {
  return await request<Data.Utility>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createUtility = async (params: UtilityCreateParams) => {
  return await request<Data.Utility>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteUtility = async (id: number) => {
  return await request<Data.Utility>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editUtility = async (id: number, params: UtilityEditParams) => {
  return await request<Data.Utility>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
