// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'tools',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/tools/execute',
  operationId: 'tool-execute',
};

export const tool: Tool = {
  name: 'execute_tools',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nExecutes a tool by name and arguments\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/execute_tool_response',\n  $defs: {\n    execute_tool_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        duration: {\n          type: 'number'\n        },\n        execution_id: {\n          type: 'string'\n        },\n        execution_type: {\n          type: 'string'\n        },\n        finished_at: {\n          type: 'string'\n        },\n        output: {\n          type: 'object',\n          properties: {\n            authorization: {\n              $ref: '#/$defs/authorization_response'\n            },\n            error: {\n              type: 'object',\n              properties: {\n                can_retry: {\n                  type: 'boolean'\n                },\n                kind: {\n                  type: 'string',\n                  enum: [                    'TOOLKIT_LOAD_FAILED',\n                    'TOOL_DEFINITION_BAD_DEFINITION',\n                    'TOOL_DEFINITION_BAD_INPUT_SCHEMA',\n                    'TOOL_DEFINITION_BAD_OUTPUT_SCHEMA',\n                    'TOOL_REQUIREMENTS_NOT_MET',\n                    'TOOL_RUNTIME_BAD_INPUT_VALUE',\n                    'TOOL_RUNTIME_BAD_OUTPUT_VALUE',\n                    'TOOL_RUNTIME_RETRY',\n                    'TOOL_RUNTIME_CONTEXT_REQUIRED',\n                    'TOOL_RUNTIME_FATAL',\n                    'UPSTREAM_RUNTIME_BAD_REQUEST',\n                    'UPSTREAM_RUNTIME_AUTH_ERROR',\n                    'UPSTREAM_RUNTIME_NOT_FOUND',\n                    'UPSTREAM_RUNTIME_VALIDATION_ERROR',\n                    'UPSTREAM_RUNTIME_RATE_LIMIT',\n                    'UPSTREAM_RUNTIME_SERVER_ERROR',\n                    'UPSTREAM_RUNTIME_UNMAPPED',\n                    'UNKNOWN'\n                  ]\n                },\n                message: {\n                  type: 'string'\n                },\n                additional_prompt_content: {\n                  type: 'string'\n                },\n                developer_message: {\n                  type: 'string'\n                },\n                extra: {\n                  type: 'object',\n                  additionalProperties: true\n                },\n                retry_after_ms: {\n                  type: 'integer'\n                },\n                stacktrace: {\n                  type: 'string'\n                },\n                status_code: {\n                  type: 'integer'\n                }\n              },\n              required: [                'can_retry',\n                'kind',\n                'message'\n              ]\n            },\n            logs: {\n              type: 'array',\n              items: {\n                type: 'object',\n                properties: {\n                  level: {\n                    type: 'string'\n                  },\n                  message: {\n                    type: 'string'\n                  },\n                  subtype: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'level',\n                  'message'\n                ]\n              }\n            },\n            value: {\n              type: 'object',\n              additionalProperties: true\n            }\n          }\n        },\n        run_at: {\n          type: 'string'\n        },\n        status: {\n          type: 'string'\n        },\n        success: {\n          type: 'boolean',\n          description: 'Whether the request was successful.\\nFor immediately-executed requests, this will be true if the tool call succeeded.\\nFor scheduled requests, this will be true if the request was scheduled successfully.'\n        }\n      }\n    },\n    authorization_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        context: {\n          $ref: '#/$defs/authorization_context'\n        },\n        provider_id: {\n          type: 'string'\n        },\n        scopes: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        status: {\n          type: 'string',\n          enum: [            'not_started',\n            'pending',\n            'completed',\n            'failed'\n          ]\n        },\n        url: {\n          type: 'string'\n        },\n        user_id: {\n          type: 'string'\n        }\n      }\n    },\n    authorization_context: {\n      type: 'object',\n      properties: {\n        token: {\n          type: 'string'\n        },\n        user_info: {\n          type: 'object',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      tool_name: {
        type: 'string',
      },
      include_error_stacktrace: {
        type: 'boolean',
        description:
          'Whether to include the error stacktrace in the response. If not provided, the error stacktrace is not included.',
      },
      input: {
        type: 'object',
        description: 'JSON input to the tool, if any',
        additionalProperties: true,
      },
      run_at: {
        type: 'string',
        description:
          'The time at which the tool should be run (optional). If not provided, the tool is run immediately. Format ISO 8601: YYYY-MM-DDTHH:MM:SS',
      },
      tool_version: {
        type: 'string',
        description: 'The tool version to use (optional). If not provided, any version is used',
      },
      user_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['tool_name'],
  },
  annotations: {},
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.tools.execute(body)));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
