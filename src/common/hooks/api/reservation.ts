import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ReservationCreateParams, ReservationEditParams } from '../../../types';
import { reservationAPI } from '../../services';

export const useGetReservations = (userId?: number) =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => reservationAPI.getReservations(userId),
    queryKey: ['getReservations', userId ? 'me' : ''],
    staleTime: 2000,
  });

export const useGetReservation = (id: number) =>
  useQuery({
    queryFn: () => reservationAPI.getReservation(id),
    queryKey: ['getReservation', id],
  });

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ReservationCreateParams) =>
      reservationAPI.createReservation(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getReservations'] });

      const previousData = queryClient.getQueryData(['getReservations']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getReservations', 'me']);
      queryClient.invalidateQueries(['getReservations']);
    },
  });
};

export const useEditReservation = (id: number, data: ReservationEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => reservationAPI.editReservation(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getReservations'] });

      const previousData = queryClient.getQueryData(['getReservations']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getReservation', id], () => res.data);
        queryClient.invalidateQueries(['getReservations']);
      }
    },
  });
};

export const useDeleteReservation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => reservationAPI.deleteReservation(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getReservations'] });

      const previousData = queryClient.getQueryData(['getReservations']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getReservations']);
    },
  });
};
