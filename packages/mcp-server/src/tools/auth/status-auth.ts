// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'auth',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/auth/status',
  operationId: 'auth-status',
};

export const tool: Tool = {
  name: 'status_auth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nChecks the status of an ongoing authorization process for a specific tool.\nIf 'wait' param is present, does not respond until either the auth status becomes completed or the timeout is reached.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/authorization_response',\n  $defs: {\n    authorization_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        context: {\n          $ref: '#/$defs/authorization_context'\n        },\n        provider_id: {\n          type: 'string'\n        },\n        scopes: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        status: {\n          type: 'string',\n          enum: [            'not_started',\n            'pending',\n            'completed',\n            'failed'\n          ]\n        },\n        url: {\n          type: 'string'\n        },\n        user_id: {\n          type: 'string'\n        }\n      }\n    },\n    authorization_context: {\n      type: 'object',\n      properties: {\n        token: {\n          type: 'string'\n        },\n        user_info: {\n          type: 'object',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Authorization ID',
      },
      wait: {
        type: 'integer',
        description: 'Timeout in seconds (max 59)',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.auth.status(body)));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
