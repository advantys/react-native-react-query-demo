import * as persistQueryClientExp from 'react-query/persistQueryClient-experimental';
import { queryClient } from '@app/services/queryClient';
import { initPersistor } from '@app/services/persistor/index.web';

describe('initPersistor in web mode tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should call persistQueryClient', async () => {
    // Mock web platform
    jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'web',
      select: () => void 0,
    }));

    const persistQueryClientSpy = jest.spyOn(
      persistQueryClientExp,
      'persistQueryClient'
    );

    initPersistor(queryClient);

    expect(persistQueryClientSpy).toBeCalled();
  });
});
