// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ArcadeAI from 'arcadejs';
import { Response } from 'node-fetch';

const client = new ArcadeAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  test('completions', async () => {
    const responsePromise = client.chat.completions({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
