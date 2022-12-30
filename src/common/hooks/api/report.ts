import { useQuery } from '@tanstack/react-query';

import { reportAPI } from '../../services';

export const useGetLeasePaymentsReport = (
  period: 'weekly' | 'monthly' | 'yearly'
) =>
  useQuery({
    enabled: false,
    keepPreviousData: true,
    queryFn: () => reportAPI.getLeasePaymentsReport(period),
    queryKey: ['getLeasePaymentsReport', period],
    staleTime: 2000,
  });

export const useGetReservationPaymentsReport = (
  period: 'weekly' | 'monthly' | 'yearly'
) =>
  useQuery({
    enabled: false,
    keepPreviousData: true,
    queryFn: () => reportAPI.getReservationPaymentsReport(period),
    queryKey: ['getReservationPaymentsReport', period],
    staleTime: 2000,
  });
