// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ArcadeAI from 'arcadejs';
import { Response } from 'node-fetch';

const client = new ArcadeAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource auth', () => {
  test('authorize: only required params', async () => {
    const responsePromise = client.auth.authorize({
      auth_requirement: { provider: 'provider' },
      user_id: 'user_id',
    });
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
        provider: 'provider',
        oauth2: { authority: 'authority', scopes: ['string', 'string', 'string'] },
      },
      user_id: 'user_id',
    });
  });

  test('status: only required params', async () => {
    const responsePromise = client.auth.status({ authorizationID: 'authorizationID' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('status: required and optional params', async () => {
    const response = await client.auth.status({ authorizationID: 'authorizationID', scopes: 'scopes' });
  });
});
