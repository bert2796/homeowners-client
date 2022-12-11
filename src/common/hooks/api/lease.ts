import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LeaseCreateParams, LeaseEditParams } from '../../../types';
import { leaseAPI } from '../../services';

export const useGetLeases = (userId?: number) =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => leaseAPI.getLeases(userId),
    queryKey: ['getLeases'],
    staleTime: 2000,
  });

export const useGetLease = (id: number) =>
  useQuery({
    queryFn: () => leaseAPI.getLease(id),
    queryKey: ['getLease', id],
  });

export const useCreateLease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LeaseCreateParams) => leaseAPI.createLease(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getLeases'] });

      const previousData = queryClient.getQueryData(['getLeases']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getLeases']);
    },
  });
};

export const useEditLease = (id: number, data: LeaseEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaseAPI.editLease(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getLeases'] });

      const previousData = queryClient.getQueryData(['getLeases']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getLease', id], () => res.data);
        queryClient.invalidateQueries(['getLeases']);
      }
    },
  });
};

export const useDeleteLease = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaseAPI.deleteLease(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getLeases'] });

      const previousData = queryClient.getQueryData(['getLeases']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getLeases']);
    },
  });
};
