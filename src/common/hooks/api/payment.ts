import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PaymentEditParams } from '../../../types';
import { paymentAPI } from '../../services';

export const useGetPayments = (userId?: number) =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => paymentAPI.getPayments(userId),
    queryKey: ['getPayments'],
    staleTime: 2000,
  });

export const useGetPayment = (id: number) =>
  useQuery({
    queryFn: () => paymentAPI.getPayment(id),
    queryKey: ['getPayment', id],
  });

export const useApprovePayment = (
  id: number,
  type: 'lease' | 'reservation'
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => paymentAPI.editPayment(type, id, { status: 'Approved' }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPayments'] });

      const previousData = queryClient.getQueryData(['getPayments']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getPayments', id], () => res.data);
        queryClient.invalidateQueries(['getPayments']);
      }
    },
  });
};

export const useRejectPayment = (
  id: number,
  type: 'lease' | 'reservation',
  data: PaymentEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      paymentAPI.editPayment(type, id, { ...data, status: 'Rejected' }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPayments'] });

      const previousData = queryClient.getQueryData(['getPayments']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getPayments', id], () => res.data);
        queryClient.invalidateQueries(['getPayments']);
      }
    },
  });
};
