// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'admin.secrets',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/admin/secrets',
  operationId: 'secrets-list',
};

export const tool: Tool = {
  name: 'list_admin_secrets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList all secrets that are visible to the caller\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/secret_list_response',\n  $defs: {\n    secret_list_response: {\n      type: 'object',\n      properties: {\n        items: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/secret_response'\n          }\n        },\n        limit: {\n          type: 'integer'\n        },\n        offset: {\n          type: 'integer'\n        },\n        page_count: {\n          type: 'integer'\n        },\n        total_count: {\n          type: 'integer'\n        }\n      }\n    },\n    secret_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        binding: {\n          type: 'object',\n          properties: {\n            id: {\n              type: 'string'\n            },\n            type: {\n              type: 'string',\n              enum: [                'static',\n                'tenant',\n                'project',\n                'account'\n              ]\n            }\n          }\n        },\n        created_at: {\n          type: 'string'\n        },\n        description: {\n          type: 'string'\n        },\n        hint: {\n          type: 'string'\n        },\n        key: {\n          type: 'string'\n        },\n        last_accessed_at: {\n          type: 'string'\n        },\n        updated_at: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.admin.secrets.list()));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
