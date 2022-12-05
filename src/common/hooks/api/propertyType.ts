import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  PropertySettingsCreateParams,
  PropertySettingsEditParams,
} from '../../../types';
import { propertyTypeAPI } from '../../services';

export const useGetPropertyTypes = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyTypeAPI.getPropertyTypes(),
    queryKey: ['getPropertyTypes'],
    staleTime: 2000,
  });

export const useGetPropertyType = (id: number) =>
  useQuery({
    queryFn: () => propertyTypeAPI.getPropertyType(id),
    queryKey: ['getPropertyType', id],
  });

export const useCreatePropertyType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PropertySettingsCreateParams) =>
      propertyTypeAPI.createPropertyType(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyTypes'] });

      const previousData = queryClient.getQueryData(['getPropertyTypes']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyTypes']);
    },
  });
};

export const useEditPropertyType = (
  id: number,
  data: PropertySettingsEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyTypeAPI.editPropertyType(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyTypes'] });

      const previousData = queryClient.getQueryData(['getPropertyTypes']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getPropertyType', id], () => res.data);
        queryClient.invalidateQueries(['getPropertyTypes']);
      }
    },
  });
};

export const useDeletePropertyType = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyTypeAPI.deletePropertyType(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPropertyTypes'] });

      const previousData = queryClient.getQueryData(['getPropertyTypes']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPropertyTypes']);
    },
  });
};
