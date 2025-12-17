// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'admin.auth_providers',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/admin/auth_providers',
  operationId: 'auth-providers-create',
};

export const tool: Tool = {
  name: 'create_admin_auth_providers',
  description: 'Create a new auth provider',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      external_id: {
        type: 'string',
        description: 'The unique external ID for the auth provider',
      },
      oauth2: {
        type: 'object',
        properties: {
          client_id: {
            type: 'string',
          },
          authorize_request: {
            type: 'object',
            properties: {
              endpoint: {
                type: 'string',
              },
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              method: {
                type: 'string',
              },
              params: {
                type: 'object',
                additionalProperties: true,
              },
              request_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_map: {
                type: 'object',
                additionalProperties: true,
              },
            },
            required: ['endpoint'],
          },
          client_secret: {
            type: 'string',
          },
          pkce: {
            type: 'object',
            properties: {
              code_challenge_method: {
                type: 'string',
              },
              enabled: {
                type: 'boolean',
              },
            },
          },
          refresh_request: {
            type: 'object',
            properties: {
              endpoint: {
                type: 'string',
              },
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              method: {
                type: 'string',
              },
              params: {
                type: 'object',
                additionalProperties: true,
              },
              request_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_map: {
                type: 'object',
                additionalProperties: true,
              },
            },
            required: ['endpoint'],
          },
          scope_delimiter: {
            type: 'string',
            enum: [',', ' '],
          },
          token_introspection_request: {
            type: 'object',
            properties: {
              endpoint: {
                type: 'string',
              },
              triggers: {
                type: 'object',
                properties: {
                  on_token_grant: {
                    type: 'boolean',
                  },
                  on_token_refresh: {
                    type: 'boolean',
                  },
                },
              },
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              method: {
                type: 'string',
              },
              params: {
                type: 'object',
                additionalProperties: true,
              },
              request_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_map: {
                type: 'object',
                additionalProperties: true,
              },
            },
            required: ['endpoint', 'triggers'],
          },
          token_request: {
            type: 'object',
            properties: {
              endpoint: {
                type: 'string',
              },
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              method: {
                type: 'string',
              },
              params: {
                type: 'object',
                additionalProperties: true,
              },
              request_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_map: {
                type: 'object',
                additionalProperties: true,
              },
            },
            required: ['endpoint'],
          },
          user_info_request: {
            type: 'object',
            properties: {
              endpoint: {
                type: 'string',
              },
              triggers: {
                type: 'object',
                properties: {
                  on_token_grant: {
                    type: 'boolean',
                  },
                  on_token_refresh: {
                    type: 'boolean',
                  },
                },
              },
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              method: {
                type: 'string',
              },
              params: {
                type: 'object',
                additionalProperties: true,
              },
              request_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_content_type: {
                type: 'string',
                enum: ['application/x-www-form-urlencoded', 'application/json'],
              },
              response_map: {
                type: 'object',
                additionalProperties: true,
              },
            },
            required: ['endpoint', 'triggers'],
          },
        },
        required: ['client_id'],
      },
      provider_id: {
        type: 'string',
      },
      status: {
        type: 'string',
      },
      type: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  annotations: {},
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await client.admin.authProviders.create(body));
  } catch (error) {
    if (error instanceof Arcade.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
