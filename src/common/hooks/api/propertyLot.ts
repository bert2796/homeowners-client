import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../../types';
import { propertyLotAPI } from '../../services';

export const useGetPropertyLots = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyLotAPI.getPropertyLots(),
    queryKey: ['getPropertyLots'],
    staleTime: 2000,
  });

export const useGetPropertyLot = (id: number) =>
  useQuery({
    queryFn: () => propertyLotAPI.getPropertyLot(id),
    queryKey: ['getPropertyLot', id],
  });

export const useCreatePropertyLot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PropertySettingsCreateParams) =>
      propertyLotAPI.createPropertyLot(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyLots'] });

      const previousData = queryClient.getQueryData(['getPropertyLots']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyLots']);
    },
  });
};

export const useEditPropertyLot = (
  id: number,
  data: PropertySettingsEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyLotAPI.editPropertyLot(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyLots'] });

      const previousData = queryClient.getQueryData(['getPropertyLots']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getPropertyLot', id], () => res.data);
        queryClient.invalidateQueries(['getPropertyLots']);
      }
    },
  });
};

export const useDeletePropertyLot = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyLotAPI.deletePropertyLot(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyLots'] });

      const previousData = queryClient.getQueryData(['getPropertyLots']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyLots']);
    },
  });
};
