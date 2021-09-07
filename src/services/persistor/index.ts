import { QueryClient } from 'react-query';
import Constants from 'expo-constants';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistor = createAsyncStoragePersistor({
  storage: AsyncStorage,
});

export function initPersistor(queryClient: QueryClient) {
  persistQueryClient({
    queryClient,
    persistor,
    buster: Constants.manifest?.extra?.['appVersion'],
  });
}
