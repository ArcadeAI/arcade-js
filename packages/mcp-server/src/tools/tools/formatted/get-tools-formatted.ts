// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'tools.formatted',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/formatted_tools/{name}',
  operationId: 'tool-spec-formatted',
};

export const tool: Tool = {
  name: 'get_tools_formatted',
  description: 'Returns the formatted tool specification for a specific tool, given a provider',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      format: {
        type: 'string',
        description: 'Provider format',
      },
      user_id: {
        type: 'string',
        description: 'User ID',
      },
    },
    required: ['name'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { name, ...body } = args as any;
  return asTextContentResult((await client.tools.formatted.get(name, body)) as object);
};

export default { metadata, tool, handler };
