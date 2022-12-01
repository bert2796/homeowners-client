import { PropertyCreateParams, PropertyEditParams } from '../../types';
import { request } from '../utils';

const path = 'properties';

export const getProperties = async () => {
  return await request<Data.Property[]>({
    method: 'GET',
    url: path,
  });

  // const query = qs.stringify(params);

  // return await request<Paginated<Data.Property>>({
  //   method: 'GET',
  //   url: `${path}${query ? `?${query}` : ''}`,
  // });
};

export const getProperty = async (id: number) => {
  return await request<Data.Property>({
    method: 'GET',
    url: `${path}/${id}`,
  });

  // const query = qs.stringify(params);

  // return await request<Paginated<Data.Property>>({
  //   method: 'GET',
  //   url: `${path}${query ? `?${query}` : ''}`,
  // });
};

export const createProperty = async (params: PropertyCreateParams) => {
  return await request<Data.Property>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteProperty = async (id: number) => {
  return await request<Data.Property>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editProperty = async (id: number, params: PropertyEditParams) => {
  return await request<Data.Property>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
