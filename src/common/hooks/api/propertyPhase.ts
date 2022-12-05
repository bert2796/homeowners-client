import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../../types';
import { propertyPhaseAPI } from '../../services';

export const useGetPropertyPhases = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyPhaseAPI.getPropertyPhases(),
    queryKey: ['getPropertyPhases'],
    staleTime: 2000,
  });

export const useGetPropertyPhase = (id: number) =>
  useQuery({
    queryFn: () => propertyPhaseAPI.getPropertyPhase(id),
    queryKey: ['getPropertyPhase', id],
  });

export const useCreatePropertyPhase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PropertySettingsCreateParams) =>
      propertyPhaseAPI.createPropertyPhase(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyPhases'] });

      const previousData = queryClient.getQueryData(['getPropertyPhases']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyPhases']);
    },
  });
};

export const useEditPropertyPhase = (
  id: number,
  data: PropertySettingsEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyPhaseAPI.editPropertyPhase(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyPhases'] });

      const previousData = queryClient.getQueryData(['getPropertyPhases']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getPropertyPhase', id], () => res.data);
        queryClient.invalidateQueries(['getPropertyPhases']);
      }
    },
  });
};

export const useDeletePropertyPhase = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyPhaseAPI.deletePropertyPhase(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyPhases'] });

      const previousData = queryClient.getQueryData(['getPropertyPhases']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyPhases']);
    },
  });
};
