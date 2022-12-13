import { stringify } from 'querystring';

import { ReservationCreateParams, ReservationEditParams } from '../../types';
import { request } from '../utils';

const path = 'reservations';

export const getReservations = async (userId?: number) => {
  const query = userId ? stringify({ userId }) : '';

  return await request<Data.Reservation[]>({
    method: 'GET',
    url: `${path}${query ? `?${query}` : ''}`,
  });
};

export const getReservation = async (id: number) => {
  return await request<Data.Reservation>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createReservation = async (params: ReservationCreateParams) => {
  return await request<Data.Reservation>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteReservation = async (id: number) => {
  return await request<Data.Reservation>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editReservation = async (
  id: number,
  params: ReservationEditParams
) => {
  return await request<Data.Reservation>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
