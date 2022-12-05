import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UserCreateParams, UserEditParams } from '@/types/index';

import { userAPI } from '../../services';

export const useGetStaffs = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => userAPI.getUsers({ query: { role: 'Staff' } }),
    queryKey: ['getStaffs'],
    staleTime: 1200,
  });

export const useGetStaff = (id: number) =>
  useQuery({
    queryFn: () => userAPI.getUser(id),
    queryKey: ['getStaff', id],
  });

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UserCreateParams) => userAPI.createUser(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getStaffs'] });

      const previousData = queryClient.getQueryData(['getStaffs']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getStaffs']);
    },
  });
};

export const useEditStaff = (id: number, data: UserEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userAPI.editUser(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getStaffs'] });

      const previousData = queryClient.getQueryData(['getStaffs']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getStaff', id], () => res.data);
        queryClient.invalidateQueries(['getStaffs']);
      }
    },
  });
};

export const useDeleteStaff = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userAPI.deleteUser(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getStaffs'] });

      const previousData = queryClient.getQueryData(['getStaffs']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getStaffs']);
    },
  });
};
