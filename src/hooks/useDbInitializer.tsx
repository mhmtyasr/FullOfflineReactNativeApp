import {useToast} from '@/components/Toast';
import dataSource from '@/offlineServices/dbSource';
import {useEffect, useState} from 'react';

const useDbInitializer = () => {
  const [isDbReady, setIsDbReady] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const initializeDb = async () => {
      await dataSource
        .initialize()
        .then(() => {})
        .catch(error => {});
      setIsDbReady(true);
      toast.show.info('Db is ready');
    };

    initializeDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isDbReady};
};

export default useDbInitializer;
