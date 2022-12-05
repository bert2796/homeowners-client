import { ExtraChargeCreateParams, ExtraChargeEditParams } from '../../types';
import { request } from '../utils';

const path = 'extras';

export const getExtraCharges = async () => {
  return await request<Data.ExtraCharge[]>({
    method: 'GET',
    url: path,
  });
};

export const getExtraCharge = async (id: number) => {
  return await request<Data.ExtraCharge>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createExtraCharge = async (params: ExtraChargeCreateParams) => {
  return await request<Data.ExtraCharge>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteExtraCharge = async (id: number) => {
  return await request<Data.ExtraCharge>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editExtraCharge = async (
  id: number,
  params: ExtraChargeEditParams
) => {
  return await request<Data.ExtraCharge>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
