import React, {createContext, useContext, useEffect} from 'react';
import BulkDataService from '../../offlineServices/services/bulkDataService';
import {usePostSyncData} from '@/hooks/queries/syncQuery';
import {useInitializer} from '../Initializer';
import {getSyncData} from '@/services/sync';
import {useToast} from '../Toast';
import {getNowTimestampUtc} from '@/utils/dateUtils';
import { queryClient } from '../../../App';
interface SyncContextProps {}

interface SyncProviderProps {
  children: React.ReactNode;
}

const SyncContext = createContext<SyncContextProps | undefined>(undefined);

export const SyncProvider: React.FC<SyncProviderProps> = ({children}) => {
  const {
    lastSyncTime,
    isSyncStarting,
    isBulkDataSending,
    isConnected,
    handleSetSyncStarting,
    handleSetBulkDataSending,
    handleSetLastSyncTime,
  } = useInitializer();

  const toast = useToast();
  const {mutate, isPending} = usePostSyncData({
    onSuccess: () => {
      handleSetBulkDataSending(false);
      toast.show.success('Syncing Successfully');
    },
    onError: () => {},
  });

  useEffect(() => {
    const ws = new WebSocket('ws://todoapp.tryasp.net/syncCheck');

    ws.onopen = () => {
      console.log('WebSocket bağlantısı açıldı');
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.statusCode === 200) {
        runAllSync();
      }
    };
    ws.onerror = error => {
      console.error('WebSocket hatası: ', error.message);
    };

    ws.onclose = () => {
      console.log('WebSocket bağlantısı kapandı');
    };

    // Cleanup WebSocket bağlantısı
    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runAllSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const runAllSync = async () => {
    if (
      isConnected === true &&
      isBulkDataSending === false &&
      lastSyncTime &&
      isSyncStarting === false
    ) {
      handleSetSyncStarting(true);
      toast.show.info('Syncing Starting');
      await getSyncData(lastSyncTime!)
        .then(async x => {
          await BulkDataService.setSync(x);
          toast.show.info('Syncing Successfully');
          handleSetLastSyncTime(getNowTimestampUtc());
          queryClient.refetchQueries();
        })
        .catch(() => {
          handleSetSyncStarting(false);
          toast.show.error('Syncing Failed');
        });
    }
  };

  useEffect(() => {
    const handleSyncControl = async () => {
      if (isConnected === true && isPending === false && lastSyncTime) {
        toast.show.info('Değişen datalar kontrol ediliyor');
        await BulkDataService.hasChangedDataInDb(lastSyncTime!).then(
          async hasChangedData => {
            handleSetBulkDataSending(false);
            if (hasChangedData) {
              toast.show.info('Değişen datalar gönderiliyor');

              await BulkDataService.getAllBulkData(lastSyncTime!).then(x => {
                mutate(x);
              });
            } else {
              toast.show.info('Değişen data bulunamadı');
              handleSetBulkDataSending(false);
            }
          },
        );
      }
    };

    handleSyncControl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return children;
};

export const useSync = () => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
