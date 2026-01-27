// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Arcade from '@arcadeai/arcadejs';

const client = new Arcade({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource formatted', () => {
  test('list', async () => {
    const responsePromise = client.tools.formatted.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tools.formatted.list(
        {
          format: 'format',
          include_all_versions: true,
          limit: 0,
          offset: 0,
          toolkit: 'toolkit',
          user_id: 'user_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Arcade.NotFoundError);
  });

  test('get', async () => {
    const responsePromise = client.tools.formatted.get('name');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tools.formatted.get(
        'name',
        { format: 'format', user_id: 'user_id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Arcade.NotFoundError);
  });
});
