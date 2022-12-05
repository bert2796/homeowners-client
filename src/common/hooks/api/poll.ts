import { useQuery } from '@tanstack/react-query';

import { pollAPI } from '../../services';

export const useGetPolls = () =>
  useQuery({
    keepPreviousData: true,
    queryFn: () => pollAPI.getPolls(),
    queryKey: ['getPolls'],
    staleTime: 2000,
  });
