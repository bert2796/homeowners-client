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
  const formData = new FormData();

  formData.append('name', params.name);
  formData.append('description', params.description);
  formData.append('type', params.type);
  formData.append('amount', params.amount);
  formData.append('downPayment', `${params.downPayment}`);

  params.images.forEach((image) => {
    formData.append('images', image);
  });

  return await request<Data.Facility>({
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
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
  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    if (key === 'images' && typeof value !== 'string') {
      value.forEach((image) => {
        formData.append('images', image);
      });
    } else {
      formData.append(key, value as string);
    }
  });

  return await request<Data.Facility>({
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'PATCH',
    url: `${path}/${id}`,
  });
};
