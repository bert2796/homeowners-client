import { FacilityCreateParams, FacilityEditParams } from '../../types';
import { request } from '../utils';

const path = 'facilities';

export const getFacilities = async () => {
  return await request<Data.Facility[]>({
    method: 'GET',
    url: path,
  });
};

export const getFacility = async (id: number) => {
  return await request<Data.Facility>({
    method: 'GET',
    url: `${path}/${id}`,
  });
};

export const createFacility = async (params: FacilityCreateParams) => {
  return await request<Data.Facility>({
    data: params,
    method: 'POST',
    url: path,
  });
};

export const deleteFacility = async (id: number) => {
  return await request<Data.Facility>({
    method: 'DELETE',
    url: `${path}/${id}`,
  });
};

export const editFacility = async (id: number, params: FacilityEditParams) => {
  return await request<Data.Facility>({
    data: params,
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
