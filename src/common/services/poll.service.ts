import { PollCreateParams, PollEditParams } from '../../types';
import { request } from '../utils';

const path = 'polls';

export const getPolls = async () => {
  return await request<Data.Poll[]>({
    method: 'GET',
    url: path,
  });
};

export const getPoll = async (id: number) => {
  return await request<Data.Poll>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createPoll = async (params: PollCreateParams) => {
  return await request<Data.Poll>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deletePoll = async (id: number) => {
  return await request<Data.Poll>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editPoll = async (id: number, params: PollEditParams) => {
  return await request<Data.Poll>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
