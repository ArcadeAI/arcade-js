// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Arcade from 'arcadejs';
import { Response } from 'node-fetch';

const client = new Arcade({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource definition', () => {
  test('get: only required params', async () => {
    const responsePromise = client.tools.definition.get({ directorId: 'directorId', toolId: 'toolId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: required and optional params', async () => {
    const response = await client.tools.definition.get({ directorId: 'directorId', toolId: 'toolId' });
  });
});