import {useQuery} from '@tanstack/react-query';
import {UseBaseQueryParams} from './types';
import {BaseRequestParams} from '@/model/services/_base';
import {useCallback} from 'react';
import {useInitializer} from '@/components/Initializer';

const useBaseQuery = <
  ReqT extends BaseRequestParams | undefined,
  ResK,
  MappingT = ResK,
>({
  service,
  offlineService,
  queryKeys,
  select,
  onSuccess,
  onError,
  enabled,
  initialData = undefined,
}: UseBaseQueryParams<ReqT, ResK, MappingT>) => {
  const {isConnected} = useInitializer();
  const queryFn = useCallback(
    async (e: any) => {
      if (isConnected) {
        return service(e.queryKey[1]);
      } else {
        if (offlineService) {
          return offlineService(e.queryKey[1]);
        }
        throw new Error('Offline service is not defined.' + queryKeys);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isConnected, queryKeys],
  );

  const {data, isError, isSuccess, isLoading, isFetching, error, refetch} =
    useQuery({
      queryKey: queryKeys,
      queryFn: queryFn,
      select: _data => {
        return select ? (select(_data as ResK) as any) : (_data as ResK);
      },
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: enabled,
      initialData: initialData,
    });

  if (isError) {
    if (onError?.message) {
      onError.message && onError.message;
    }
    if (onError?.callback) {
      onError.callback(error);
    }
  }

  if (isSuccess) {
    if (onSuccess?.message) {
      onSuccess.message && onSuccess.message;
    }
    if (onSuccess?.callback) {
      onSuccess.callback(data);
    }
  }

  return {data, isError, isSuccess, isLoading, error, isFetching, refetch};
};

export default useBaseQuery;
