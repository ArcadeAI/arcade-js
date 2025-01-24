import type { APIResource } from '../../src/resource';
import { Auth, DEFAULT_LONGPOLL_WAIT_TIME } from '../../src/resources/auth';

import type * as Shared from '../../src/resources/shared';

describe('Auth.waitForCompletion', () => {
  let mockClient: any;
  let auth: Auth;

  beforeEach(() => {
    mockClient = {
      get: jest.fn(),
    };
    auth = new Auth(mockClient as APIResource['_client']);
  });

  test('with AuthorizationResponse input', async () => {
    const authResponse: Partial<Shared.AuthAuthorizationResponse> = {
      id: 'auth123',
      status: 'pending',
    };

    mockClient.get
      .mockResolvedValueOnce({ ...authResponse, status: 'pending' })
      .mockResolvedValueOnce({ ...authResponse, status: 'completed' });

    await auth.waitForCompletion(authResponse as Shared.AuthAuthorizationResponse);

    expect(mockClient.get).toHaveBeenCalledWith(
      '/v1/auth/status',
      expect.objectContaining({
        query: {
          id: 'auth123',
          wait: DEFAULT_LONGPOLL_WAIT_TIME,
        },
      }),
    );
  });

  test('with string ID input', async () => {
    mockClient.get
      .mockResolvedValueOnce({ status: 'pending' })
      .mockResolvedValueOnce({ status: 'completed' });

    await auth.waitForCompletion('auth123');

    expect(mockClient.get).toHaveBeenCalledWith(
      '/v1/auth/status',
      expect.objectContaining({
        query: {
          id: 'auth123',
          wait: DEFAULT_LONGPOLL_WAIT_TIME,
        },
      }),
    );
  });

  test('throws error for missing authorization ID', async () => {
    const authResponse: Partial<Shared.AuthAuthorizationResponse> = {
      status: 'pending',
    };

    await expect(auth.waitForCompletion(authResponse as Shared.AuthAuthorizationResponse)).rejects.toThrow(
      'Authorization ID is required',
    );
  });

  test('polls until completion', async () => {
    mockClient.get
      .mockResolvedValueOnce({ status: 'pending' })
      .mockResolvedValueOnce({ status: 'pending' })
      .mockResolvedValueOnce({ status: 'completed' });

    await auth.waitForCompletion('auth123');

    expect(mockClient.get).toHaveBeenCalledTimes(3);
    expect(mockClient.get).toHaveBeenCalledWith(
      '/v1/auth/status',
      expect.objectContaining({
        query: {
          id: 'auth123',
          wait: DEFAULT_LONGPOLL_WAIT_TIME,
        },
      }),
    );
  });
});
