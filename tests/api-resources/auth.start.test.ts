import type { APIResource } from '../../src/resource';
import { Auth } from '../../src/resources/auth';

describe('Auth.start', () => {
  let mockClient: any;
  let auth: Auth;

  beforeEach(() => {
    mockClient = {
      post: jest.fn(),
    };
    auth = new Auth(mockClient as APIResource['_client']);
  });

  const testCases = [
    {
      name: 'with default options (oauth2 provider type and empty scopes)',
      input: {
        userId: 'user123',
        provider: 'github',
      },
      expected: {
        auth_requirement: {
          provider_id: 'github',
          provider_type: 'oauth2',
          oauth2: {
            scopes: [],
          },
        },
        user_id: 'user123',
      },
    },
    {
      name: 'with explicit oauth2 provider type',
      input: {
        userId: 'user123',
        provider: 'github',
        options: { providerType: 'oauth2' },
      },
      expected: {
        auth_requirement: {
          provider_id: 'github',
          provider_type: 'oauth2',
          oauth2: {
            scopes: [],
          },
        },
        user_id: 'user123',
      },
    },
    {
      name: 'with custom provider type',
      input: {
        userId: 'user123',
        provider: 'github',
        options: { providerType: 'custom_type' },
      },
      expected: {
        auth_requirement: {
          provider_id: 'github',
          provider_type: 'custom_type',
          oauth2: {
            scopes: [],
          },
        },
        user_id: 'user123',
      },
    },
    {
      name: 'with scopes',
      input: {
        userId: 'user123',
        provider: 'github',
        options: { scopes: ['scope1', 'scope2'] },
      },
      expected: {
        auth_requirement: {
          provider_id: 'github',
          provider_type: 'oauth2',
          oauth2: {
            scopes: ['scope1', 'scope2'],
          },
        },
        user_id: 'user123',
      },
    },
  ];

  testCases.forEach(({ name, input, expected }) => {
    test(name, async () => {
      mockClient.post.mockResolvedValue({ status: 'pending' });

      await auth.start(input.userId, input.provider, input.options);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v1/auth/authorize',
        expect.objectContaining({ body: expected }),
      );
    });
  });
});
