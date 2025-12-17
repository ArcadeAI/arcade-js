// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from '@arcadeai/arcadejs';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['x-arcade-api-key']) ?
      req.headers['x-arcade-api-key'][0]
    : req.headers['x-arcade-api-key'];
  return { apiKey };
};
