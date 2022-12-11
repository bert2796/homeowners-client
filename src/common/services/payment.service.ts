import { stringify } from 'querystring';

import { PaymentEditParams } from '../../types';
import { request } from '../utils';

const path = 'payments';

export const getPayments = async (userId?: number) => {
  const query = userId ? stringify({ userId }) : '';

  return await request<Data.Payment[]>({
    method: 'GET',
    url: `${path}${query ? `?${query}` : ''}`,
  });
};

export const getPayment = async (id: number) => {
  return await request<Data.Payment>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const editPayment = async (
  type: 'lease' | 'facility',
  id: number,
  params: PaymentEditParams
) => {
  return await request<Data.Property>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}/${type}`,
  });
};
