import { request } from '../utils';

const path = 'reports';

export const getLeasePaymentsReport = async (
  period: 'weekly' | 'monthly' | 'yearly'
) => {
  return await request<Data.Report[]>({
    method: 'GET',
    url: `${path}/lease-payments/${period}`,
  });
};

export const getUtilityChargesReport = async (
  id: number,
  period: 'weekly' | 'monthly' | 'yearly'
) => {
  return await request<Data.Report[]>({
    method: 'GET',
    url: `${path}/utility-charges/${id}/${period}`,
  });
};

export const getExtraChargesReport = async (
  id: number,
  period: 'weekly' | 'monthly' | 'yearly'
) => {
  return await request<Data.Report[]>({
    method: 'GET',
    url: `${path}/extra-charges/${id}/${period}`,
  });
};

export const getReservationPaymentsReport = async (
  period: 'weekly' | 'monthly' | 'yearly'
) => {
  return await request<Data.Report[]>({
    method: 'GET',
    url: `${path}/reservation-payments/${period}`,
  });
};
