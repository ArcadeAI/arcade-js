// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'workers',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/workers/{id}',
  operationId: 'workers-delete',
};

export const tool: Tool = {
  name: 'delete_workers',
  description: 'Delete a worker',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.workers.delete(id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
