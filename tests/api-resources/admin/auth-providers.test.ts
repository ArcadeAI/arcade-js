// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Arcade from '@arcadeai/arcadejs';
import { Response } from 'node-fetch';

const client = new Arcade({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authProviders', () => {
  test('create: only required params', async () => {
    const responsePromise = client.admin.authProviders.create({ id: 'id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.admin.authProviders.create({
      id: 'id',
      description: 'description',
      oauth2: {
        client_id: 'client_id',
        authorize_request: {
          endpoint: 'endpoint',
          auth_method: 'auth_method',
          method: 'method',
          params: { foo: 'string' },
          request_content_type: 'application/x-www-form-urlencoded',
          response_content_type: 'application/x-www-form-urlencoded',
          response_map: { foo: 'string' },
        },
        client_secret: 'client_secret',
        pkce: { code_challenge_method: 'code_challenge_method', enabled: true },
        refresh_request: {
          endpoint: 'endpoint',
          auth_method: 'auth_method',
          method: 'method',
          params: { foo: 'string' },
          request_content_type: 'application/x-www-form-urlencoded',
          response_content_type: 'application/x-www-form-urlencoded',
          response_map: { foo: 'string' },
        },
        scope_delimiter: ',',
        token_introspection_request: {
          endpoint: 'endpoint',
          triggers: { on_token_grant: true, on_token_refresh: true },
          auth_method: 'auth_method',
          method: 'method',
          params: { foo: 'string' },
          request_content_type: 'application/x-www-form-urlencoded',
          response_content_type: 'application/x-www-form-urlencoded',
          response_map: { foo: 'string' },
        },
        token_request: {
          endpoint: 'endpoint',
          auth_method: 'auth_method',
          method: 'method',
          params: { foo: 'string' },
          request_content_type: 'application/x-www-form-urlencoded',
          response_content_type: 'application/x-www-form-urlencoded',
          response_map: { foo: 'string' },
        },
        user_info_request: {
          endpoint: 'endpoint',
          triggers: { on_token_grant: true, on_token_refresh: true },
          auth_method: 'auth_method',
          method: 'method',
          params: { foo: 'string' },
          request_content_type: 'application/x-www-form-urlencoded',
          response_content_type: 'application/x-www-form-urlencoded',
          response_map: { foo: 'string' },
        },
      },
      provider_id: 'provider_id',
      status: 'status',
      type: 'type',
    });
  });

  test('list', async () => {
    const responsePromise = client.admin.authProviders.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.admin.authProviders.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Arcade.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = client.admin.authProviders.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.admin.authProviders.delete('id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Arcade.NotFoundError);
  });

  test('get', async () => {
    const responsePromise = client.admin.authProviders.get('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.admin.authProviders.get('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Arcade.NotFoundError,
    );
  });

  test('patch', async () => {
    const responsePromise = client.admin.authProviders.patch('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
