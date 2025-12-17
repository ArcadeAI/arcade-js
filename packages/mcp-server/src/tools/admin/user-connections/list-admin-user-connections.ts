// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'admin.user_connections',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/admin/user_connections',
  operationId: 'auth-connections-list',
};

export const tool: Tool = {
  name: 'list_admin_user_connections',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList all auth connections\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/user_connection_response'\n      }\n    },\n    limit: {\n      type: 'integer'\n    },\n    offset: {\n      type: 'integer'\n    },\n    page_count: {\n      type: 'integer'\n    },\n    total_count: {\n      type: 'integer'\n    }\n  },\n  $defs: {\n    user_connection_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        connection_id: {\n          type: 'string'\n        },\n        connection_status: {\n          type: 'string'\n        },\n        provider_description: {\n          type: 'string'\n        },\n        provider_id: {\n          type: 'string'\n        },\n        provider_type: {\n          type: 'string'\n        },\n        provider_user_info: {\n          type: 'object',\n          additionalProperties: true\n        },\n        scopes: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        user_id: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description: 'Page size',
      },
      offset: {
        type: 'integer',
        description: 'Page offset',
      },
      provider: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Provider ID',
          },
        },
      },
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User ID',
          },
        },
      },
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
  const { jq_filter, ...body } = args as any;
  const response = await client.admin.userConnections.list(body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
