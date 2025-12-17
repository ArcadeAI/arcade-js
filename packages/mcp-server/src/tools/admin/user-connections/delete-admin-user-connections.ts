// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'admin.user_connections',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/admin/user_connections/{id}',
  operationId: 'auth-connections-delete',
};

export const tool: Tool = {
  name: 'delete_admin_user_connections',
  description: 'Delete a user/auth provider connection',
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
  const response = await client.admin.userConnections.delete(id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
