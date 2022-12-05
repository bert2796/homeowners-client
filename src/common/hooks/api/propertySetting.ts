import {
  useCreatePropertyBlock,
  useDeletePropertyBlock,
  useEditPropertyBlock,
  useGetPropertyBlock,
  useGetPropertyBlocks,
} from './propertyBlock';
import {
  useCreatePropertyPhase,
  useDeletePropertyPhase,
  useEditPropertyPhase,
  useGetPropertyPhase,
  useGetPropertyPhases,
} from './propertyPhase';
import {
  useCreatePropertyType,
  useDeletePropertyType,
  useEditPropertyType,
  useGetPropertyType,
  useGetPropertyTypes,
} from './propertyType';

export const useGetPropertySettings = (type: 'Type' | 'Block' | 'Phase') => {
  switch (type) {
    case 'Block':
      return useGetPropertyBlocks;
    case 'Phase':
      return useGetPropertyPhases;
    case 'Type':
      return useGetPropertyTypes;
  }
};

export const useGetPropertySetting = (type: 'Type' | 'Block' | 'Phase') => {
  switch (type) {
    case 'Block':
      return useGetPropertyBlock;
    case 'Phase':
      return useGetPropertyPhase;
    case 'Type':
      return useGetPropertyType;
  }
};

export const useCreatePropertySetting = (type: 'Type' | 'Block' | 'Phase') => {
  switch (type) {
    case 'Block':
      return useCreatePropertyBlock;
    case 'Phase':
      return useCreatePropertyPhase;
    case 'Type':
      return useCreatePropertyType;
  }
};

export const useEditPropertySetting = (type: 'Type' | 'Block' | 'Phase') => {
  switch (type) {
    case 'Block':
      return useEditPropertyBlock;
    case 'Phase':
      return useEditPropertyPhase;
    case 'Type':
      return useEditPropertyType;
  }
};

export const useDeletePropertySetting = (type: 'Type' | 'Block' | 'Phase') => {
  switch (type) {
    case 'Block':
      return useDeletePropertyBlock;
    case 'Phase':
      return useDeletePropertyPhase;
    case 'Type':
      return useDeletePropertyType;
  }
};
