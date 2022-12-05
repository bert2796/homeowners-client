import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UtilityCreateParams, UtilityEditParams } from '../../../types';
import { utilityAPI } from '../../services';

export const useGetUtilities = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => utilityAPI.getUtilities(),
    queryKey: ['getUtilities'],
    staleTime: 2000,
  });

export const useGetUtility = (id: number) =>
  useQuery({
    queryFn: () => utilityAPI.getUtility(id),
    queryKey: ['getUtility', id],
  });

export const useCreateUtility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UtilityCreateParams) =>
      utilityAPI.createUtility(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getUtilities'] });

      const previousData = queryClient.getQueryData(['getUtilities']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getUtilities']);
    },
  });
};

export const useEditUtility = (id: number, data: UtilityEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => utilityAPI.editUtility(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getUtilities'] });

      const previousData = queryClient.getQueryData(['getUtilities']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getUtility', id], () => res.data);
        queryClient.invalidateQueries(['getUtilities']);
      }
    },
  });
};

export const useDeleteUtility = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => utilityAPI.deleteUtility(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getUtilities'] });

      const previousData = queryClient.getQueryData(['getUtilities']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getUtilities']);
    },
  });
};
