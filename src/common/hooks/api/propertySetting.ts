import {
  useCreatePropertyBlock,
  useDeletePropertyBlock,
  useEditPropertyBlock,
  useGetPropertyBlock,
  useGetPropertyBlocks,
} from './propertyBlock';
import {
  useCreatePropertyLot,
  useDeletePropertyLot,
  useEditPropertyLot,
  useGetPropertyLot,
  useGetPropertyLots,
} from './propertyLot';
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

export const useGetPropertySettings = (
  type: 'Type' | 'Block' | 'Phase' | 'Lot'
) => {
  switch (type) {
    case 'Block':
      return useGetPropertyBlocks;
    case 'Phase':
      return useGetPropertyPhases;
    case 'Type':
      return useGetPropertyTypes;
    case 'Lot':
      return useGetPropertyLots;
  }
};

export const useGetPropertySetting = (
  type: 'Type' | 'Block' | 'Phase' | 'Lot'
) => {
  switch (type) {
    case 'Block':
      return useGetPropertyBlock;
    case 'Phase':
      return useGetPropertyPhase;
    case 'Type':
      return useGetPropertyType;
    case 'Lot':
      return useGetPropertyLot;
  }
};

export const useCreatePropertySetting = (
  type: 'Type' | 'Block' | 'Phase' | 'Lot'
) => {
  switch (type) {
    case 'Block':
      return useCreatePropertyBlock;
    case 'Phase':
      return useCreatePropertyPhase;
    case 'Type':
      return useCreatePropertyType;
    case 'Lot':
      return useCreatePropertyLot;
  }
};

export const useEditPropertySetting = (
  type: 'Type' | 'Block' | 'Phase' | 'Lot'
) => {
  switch (type) {
    case 'Block':
      return useEditPropertyBlock;
    case 'Phase':
      return useEditPropertyPhase;
    case 'Type':
      return useEditPropertyType;
    case 'Lot':
      return useEditPropertyLot;
  }
};

export const useDeletePropertySetting = (
  type: 'Type' | 'Block' | 'Phase' | 'Lot'
) => {
  switch (type) {
    case 'Block':
      return useDeletePropertyBlock;
    case 'Phase':
      return useDeletePropertyPhase;
    case 'Type':
      return useDeletePropertyType;
    case 'Lot':
      return useDeletePropertyLot;
  }
};
