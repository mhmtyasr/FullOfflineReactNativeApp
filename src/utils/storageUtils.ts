const LAST_SYNC_TIME_KEY = 'lastSyncTime';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLastSyncTimeFromStorage = async (): Promise<number | null> => {
  const lastSyncTime = await AsyncStorage.getItem(LAST_SYNC_TIME_KEY);
  return lastSyncTime ? parseInt(lastSyncTime, 10) : 1700837980069;
};

export const setLastSyncTimeToStorage = async (
  timestamp: number,
): Promise<void> => {
  AsyncStorage.setItem(LAST_SYNC_TIME_KEY, timestamp.toString());
};

export const getisSyncStartingFromStorage = async (): Promise<boolean> => {
  const isSyncStarting = await AsyncStorage.getItem('isSyncStarting');
  return isSyncStarting === 'true';
};

export const getIsBulkDataSendingFromStorage = async (): Promise<boolean> => {
  const isBulkDataSending = await AsyncStorage.getItem('isBulkDataSending');
  return isBulkDataSending === 'true';
};
