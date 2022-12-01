import { stringify } from 'querystring';

import { UserCreateParams, UserEditParams } from '@/types/index';

import { request } from '../utils';

const path = 'users';

export const getMe = async () => {
  return await request<Data.User>({
    method: 'GET',
    url: `${path}/me`,
  });
};

export const getUser = async (id: number) => {
  return await request<Data.User>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const getUsers = async (params?: { query?: Partial<Data.User> }) => {
  const query = params?.query ? stringify(params.query) : '';

  return await request<Data.User[]>({
    method: 'GET',
    url: `${path}${query ? `?${query}` : ''}`,
  });
};

export const createUser = async (params: UserCreateParams) => {
  return await request<Data.User>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteUser = async (id: number) => {
  return await request<Data.User>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editUser = async (id: number, params: UserEditParams) => {
  return await request<Data.User>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
