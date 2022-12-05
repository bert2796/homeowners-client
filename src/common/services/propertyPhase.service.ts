import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../types';
import { request } from '../utils';

const path = 'propertyLocationPhases';

export const getPropertyPhases = async () => {
  return await request<Data.PropertySettings[]>({
    method: 'GET',
    url: path,
  });
};

export const getPropertyPhase = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createPropertyPhase = async (
  params: PropertySettingsCreateParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deletePropertyPhase = async (id: number) => {
  return await request<Data.PropertySettings>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editPropertyPhase = async (
  id: number,
  params: PropertySettingsEditParams
) => {
  return await request<Data.PropertySettings>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
