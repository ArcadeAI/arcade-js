// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'admin.secrets',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/admin/secrets/{secret_key}',
  operationId: 'secrets-upsert',
};

export const tool: Tool = {
  name: 'create_admin_secrets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate or update a secret\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/secret_response',\n  $defs: {\n    secret_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        binding: {\n          type: 'object',\n          properties: {\n            id: {\n              type: 'string'\n            },\n            type: {\n              type: 'string',\n              enum: [                'static',\n                'tenant',\n                'project',\n                'account'\n              ]\n            }\n          }\n        },\n        created_at: {\n          type: 'string'\n        },\n        description: {\n          type: 'string'\n        },\n        hint: {\n          type: 'string'\n        },\n        key: {\n          type: 'string'\n        },\n        last_accessed_at: {\n          type: 'string'\n        },\n        updated_at: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      secret_key: {
        type: 'string',
      },
      value: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['secret_key', 'value'],
  },
  annotations: {},
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { secret_key, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.admin.secrets.create(secret_key, body)),
    );
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
