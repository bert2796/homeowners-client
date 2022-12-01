import { useQuery } from '@tanstack/react-query';

import { propertyTypeAPI } from '../../services';

export const useGetPropertyTypes = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => propertyTypeAPI.getPropertyTypes(),
    queryKey: ['getPropertyTypes'],
    staleTime: 2000,
  });
