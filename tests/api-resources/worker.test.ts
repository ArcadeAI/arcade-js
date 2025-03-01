// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Arcade from '@arcadeai/arcadejs';
import { Response } from 'node-fetch';

const client = new Arcade({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource worker', () => {
  test('create: only required params', async () => {
    const responsePromise = client.worker.create({ id: 'id', enabled: true });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.worker.create({
      id: 'id',
      enabled: true,
      http: { retry: 0, secret: 'secret', timeout: 1, uri: 'uri' },
    });
  });

  test('update', async () => {
    const responsePromise = client.worker.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.worker.list();
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
    await expect(client.worker.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Arcade.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = client.worker.delete('id');
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
    await expect(client.worker.delete('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Arcade.NotFoundError,
    );
  });

  test('health', async () => {
    const responsePromise = client.worker.health('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('health: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.worker.health('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Arcade.NotFoundError,
    );
  });
});
