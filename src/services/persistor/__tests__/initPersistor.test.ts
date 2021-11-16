import AsyncStorage from '@react-native-async-storage/async-storage';

import { initPersistor } from '@app/services/persistor';
import { queryClient } from '@app/services/queryClient';

describe('initPersistor tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should call get the cache from the async storage', async () => {
    const getItemSpy = jest.spyOn(AsyncStorage, 'getItem');
    initPersistor(queryClient);
    expect(getItemSpy).toBeCalledWith('REACT_QUERY_OFFLINE_CACHE');
  });
});
