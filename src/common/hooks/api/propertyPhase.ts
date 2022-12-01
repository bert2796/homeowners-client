import { useQuery } from '@tanstack/react-query';

import { propertyPhaseAPI } from '../../services';

export const useGetPropertyPhases = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyPhaseAPI.getPropertyPhases(),
    queryKey: ['getPropertyPhases'],
    staleTime: 2000,
  });
