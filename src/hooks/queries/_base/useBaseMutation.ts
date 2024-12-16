import {useMutation} from '@tanstack/react-query';
import {IBaseMutationError, UseBaseMutationParams} from './types';
import {useToast} from '@/components/Toast';
import {BaseResponseDTO} from '@/model/services/_base';
import {useInitializer} from '@/components/Initializer';

export type SuccessCallback<K> = (data: K | undefined) => void;

const useBaseMutation = <T, K extends BaseResponseDTO | undefined>({
  service,
  offlineService,
  onSuccess,
  onError,
}: UseBaseMutationParams<T, K | undefined>) => {
  const {isConnected} = useInitializer();
  const toast = useToast();

  const {mutate, data, isError, isSuccess, isPending, error} = useMutation<
    K | undefined,
    IBaseMutationError,
    T
  >({
    onSuccess(_data) {
      handleSuccess(_data ?? undefined);
    },
    onError(_error, _data) {
      handleError(_error, _data);
    },
    mutationFn: e => {
      if (isConnected) {
        return service(e);
      } else {
        return offlineService!(e);
      }
    },
  });

  const handleSuccess: SuccessCallback<K> = async _data => {
    if (onSuccess?.message) {
      toast.show.success(onSuccess.message);
    }
    if (onSuccess?.callback) {
      onSuccess?.callback(_data);
    }
  };

  const handleError = async (_error: any, _data: T) => {
    if (_error?.data) {
      toast.show.error(_error?.data);
    }
    if (onError?.callback) {
      onError.callback(_error);
    }
  };

  return {mutate, data, isError, isSuccess, isPending, error};
};

export default useBaseMutation;
