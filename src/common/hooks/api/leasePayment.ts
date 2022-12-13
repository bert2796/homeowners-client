import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  LeasePaymentCreateParams,
  LeasePaymentEditParams,
} from '../../../types';
import { leasePaymentAPI } from '../../services';

export const useGetLeasePayments = (userId?: number) =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => leasePaymentAPI.getLeasePayments(userId),
    queryKey: ['getLeasePayments'],
    staleTime: 2000,
  });

export const useGetLeasePayment = (id: number) =>
  useQuery({
    queryFn: () => leasePaymentAPI.getLeasePayment(id),
    queryKey: ['getLeasePayment', id],
  });

export const useCreateLeasePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LeasePaymentCreateParams) =>
      leasePaymentAPI.createLeasePayment(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getLeasePayments'] });

      const previousData = queryClient.getQueryData(['getLeasePayments']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPayments']);
      queryClient.invalidateQueries(['getLeasePayments']);
      queryClient.invalidateQueries(['getLeases']);
    },
  });
};

export const useEditLeasePayment = (
  id: number,
  data: LeasePaymentEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leasePaymentAPI.editLeasePayment(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getLeasePayments'] });

      const previousData = queryClient.getQueryData(['getLeasePayments']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getLeasePayment', id], () => res.data);
        queryClient.invalidateQueries(['getLeasePayments']);
      }
    },
  });
};

export const useDeleteLeasePayment = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leasePaymentAPI.deleteLeasePayment(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getLeasePayments'] });

      const previousData = queryClient.getQueryData(['getLeasePayments']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getLeasePayments']);
    },
  });
};
