import { Platform } from 'react-native';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const storagePersister =
  Platform.OS === 'web'
    ? createSyncStoragePersister({
        storage: window.localStorage,
      })
    : createAsyncStoragePersister({
        storage: require('@react-native-async-storage/async-storage').default,
      });
