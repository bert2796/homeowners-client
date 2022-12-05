import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../../types';
import { propertyBlockAPI } from '../../services';

export const useGetPropertyBlocks = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyBlockAPI.getPropertyBlocks(),
    queryKey: ['getPropertyBlocks'],
    staleTime: 2000,
  });

export const useGetPropertyBlock = (id: number) =>
  useQuery({
    queryFn: () => propertyBlockAPI.getPropertyBlock(id),
    queryKey: ['getPropertyBlock', id],
  });

export const useCreatePropertyBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PropertySettingsCreateParams) =>
      propertyBlockAPI.createPropertyBlock(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyBlocks'] });

      const previousData = queryClient.getQueryData(['getPropertyBlocks']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyBlocks']);
    },
  });
};

export const useEditPropertyBlock = (
  id: number,
  data: PropertySettingsEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyBlockAPI.editPropertyBlock(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyBlocks'] });

      const previousData = queryClient.getQueryData(['getPropertyBlocks']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getPropertyBlock', id], () => res.data);
        queryClient.invalidateQueries(['getPropertyBlocks']);
      }
    },
  });
};

export const useDeletePropertyBlock = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyBlockAPI.deletePropertyBlock(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyBlocks'] });

      const previousData = queryClient.getQueryData(['getPropertyBlocks']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyBlocks']);
    },
  });
};
