// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'tools.formatted',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/formatted_tools',
  operationId: 'tools-list-formatted',
};

export const tool: Tool = {
  name: 'list_tools_formatted',
  description:
    'Returns a page of tools from the engine configuration, optionally filtered by toolkit, formatted for a specific provider',
  inputSchema: {
    type: 'object',
    properties: {
      format: {
        type: 'string',
        description: 'Provider format',
      },
      include_all_versions: {
        type: 'boolean',
        description: 'Include all versions of each tool',
      },
      limit: {
        type: 'integer',
        description: 'Number of items to return (default: 25, max: 100)',
      },
      offset: {
        type: 'integer',
        description: 'Offset from the start of the list (default: 0)',
      },
      toolkit: {
        type: 'string',
        description: 'Toolkit name',
      },
      user_id: {
        type: 'string',
        description: 'User ID',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.tools.formatted.list(body)) as object);
};

export default { metadata, tool, handler };
