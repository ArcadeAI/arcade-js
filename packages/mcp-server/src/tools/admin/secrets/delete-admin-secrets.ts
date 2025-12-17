// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'admin.secrets',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/admin/secrets/{secret_id}',
  operationId: 'secrets-delete',
};

export const tool: Tool = {
  name: 'delete_admin_secrets',
  description: 'Delete a secret by its ID',
  inputSchema: {
    type: 'object',
    properties: {
      secret_id: {
        type: 'string',
      },
    },
    required: ['secret_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { secret_id, ...body } = args as any;
  const response = await client.admin.secrets.delete(secret_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
