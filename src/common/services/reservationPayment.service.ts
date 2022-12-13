import { stringify } from 'querystring';

import {
  ReservationPaymentCreateParams,
  ReservationPaymentEditParams,
} from '../../types';
import { request } from '../utils';

const path = 'reservationPayments';

export const getReservationPayments = async (userId?: number) => {
  const query = userId ? stringify({ userId }) : '';

  return await request<Data.ReservationPayment[]>({
    method: 'GET',
    url: `${path}${query ? `?${query}` : ''}`,
  });
};

export const getReservationPayment = async (id: number) => {
  return await request<Data.ReservationPayment>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createReservationPayment = async (
  params: ReservationPaymentCreateParams
) => {
  const formData = new FormData();

  formData.append('amount', params.amount);
  formData.append('reservationId', `${params.reservationId}`);

  params.images.forEach((image) => {
    formData.append('images', image);
  });

  return await request<Data.ReservationPayment>({
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: path,
  });
};

export const deleteReservationPayment = async (id: number) => {
  return await request<Data.ReservationPayment>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editReservationPayment = async (
  id: number,
  params: ReservationPaymentEditParams
) => {
  return await request<Data.ReservationPayment>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
