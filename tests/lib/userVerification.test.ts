import { Headers } from 'node-fetch';
import { Arcade } from '../../src/index';

describe('UserVerification', () => {
  const client = new Arcade({
    apiKey: 'test-api-key',
  });

  describe('confirm', () => {
    it('should make a POST request to the default coordinator', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          auth_id: 'ac_2zKml...',
          next_uri: 'https://example.com/callback',
        }),
      });

      // Override fetch for testing
      (client as any).fetch = mockFetch;

      const response = await client.userVerification.confirm('flow_123', 'user_456');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://cloud.arcade.dev/api/v1/oauth/confirm_user',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            authorization: 'Bearer test-api-key',
            'content-type': 'application/json',
          }),
          body: JSON.stringify(
            {
              flow_id: 'flow_123',
              user_id: 'user_456',
            },
            null,
            2,
          ),
        }),
      );

      expect(response).toEqual({
        auth_id: 'ac_2zKml...',
        next_uri: 'https://example.com/callback',
      });
    });

    it('should use custom host when provided', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          auth_id: 'ac_custom...',
          next_uri: 'https://custom.example.com/callback',
        }),
      });

      (client as any).fetch = mockFetch;

      const response = await client.userVerification.confirm('flow_789', 'user_012', {
        baseURL: 'https://self-hosted.example.com',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://self-hosted.example.com/api/v1/oauth/confirm_user',
        expect.any(Object),
      );

      expect(response).toEqual({
        auth_id: 'ac_custom...',
        next_uri: 'https://custom.example.com/callback',
      });
    });

    it('should handle trailing slash in custom host', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({
          auth_id: 'ac_slash...',
          next_uri: 'https://example.com',
        }),
      });

      (client as any).fetch = mockFetch;

      await client.userVerification.confirm('flow_abc', 'user_def', {
        baseURL: 'https://trailing-slash.example.com/',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://trailing-slash.example.com/api/v1/oauth/confirm_user',
        expect.any(Object),
      );
    });

    it('should handle error responses', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        headers: new Headers({ 'content-type': 'application/json' }),
        text: async () =>
          JSON.stringify({
            code: 400,
            msg: 'An error occurred during verification',
          }),
      });

      (client as any).fetch = mockFetch;

      await expect(client.userVerification.confirm('invalid_flow', 'invalid_user')).rejects.toThrow();
    });
  });
});
