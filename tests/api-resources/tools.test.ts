// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ArcadeEngine from 'arcade-engine';
import { Response } from 'node-fetch';

const client = new ArcadeEngine({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
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

  test('definition: only required params', async () => {
    const responsePromise = client.tools.definition({ director_id: 'director_id', tool_id: 'tool_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('definition: required and optional params', async () => {
    const response = await client.tools.definition({ director_id: 'director_id', tool_id: 'tool_id' });
  });

  test('execute: only required params', async () => {
    const responsePromise = client.tools.execute({
      inputs: 'inputs',
      tool_name: 'tool_name',
      tool_version: 'tool_version',
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

  test('execute: required and optional params', async () => {
    const response = await client.tools.execute({
      inputs: 'inputs',
      tool_name: 'tool_name',
      tool_version: 'tool_version',
      user_id: 'user_id',
    });
  });
});
