import { stringify } from 'querystring';

import { LeasePaymentCreateParams, LeasePaymentEditParams } from '../../types';
import { request } from '../utils';

const path = 'leasePayments';

export const getLeasePayments = async (userId?: number) => {
  const query = userId ? stringify({ userId }) : '';

  return await request<Data.LeasePayment[]>({
    method: 'GET',
    url: `${path}${query ? `?${query}` : ''}`,
  });
};

export const getLeasePayment = async (id: number) => {
  return await request<Data.LeasePayment>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createLeasePayment = async (params: LeasePaymentCreateParams) => {
  const formData = new FormData();

  formData.append('amount', params.amount);
  formData.append('leaseId', `${params.leaseId}`);

  params.images.forEach((image) => {
    formData.append('images', image);
  });

  return await request<Data.LeasePayment>({
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: path,
  });
};

export const deleteLeasePayment = async (id: number) => {
  return await request<Data.LeasePayment>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editLeasePayment = async (
  id: number,
  params: LeasePaymentEditParams
) => {
  return await request<Data.LeasePayment>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
