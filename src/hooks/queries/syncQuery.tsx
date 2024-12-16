import {useBaseMutation} from './_base';
import {IPostBulkDataParams} from '@/model/services/bulkData/type';
import {postBulkData} from '@/services/sync';

export const usePostSyncData = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useBaseMutation<IPostBulkDataParams, never>({
    service: e => {
      return postBulkData(e);
    },
    onSuccess: {
      callback: onSuccess,
      message: 'Sync Data sending successfully',
    },
    onError: {
      message: 'Sync Data sending failed',
      callback: onError,
    },
  });
};
