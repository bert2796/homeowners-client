import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PropertyCreateParams, PropertyEditParams } from '../../../types';
import { propertyAPI } from '../../services';

export const useGetProperties = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyAPI.getProperties(),
    queryKey: ['getProperties'],
    staleTime: 1200,
  });

export const useGetProperty = (id: number) =>
  useQuery({
    queryFn: () => propertyAPI.getProperty(id),
    queryKey: ['getProperty', id],
  });

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PropertyCreateParams) =>
      propertyAPI.createProperty(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getProperties'] });

      const previousData = queryClient.getQueryData(['getProperties']);

      return previousData;
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getProperties']);
    },
  });
};

export const useEditProperty = (id: number, data: PropertyEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyAPI.editProperty(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getProperties'] });

      const previousData = queryClient.getQueryData(['getProperties']);

      return previousData;
    },
    onSettled: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getProperty', id], () => res.data);
      }
    },
  });
};

export const useDeleteProperty = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => propertyAPI.deleteProperty(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getProperties'] });

      const previousData = queryClient.getQueryData(['getProperties']);

      return previousData;
    },
    onSettled: () => {
      const previousData = (
        queryClient.getQueryData(['getProperties']) as { data: Data.Property[] }
      )?.data;

      console.log(previousData);

      queryClient.setQueryData(['getProperties'], () =>
        previousData?.filter((data) => data.id !== id)
      );
    },
  });
};
