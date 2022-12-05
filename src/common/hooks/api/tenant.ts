import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UserCreateParams, UserEditParams } from '@/types/index';

import { userAPI } from '../../services';

export const useGetTenants = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => userAPI.getUsers({ query: { role: 'Tenant' } }),
    queryKey: ['getTenants'],
    staleTime: 1200,
  });

export const useGetTenant = (id: number) =>
  useQuery({
    queryFn: () => userAPI.getUser(id),
    queryKey: ['getTenant', id],
  });

export const useCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UserCreateParams) => userAPI.createUser(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getTenants'] });

      const previousData = queryClient.getQueryData(['getTenants']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getTenants']);
    },
  });
};

export const useEditTenant = (id: number, data: UserEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userAPI.editUser(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getTenants'] });

      const previousData = queryClient.getQueryData(['getTenants']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getTenant', id], () => res.data);
        queryClient.invalidateQueries(['getTenants']);
      }
    },
  });
};

export const useDeleteTenant = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userAPI.deleteUser(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getTenants'] });

      const previousData = queryClient.getQueryData(['getTenants']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getTenants']);
    },
  });
};
