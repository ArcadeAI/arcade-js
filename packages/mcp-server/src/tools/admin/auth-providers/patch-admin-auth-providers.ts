// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@arcadeai/arcadejs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Arcade from '@arcadeai/arcadejs';

export const metadata: Metadata = {
  resource: 'admin.auth_providers',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/v1/admin/auth_providers/{id}',
  operationId: 'auth-providers-update',
};

export const tool: Tool = {
  name: 'patch_admin_auth_providers',
  description: 'Patch an existing auth provider',
  inputSchema: {
    type: 'object',
    properties: {
      path_id: {
        type: 'string',
      },
      body_id: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      oauth2: {
        type: 'object',
        properties: {
          authorize_request: {
            type: 'object',
            properties: {
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              endpoint: {
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
          },
          client_id: {
            type: 'string',
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
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              endpoint: {
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
          },
          scope_delimiter: {
            type: 'string',
            enum: [',', ' '],
          },
          token_request: {
            type: 'object',
            properties: {
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              endpoint: {
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
          },
          user_info_request: {
            type: 'object',
            properties: {
              auth_header_value_format: {
                type: 'string',
              },
              auth_method: {
                type: 'string',
              },
              endpoint: {
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
            },
          },
        },
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
    required: ['path_id'],
  },
  annotations: {},
};

export const handler = async (client: Arcade, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  try {
    return asTextContentResult(await client.admin.authProviders.patch(id, body));
  } catch (error) {
    if (error instanceof Arcade.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
