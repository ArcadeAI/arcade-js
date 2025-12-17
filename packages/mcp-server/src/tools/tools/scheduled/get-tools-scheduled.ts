// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'tools.scheduled',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/scheduled_tools/{id}',
  operationId: 'tool-scheduled-get',
};

export const tool: Tool = {
  name: 'get_tools_scheduled',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns the details for a specific scheduled tool execution\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/scheduled_get_response',\n  $defs: {\n    scheduled_get_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        attempts: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/tool_execution_attempt'\n          }\n        },\n        created_at: {\n          type: 'string'\n        },\n        execution_status: {\n          type: 'string'\n        },\n        execution_type: {\n          type: 'string'\n        },\n        finished_at: {\n          type: 'string'\n        },\n        input: {\n          type: 'object',\n          additionalProperties: true\n        },\n        run_at: {\n          type: 'string'\n        },\n        started_at: {\n          type: 'string'\n        },\n        tool_name: {\n          type: 'string'\n        },\n        toolkit_name: {\n          type: 'string'\n        },\n        toolkit_version: {\n          type: 'string'\n        },\n        updated_at: {\n          type: 'string'\n        },\n        user_id: {\n          type: 'string'\n        }\n      }\n    },\n    tool_execution_attempt: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        finished_at: {\n          type: 'string'\n        },\n        output: {\n          type: 'object',\n          properties: {\n            authorization: {\n              $ref: '#/$defs/authorization_response'\n            },\n            error: {\n              type: 'object',\n              properties: {\n                can_retry: {\n                  type: 'boolean'\n                },\n                kind: {\n                  type: 'string',\n                  enum: [                    'TOOLKIT_LOAD_FAILED',\n                    'TOOL_DEFINITION_BAD_DEFINITION',\n                    'TOOL_DEFINITION_BAD_INPUT_SCHEMA',\n                    'TOOL_DEFINITION_BAD_OUTPUT_SCHEMA',\n                    'TOOL_REQUIREMENTS_NOT_MET',\n                    'TOOL_RUNTIME_BAD_INPUT_VALUE',\n                    'TOOL_RUNTIME_BAD_OUTPUT_VALUE',\n                    'TOOL_RUNTIME_RETRY',\n                    'TOOL_RUNTIME_CONTEXT_REQUIRED',\n                    'TOOL_RUNTIME_FATAL',\n                    'UPSTREAM_RUNTIME_BAD_REQUEST',\n                    'UPSTREAM_RUNTIME_AUTH_ERROR',\n                    'UPSTREAM_RUNTIME_NOT_FOUND',\n                    'UPSTREAM_RUNTIME_VALIDATION_ERROR',\n                    'UPSTREAM_RUNTIME_RATE_LIMIT',\n                    'UPSTREAM_RUNTIME_SERVER_ERROR',\n                    'UPSTREAM_RUNTIME_UNMAPPED',\n                    'UNKNOWN'\n                  ]\n                },\n                message: {\n                  type: 'string'\n                },\n                additional_prompt_content: {\n                  type: 'string'\n                },\n                developer_message: {\n                  type: 'string'\n                },\n                extra: {\n                  type: 'object',\n                  additionalProperties: true\n                },\n                retry_after_ms: {\n                  type: 'integer'\n                },\n                stacktrace: {\n                  type: 'string'\n                },\n                status_code: {\n                  type: 'integer'\n                }\n              },\n              required: [                'can_retry',\n                'kind',\n                'message'\n              ]\n            },\n            logs: {\n              type: 'array',\n              items: {\n                type: 'object',\n                properties: {\n                  level: {\n                    type: 'string'\n                  },\n                  message: {\n                    type: 'string'\n                  },\n                  subtype: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'level',\n                  'message'\n                ]\n              }\n            },\n            value: {\n              type: 'object',\n              additionalProperties: true\n            }\n          }\n        },\n        started_at: {\n          type: 'string'\n        },\n        success: {\n          type: 'boolean'\n        },\n        system_error_message: {\n          type: 'string'\n        }\n      }\n    },\n    authorization_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        context: {\n          $ref: '#/$defs/authorization_context'\n        },\n        provider_id: {\n          type: 'string'\n        },\n        scopes: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        status: {\n          type: 'string',\n          enum: [            'not_started',\n            'pending',\n            'completed',\n            'failed'\n          ]\n        },\n        url: {\n          type: 'string'\n        },\n        user_id: {\n          type: 'string'\n        }\n      }\n    },\n    authorization_context: {\n      type: 'object',\n      properties: {\n        token: {\n          type: 'string'\n        },\n        user_info: {\n          type: 'object',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.tools.scheduled.get(id)));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
