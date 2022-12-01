import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useFetch = (
  queryKey: string[],
  fetcher: () => Promise<AxiosResponse>
) => {
  const context = useQuery({ queryFn: fetcher, queryKey });

  return context;
};
