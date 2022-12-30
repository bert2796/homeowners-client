import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../types';
import { request } from '../utils';

const path = 'propertyLocationLots';

export const getPropertyLots = async () => {
  return await request<Data.PropertySettings[]>({
    method: 'GET',
    url: path,
  });
};

export const getPropertyLot = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createPropertyLot = async (
  params: PropertySettingsCreateParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deletePropertyLot = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editPropertyLot = async (
  id: number,
  params: PropertySettingsEditParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
