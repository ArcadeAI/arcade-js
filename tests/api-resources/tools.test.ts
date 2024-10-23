// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Arcade from 'arcadejs';
import { Response } from 'node-fetch';

const client = new Arcade({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  test('list', async () => {
    const responsePromise = client.tools.list();
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
    await expect(client.tools.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Arcade.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tools.list({ limit: 0, offset: 0, toolkit: 'toolkit' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Arcade.NotFoundError);
  });

  test('authorize: only required params', async () => {
    const responsePromise = client.tools.authorize({ tool_name: 'tool_name', user_id: 'user_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('authorize: required and optional params', async () => {
    const response = await client.tools.authorize({
      tool_name: 'tool_name',
      user_id: 'user_id',
      tool_version: 'tool_version',
    });
  });

  test('execute: only required params', async () => {
    const responsePromise = client.tools.execute({ tool_name: 'tool_name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('execute: required and optional params', async () => {
    const response = await client.tools.execute({
      tool_name: 'tool_name',
      inputs: 'inputs',
      tool_version: 'tool_version',
      user_id: 'user_id',
    });
  });

  test('get: only required params', async () => {
    const responsePromise = client.tools.get({ toolId: 'toolId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
