import { useQuery } from '@tanstack/react-query';

import { propertyBlockAPI } from '../../services';

export const useGetPropertyBlocks = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyBlockAPI.getPropertyBlocks(),
    queryKey: ['getPropertyBlocks'],
    staleTime: 2000,
  });
