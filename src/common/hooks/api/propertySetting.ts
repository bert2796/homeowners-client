import { useGetPropertyBlocks } from './propertyBlock';
import { useGetPropertyPhases } from './propertyPhase';
import { useGetPropertyTypes } from './propertyType';

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
