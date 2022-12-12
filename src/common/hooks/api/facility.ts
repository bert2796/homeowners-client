import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { FacilityCreateParams, FacilityEditParams } from '../../../types';
import { facilityAPI } from '../../services';

export const useGetFacilities = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => facilityAPI.getFacilities(),
    queryKey: ['getFacilities'],
    staleTime: 2000,
  });

export const useGetFacility = (id: number) =>
  useQuery({
    queryFn: () => facilityAPI.getFacility(id),
    queryKey: ['getFacility', id],
  });

export const useCreateFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: FacilityCreateParams) =>
      facilityAPI.createFacility(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getFacilities'] });

      const previousData = queryClient.getQueryData(['getFacilities']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getFacilities']);
    },
  });
};

export const useEditFacility = (id: number, data: FacilityEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => facilityAPI.editFacility(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getFacilities'] });

      const previousData = queryClient.getQueryData(['getFacilities']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getFacility', id], () => res.data);
        queryClient.invalidateQueries(['getFacilities']);
      }
    },
  });
};

export const useDeleteFacility = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => facilityAPI.deleteFacility(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getFacilities'] });

      const previousData = queryClient.getQueryData(['getFacilities']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getFacilities']);
    },
  });
};
