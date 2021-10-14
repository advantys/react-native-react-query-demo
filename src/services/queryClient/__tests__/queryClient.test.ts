import { queryClient } from '@app/services/queryClient';

describe('queryClient tests', () => {
  it('Should create a query client', async () => {
    expect(queryClient.getDefaultOptions().queries?.suspense).toBeTruthy();
  });
});
