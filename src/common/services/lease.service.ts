import { stringify } from 'querystring';

import { LeaseCreateParams, LeaseEditParams } from '../../types';
import { request } from '../utils';

const path = 'leases';

export const getLeases = async (userId?: number) => {
  const query = userId ? stringify({ userId }) : '';

  return await request<Data.Lease[]>({
    method: 'GET',
    url: `${path}${query ? `?${query}` : ''}`,
  });
};

export const getLease = async (id: number) => {
  return await request<Data.Lease>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createLease = async (params: LeaseCreateParams) => {
  return await request<Data.Lease>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteLease = async (id: number) => {
  return await request<Data.Lease>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editLease = async (id: number, params: LeaseEditParams) => {
  return await request<Data.Lease>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
