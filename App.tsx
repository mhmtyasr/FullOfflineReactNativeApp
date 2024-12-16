/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ToastProvider from './src/components/Toast';
import Navigator from './src/components/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {SyncProvider} from '@/components/SyncInitializer';
import {InitializerProvider} from './src/components/Initializer';

export const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView style={styles.container}>
          <ToastProvider>
            <InitializerProvider>
              <SyncProvider>
                <NavigationContainer>
                  <Navigator />
                </NavigationContainer>
              </SyncProvider>
            </InitializerProvider>
          </ToastProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
