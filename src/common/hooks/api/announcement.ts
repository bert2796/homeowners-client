import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  AnnouncementCreateParams,
  AnnouncementEditParams,
} from '../../../types';
import { announcementAPI } from '../../services';

export const useGetAnnouncements = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => announcementAPI.getAnnouncements(),
    queryKey: ['getAnnouncements'],
    staleTime: 1200,
  });

export const useGetAnnouncement = (id: number) =>
  useQuery({
    queryFn: () => announcementAPI.getAnnouncement(id),
    queryKey: ['getAnnouncement', id],
  });

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AnnouncementCreateParams) =>
      announcementAPI.createAnnouncement(params),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getAnnouncements'] });

      const previousData = queryClient.getQueryData(['getAnnouncements']);

      return previousData;
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getAnnouncements']);
    },
  });
};

export const useEditAnnouncement = (
  id: number,
  data: AnnouncementEditParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => announcementAPI.editAnnouncement(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getAnnouncements'] });

      const previousData = queryClient.getQueryData(['getAnnouncements']);

      return previousData;
    },
    onSettled: (res) => {
      if (res?.data) {
        queryClient.setQueryData(['getAnnouncement', id], () => res.data);
      }
    },
  });
};

export const useDeleteAnnouncement = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => announcementAPI.deleteAnnouncement(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getAnnouncements'] });

      const previousData = queryClient.getQueryData(['getAnnouncements']);

      return previousData;
    },
    onSettled: () => {
      const previousData = (
        queryClient.getQueryData(['getAnnouncements']) as {
          data: Data.Announcement[];
        }
      )?.data;

      queryClient.setQueryData(['getAnnouncements'], () =>
        previousData?.filter((data) => data.id !== id)
      );
    },
  });
};
