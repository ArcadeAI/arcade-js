// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Arcade from '@arcadeai/arcadejs';
import { Response } from 'node-fetch';

const client = new Arcade({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource auth', () => {
  test('authorize: only required params', async () => {
    const responsePromise = client.auth.authorize({ auth_requirement: {}, user_id: 'user_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('authorize: required and optional params', async () => {
    const response = await client.auth.authorize({
      auth_requirement: {
        oauth2: { scopes: ['string', 'string', 'string'] },
        provider_id: 'provider_id',
        provider_type: 'provider_type',
      },
      user_id: 'user_id',
    });
  });

  test('status: only required params', async () => {
    const responsePromise = client.auth.status({ authorizationId: 'authorizationId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('status: required and optional params', async () => {
    const response = await client.auth.status({
      authorizationId: 'authorizationId',
      scopes: 'scopes',
      wait: 0,
    });
  });
});
