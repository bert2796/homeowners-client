import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../types';
import { request } from '../utils';

const path = 'propertyLocationBlocks';

export const getPropertyBlocks = async () => {
  return await request<Data.PropertySettings[]>({
    method: 'GET',
    url: path,
  });
};

export const getPropertyBlock = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createPropertyBlock = async (
  params: PropertySettingsCreateParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deletePropertyBlock = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editPropertyBlock = async (
  id: number,
  params: PropertySettingsEditParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
