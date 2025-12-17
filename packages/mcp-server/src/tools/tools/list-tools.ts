// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'tools',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/tools',
  operationId: 'tools-list-static',
};

export const tool: Tool = {
  name: 'list_tools',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns a page of tools from the engine configuration, optionally filtered by toolkit\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/tool_definition'\n      }\n    },\n    limit: {\n      type: 'integer'\n    },\n    offset: {\n      type: 'integer'\n    },\n    page_count: {\n      type: 'integer'\n    },\n    total_count: {\n      type: 'integer'\n    }\n  },\n  $defs: {\n    tool_definition: {\n      type: 'object',\n      properties: {\n        fully_qualified_name: {\n          type: 'string'\n        },\n        input: {\n          type: 'object',\n          properties: {\n            parameters: {\n              type: 'array',\n              items: {\n                type: 'object',\n                properties: {\n                  name: {\n                    type: 'string'\n                  },\n                  value_schema: {\n                    $ref: '#/$defs/value_schema'\n                  },\n                  description: {\n                    type: 'string'\n                  },\n                  inferrable: {\n                    type: 'boolean'\n                  },\n                  required: {\n                    type: 'boolean'\n                  }\n                },\n                required: [                  'name',\n                  'value_schema'\n                ]\n              }\n            }\n          }\n        },\n        name: {\n          type: 'string'\n        },\n        qualified_name: {\n          type: 'string'\n        },\n        toolkit: {\n          type: 'object',\n          properties: {\n            name: {\n              type: 'string'\n            },\n            description: {\n              type: 'string'\n            },\n            version: {\n              type: 'string'\n            }\n          },\n          required: [            'name'\n          ]\n        },\n        description: {\n          type: 'string'\n        },\n        formatted_schema: {\n          type: 'object',\n          additionalProperties: true\n        },\n        output: {\n          type: 'object',\n          properties: {\n            available_modes: {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            description: {\n              type: 'string'\n            },\n            value_schema: {\n              $ref: '#/$defs/value_schema'\n            }\n          }\n        },\n        requirements: {\n          type: 'object',\n          properties: {\n            authorization: {\n              type: 'object',\n              properties: {\n                id: {\n                  type: 'string'\n                },\n                oauth2: {\n                  type: 'object',\n                  properties: {\n                    scopes: {\n                      type: 'array',\n                      items: {\n                        type: 'string'\n                      }\n                    }\n                  }\n                },\n                provider_id: {\n                  type: 'string'\n                },\n                provider_type: {\n                  type: 'string'\n                },\n                status: {\n                  type: 'string',\n                  enum: [                    'active',\n                    'inactive'\n                  ]\n                },\n                status_reason: {\n                  type: 'string'\n                },\n                token_status: {\n                  type: 'string',\n                  enum: [                    'not_started',\n                    'pending',\n                    'completed',\n                    'failed'\n                  ]\n                }\n              }\n            },\n            met: {\n              type: 'boolean'\n            },\n            secrets: {\n              type: 'array',\n              items: {\n                type: 'object',\n                properties: {\n                  key: {\n                    type: 'string'\n                  },\n                  met: {\n                    type: 'boolean'\n                  },\n                  status_reason: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'key'\n                ]\n              }\n            }\n          }\n        }\n      },\n      required: [        'fully_qualified_name',\n        'input',\n        'name',\n        'qualified_name',\n        'toolkit'\n      ]\n    },\n    value_schema: {\n      type: 'object',\n      properties: {\n        val_type: {\n          type: 'string'\n        },\n        enum: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        inner_val_type: {\n          type: 'string'\n        }\n      },\n      required: [        'val_type'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      include_all_versions: {
        type: 'boolean',
        description: 'Include all versions of each tool',
      },
      include_format: {
        type: 'array',
        description: 'Comma separated tool formats that will be included in the response.',
        items: {
          type: 'string',
          enum: ['arcade', 'openai', 'anthropic'],
        },
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
  const response = await client.tools.list(body).asResponse();
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
