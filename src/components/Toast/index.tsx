import React, {FC, useEffect, useRef, useState} from 'react';
import {useToast as useRNToast} from 'react-native-toast-notifications';
import Toast from 'react-native-toast-notifications/src/toast-container';
export interface ToastProps {
  children: React.ReactNode;
}

import ToastContext from 'react-native-toast-notifications/src/hook/context';
import ToastItem from './toastItem';
type PropsWithChildren = {
  children: React.ReactNode;
};

export const ToastProvider: FC<PropsWithChildren> = ({children}) => {
  const toastRef = useRef(null);
  const [refState, setRefState] = useState(null);

  useEffect(() => {
    setRefState(toastRef.current as any);
  }, []);

  return (
    <ToastContext.Provider value={refState as any}>
      <Toast
        ref={toastRef}
        placement="top"
        offsetTop={64}
        duration={2000}
        animationDuration={300}
        swipeEnabled={false}
        renderType={{
          error: _toast => (
            <ToastItem
              message={_toast.message}
              title={_toast.data.title}
              type={'error'}
            />
          ),
          success: _toast => (
            <ToastItem
              message={_toast.message}
              title={_toast.data.title}
              type={'success'}
            />
          ),
          info: _toast => (
            <ToastItem
              message={_toast.message}
              title={_toast.data.title}
              type={'info'}
            />
          ),
          warning: _toast => (
            <ToastItem
              message={_toast.message}
              title={_toast.data.title}
              type={'warning'}
            />
          ),
        }}
      />
      {refState && children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  const toast = useRNToast();

  const show = (
    message: string,
    type: 'info' | 'success' | 'error' | 'warning' = 'info',
    title?: string,
  ) => {
    const duration = 2000;

    toast &&
      toast.show(message, {
        type,
        duration,
        data: {title},
      });
  };

  show.error = (message: string) => show(message, 'error');
  show.success = (message: string) => show(message, 'success');
  show.info = (message: string) => show(message, 'info');
  show.warning = (message: string) => show(message, 'warning');

  return {...toast, show};
};
