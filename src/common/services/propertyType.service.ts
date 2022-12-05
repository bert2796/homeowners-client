import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../types';
import { request } from '../utils';

const path = 'propertyTypes';

export const getPropertyTypes = async () => {
  return await request<Data.PropertySettings[]>({
    method: 'GET',
    url: path,
  });
};

export const getPropertyType = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createPropertyType = async (
  params: PropertySettingsCreateParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deletePropertyType = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editPropertyType = async (
  id: number,
  params: PropertySettingsEditParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
