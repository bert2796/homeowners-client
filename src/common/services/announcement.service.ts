import { AnnouncementCreateParams, AnnouncementEditParams } from '../../types';
import { request } from '../utils';

const path = 'announcements';

export const getAnnouncements = async () => {
  return await request<Data.Announcement[]>({
    method: 'GET',
    url: path,
  });
};

export const getAnnouncement = async (id: number) => {
  return await request<Data.Announcement>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createAnnouncement = async (params: AnnouncementCreateParams) => {
  return await request<Data.Announcement>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteAnnouncement = async (id: number) => {
  return await request<Data.Announcement>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editAnnouncement = async (
  id: number,
  params: AnnouncementEditParams
) => {
  return await request<Data.Announcement>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
