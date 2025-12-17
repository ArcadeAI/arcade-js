// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@arcadeai/arcadejs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'chat.completions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/chat/completions',
  operationId: 'llm-chat',
};

export const tool: Tool = {
  name: 'create_chat_completions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nInteract with language models via OpenAI's chat completions API\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/chat_response',\n  $defs: {\n    chat_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        choices: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/choice'\n          }\n        },\n        created: {\n          type: 'integer'\n        },\n        model: {\n          type: 'string'\n        },\n        object: {\n          type: 'string'\n        },\n        system_fingerprint: {\n          type: 'string'\n        },\n        usage: {\n          $ref: '#/$defs/usage'\n        }\n      }\n    },\n    choice: {\n      type: 'object',\n      properties: {\n        finish_reason: {\n          type: 'string'\n        },\n        index: {\n          type: 'integer'\n        },\n        logprobs: {\n          type: 'object',\n          additionalProperties: true\n        },\n        message: {\n          $ref: '#/$defs/chat_message'\n        },\n        tool_authorizations: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/authorization_response'\n          }\n        },\n        tool_messages: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/chat_message'\n          }\n        }\n      }\n    },\n    chat_message: {\n      type: 'object',\n      properties: {\n        content: {\n          type: 'string',\n          description: 'The content of the message.'\n        },\n        role: {\n          type: 'string',\n          description: 'The role of the author of this message. One of system, user, tool, or assistant.'\n        },\n        name: {\n          type: 'string',\n          description: 'tool Name'\n        },\n        tool_call_id: {\n          type: 'string',\n          description: 'tool_call_id'\n        },\n        tool_calls: {\n          type: 'array',\n          description: 'tool calls if any',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              function: {\n                type: 'object',\n                properties: {\n                  arguments: {\n                    type: 'string'\n                  },\n                  name: {\n                    type: 'string'\n                  }\n                }\n              },\n              type: {\n                type: 'string',\n                enum: [                  'function'\n                ]\n              }\n            }\n          }\n        }\n      },\n      required: [        'content',\n        'role'\n      ]\n    },\n    authorization_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        context: {\n          $ref: '#/$defs/authorization_context'\n        },\n        provider_id: {\n          type: 'string'\n        },\n        scopes: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        status: {\n          type: 'string',\n          enum: [            'not_started',\n            'pending',\n            'completed',\n            'failed'\n          ]\n        },\n        url: {\n          type: 'string'\n        },\n        user_id: {\n          type: 'string'\n        }\n      }\n    },\n    authorization_context: {\n      type: 'object',\n      properties: {\n        token: {\n          type: 'string'\n        },\n        user_info: {\n          type: 'object',\n          additionalProperties: true\n        }\n      }\n    },\n    usage: {\n      type: 'object',\n      properties: {\n        completion_tokens: {\n          type: 'integer'\n        },\n        prompt_tokens: {\n          type: 'integer'\n        },\n        total_tokens: {\n          type: 'integer'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      frequency_penalty: {
        type: 'number',
      },
      logit_bias: {
        type: 'object',
        description:
          'LogitBias is must be a token id string (specified by their token ID in the tokenizer), not a word string.\nincorrect: `"logit_bias":{"You": 6}`, correct: `"logit_bias":{"1639": 6}`\nrefs: https://platform.openai.com/docs/api-reference/chat/create#chat/create-logit_bias',
        additionalProperties: true,
      },
      logprobs: {
        type: 'boolean',
        description:
          'LogProbs indicates whether to return log probabilities of the output tokens or not.\nIf true, returns the log probabilities of each output token returned in the content of message.\nThis option is currently not available on the gpt-4-vision-preview model.',
      },
      max_tokens: {
        type: 'integer',
      },
      messages: {
        type: 'array',
        items: {
          $ref: '#/$defs/chat_message',
        },
      },
      model: {
        type: 'string',
      },
      n: {
        type: 'integer',
      },
      parallel_tool_calls: {
        type: 'boolean',
        description: 'Disable the default behavior of parallel tool calls by setting it: false.',
      },
      presence_penalty: {
        type: 'number',
      },
      response_format: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['json_object', 'text'],
          },
        },
      },
      seed: {
        type: 'integer',
      },
      stop: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      stream: {
        type: 'boolean',
      },
      stream_options: {
        type: 'object',
        description: 'Options for streaming response. Only set this when you set stream: true.',
        properties: {
          include_usage: {
            type: 'boolean',
            description:
              'If set, an additional chunk will be streamed before the data: [DONE] message.\nThe usage field on this chunk shows the token usage statistics for the entire request,\nand the choices field will always be an empty array.\nAll other chunks will also include a usage field, but with a null value.',
          },
        },
      },
      temperature: {
        type: 'number',
      },
      tool_choice: {
        type: 'object',
        description: 'This can be either a string or an ToolChoice object.',
        additionalProperties: true,
      },
      tools: {
        type: 'object',
        additionalProperties: true,
      },
      top_logprobs: {
        type: 'integer',
        description:
          'TopLogProbs is an integer between 0 and 5 specifying the number of most likely tokens to return at each\ntoken position, each with an associated log probability.\nlogprobs must be set to true if this parameter is used.',
      },
      top_p: {
        type: 'number',
      },
      user: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
    $defs: {
      chat_message: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: 'The content of the message.',
          },
          role: {
            type: 'string',
            description: 'The role of the author of this message. One of system, user, tool, or assistant.',
          },
          name: {
            type: 'string',
            description: 'tool Name',
          },
          tool_call_id: {
            type: 'string',
            description: 'tool_call_id',
          },
          tool_calls: {
            type: 'array',
            description: 'tool calls if any',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                function: {
                  type: 'object',
                  properties: {
                    arguments: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                  },
                },
                type: {
                  type: 'string',
                  enum: ['function'],
                },
              },
            },
          },
        },
        required: ['content', 'role'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.chat.completions.create(body)));
  } catch (error) {
    if (error instanceof Arcade.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
