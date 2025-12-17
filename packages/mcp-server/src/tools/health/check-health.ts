// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'health',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/health',
  operationId: 'arcade-health',
};

export const tool: Tool = {
  name: 'check_health',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCheck if Arcade Engine is healthy\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/health_schema',\n  $defs: {\n    health_schema: {\n      type: 'object',\n      properties: {\n        healthy: {\n          type: 'boolean'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.health.check()));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
