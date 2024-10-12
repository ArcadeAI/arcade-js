// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ArcadeEngine from 'arcade-engine';
import { Response } from 'node-fetch';

const client = new ArcadeEngine({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authorization', () => {
  test('authorize: only required params', async () => {
    const responsePromise = client.authorization.authorize({
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
    const response = await client.authorization.authorize({
      auth_requirement: {
        provider: 'provider',
        oauth2: { authority: 'authority', scopes: ['string', 'string', 'string'] },
      },
      user_id: 'user_id',
    });
  });

  test('status: only required params', async () => {
    const responsePromise = client.authorization.status({ authorizationID: 'authorizationID' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('status: required and optional params', async () => {
    const response = await client.authorization.status({
      authorizationID: 'authorizationID',
      scopes: 'scopes',
    });
  });
});
