import {
  IGetBulkDataDto,
  IPostBulkDataParams,
} from '@/model/services/bulkData/type';
import httpClient from '@/utils/http';

export const getSyncData = async (
  lastSyncTime: number,
): Promise<IGetBulkDataDto> => {
  return httpClient.get('syncData', {lastSyncTime});
};

export const postBulkData = async (
  todo: IPostBulkDataParams,
): Promise<never> => {
  return httpClient.post('syncData', todo);
};
