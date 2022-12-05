import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ExtraChargeCreateParams, ExtraChargeEditParams } from '../../../types';
import { extraChargeAPI } from '../../services';

export const useGetExtraCharges = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => extraChargeAPI.getExtraCharges(),
    queryKey: ['getExtraCharges'],
    staleTime: 2000,
  });

export const useGetExtraCharge = (id: number) =>
  useQuery({
    queryFn: () => extraChargeAPI.getExtraCharge(id),
    queryKey: ['getExtraCharge', id],
  });

export const useCreateExtraCharge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ExtraChargeCreateParams) =>
      extraChargeAPI.createExtraCharge(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getExtraCharges'] });

      const previousData = queryClient.getQueryData(['getExtraCharges']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getExtraCharges']);
    },
  });
};

export const useEditExtraCharge = (id: number, data: ExtraChargeEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => extraChargeAPI.editExtraCharge(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getExtraCharges'] });

      const previousData = queryClient.getQueryData(['getExtraCharges']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getExtraCharge', id], () => res.data);
        queryClient.invalidateQueries(['getExtraCharges']);
      }
    },
  });
};

export const useDeleteExtraCharge = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => extraChargeAPI.deleteExtraCharge(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getExtraCharges'] });

      const previousData = queryClient.getQueryData(['getExtraCharges']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getExtraCharges']);
    },
  });
};
