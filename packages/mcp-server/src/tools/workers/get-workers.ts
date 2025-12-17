// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'workers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/workers/{id}',
  operationId: 'workers-get',
};

export const tool: Tool = {
  name: 'get_workers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a worker by ID\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/worker_response',\n  $defs: {\n    worker_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        binding: {\n          type: 'object',\n          properties: {\n            id: {\n              type: 'string'\n            },\n            type: {\n              type: 'string',\n              enum: [                'static',\n                'tenant',\n                'project',\n                'account'\n              ]\n            }\n          }\n        },\n        enabled: {\n          type: 'boolean'\n        },\n        http: {\n          type: 'object',\n          properties: {\n            retry: {\n              type: 'integer'\n            },\n            secret: {\n              type: 'object',\n              properties: {\n                binding: {\n                  type: 'string',\n                  enum: [                    'static',\n                    'tenant',\n                    'project',\n                    'account'\n                  ]\n                },\n                editable: {\n                  type: 'boolean'\n                },\n                exists: {\n                  type: 'boolean'\n                },\n                hint: {\n                  type: 'string'\n                },\n                value: {\n                  type: 'string'\n                }\n              }\n            },\n            timeout: {\n              type: 'integer'\n            },\n            uri: {\n              type: 'string'\n            }\n          }\n        },\n        managed: {\n          type: 'boolean'\n        },\n        mcp: {\n          type: 'object',\n          properties: {\n            headers: {\n              type: 'object',\n              additionalProperties: true\n            },\n            oauth2: {\n              type: 'object',\n              properties: {\n                authorization_url: {\n                  type: 'string'\n                },\n                client_id: {\n                  type: 'string'\n                },\n                client_secret: {\n                  type: 'object',\n                  properties: {\n                    binding: {\n                      type: 'string',\n                      enum: [                        'static',\n                        'tenant',\n                        'project',\n                        'account'\n                      ]\n                    },\n                    editable: {\n                      type: 'boolean'\n                    },\n                    exists: {\n                      type: 'boolean'\n                    },\n                    hint: {\n                      type: 'string'\n                    },\n                    value: {\n                      type: 'string'\n                    }\n                  }\n                },\n                redirect_uri: {\n                  type: 'string'\n                }\n              }\n            },\n            retry: {\n              type: 'integer'\n            },\n            secrets: {\n              type: 'object',\n              additionalProperties: true\n            },\n            timeout: {\n              type: 'integer'\n            },\n            uri: {\n              type: 'string'\n            }\n          }\n        },\n        requirements: {\n          type: 'object',\n          properties: {\n            authorization: {\n              type: 'object',\n              properties: {\n                met: {\n                  type: 'boolean'\n                },\n                oauth2: {\n                  type: 'object',\n                  properties: {\n                    met: {\n                      type: 'boolean'\n                    }\n                  }\n                }\n              }\n            },\n            met: {\n              type: 'boolean'\n            }\n          }\n        },\n        type: {\n          type: 'string',\n          enum: [            'http',\n            'mcp',\n            'unknown'\n          ]\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
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
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.workers.get(id)));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
