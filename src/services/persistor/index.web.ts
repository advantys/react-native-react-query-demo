import { QueryClient } from 'react-query';
import Constants from 'expo-constants';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

const persistor = createWebStoragePersistor({
  storage: window.localStorage,
});

export function initPersistor(queryClient: QueryClient) {
  persistQueryClient({
    queryClient,
    persistor,
    buster: Constants.manifest?.extra?.['appVersion'],
  });
}
