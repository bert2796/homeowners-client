import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ReservationPaymentCreateParams,
  ReservationPaymentEditParams,
} from '../../../types';
import { reservationPaymentAPI } from '../../services';

export const useGetReservationPayments = (userId?: number) =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => reservationPaymentAPI.getReservationPayments(userId),
    queryKey: ['getReservationPayments'],
    staleTime: 2000,
  });

export const useGetReservationPayment = (id: number) =>
  useQuery({
    queryFn: () => reservationPaymentAPI.getReservationPayment(id),
    queryKey: ['getReservationPayment', id],
  });

export const useCreateReservationPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ReservationPaymentCreateParams) =>
      reservationPaymentAPI.createReservationPayment(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getReservationPayments'] });

      const previousData = queryClient.getQueryData(['getReservationPayments']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPayments']);
      queryClient.invalidateQueries(['getReservationPayments']);
      queryClient.invalidateQueries(['getReservations']);
    },
  });
};

export const useEditReservationPayment = (
  id: number,
  data: ReservationPaymentEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => reservationPaymentAPI.editReservationPayment(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getReservationPayments'] });

      const previousData = queryClient.getQueryData(['getReservationPayments']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getReservationPayment', id], () => res.data);
        queryClient.invalidateQueries(['getReservationPayments']);
      }
    },
  });
};

export const useDeleteReservationPayment = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => reservationPaymentAPI.deleteReservationPayment(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getReservationPayments'] });

      const previousData = queryClient.getQueryData(['getReservationPayments']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getReservationPayments']);
    },
  });
};
