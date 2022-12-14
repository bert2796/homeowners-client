import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PollCreateParams, PollEditParams } from '../../../types';
import { pollAPI } from '../../services';

export const useGetPolls = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => pollAPI.getPolls(),
    queryKey: ['getPolls'],
    staleTime: 1200,
  });

export const useGetPoll = (id: number) =>
  useQuery({
    queryFn: () => pollAPI.getPoll(id),
    queryKey: ['getPoll', id],
  });

export const useCreatePoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PollCreateParams) => pollAPI.createPoll(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPolls'] });

      const previousData = queryClient.getQueryData(['getPolls']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPolls']);
    },
  });
};

export const useEditPoll = (id: number, data: PollEditParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => pollAPI.editPoll(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPolls'] });

      const previousData = queryClient.getQueryData(['getPolls']);

      return previousData;
    },
    onSuccess: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getPoll', id], () => res.data);
        queryClient.invalidateQueries(['getPolls']);
      }
    },
  });
};

export const useDeletePoll = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => pollAPI.deletePoll(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getPolls'] });

      const previousData = queryClient.getQueryData(['getPolls']);

      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPolls']);
    },
  });
};
