import { AuthorizationResponse } from '@arcadeai/arcadejs/resources/shared';
import { ExecuteToolResponse, ToolDefinition } from '@arcadeai/arcadejs/resources/tools/tools';
import Arcade from '@arcadeai/arcadejs/index';

export const mockExecuteResponse: ExecuteToolResponse = {
  success: true,
  output: { value: { message: 'ok' } },
};

export const mockAuthorizationResponse: AuthorizationResponse = {
  id: 'auth_123',
  url: 'http://example.com/authorize',
  status: 'pending',
};

export const mockExecute = jest.fn().mockResolvedValue(mockExecuteResponse);
export const mockAuthorize = jest.fn().mockResolvedValue(mockAuthorizationResponse);
export const client = new Arcade({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});
client.tools.execute = mockExecute;
client.tools.authorize = mockAuthorize;

export const sampleTool: ToolDefinition = {
  fully_qualified_name: 'Github.CreateIssue@0.1.10',
  qualified_name: 'Github.CreateIssue',
  name: 'CreateIssue',
  description:
    'Create an issue in a GitHub repository.\n\nExample:\n```\ncreate_issue(\n    owner="octocat",\n    repo="Hello-World",\n    title="Found a bug",\n    body="I\'m having a problem with this.",\n    assignees=["octocat"],\n    milestone=1,\n    labels=["bug"],\n)\n```',
  toolkit: {
    name: 'Github',
    description: 'LLM tools for interacting with Github',
    version: '0.1.10',
  },
  input: {
    parameters: [
      {
        name: 'owner',
        required: true,
        description: 'The account owner of the repository. The name is not case sensitive.',
        value_schema: {
          val_type: 'string',
        },
        inferrable: true,
      },
      {
        name: 'repo',
        required: true,
        description: 'The name of the repository without the .git extension. The name is not case sensitive.',
        value_schema: {
          val_type: 'string',
        },
        inferrable: true,
      },
      {
        name: 'title',
        required: true,
        description: 'The title of the issue.',
        value_schema: {
          val_type: 'string',
        },
        inferrable: true,
      },
      {
        name: 'body',
        required: false,
        description: 'The contents of the issue.',
        value_schema: {
          val_type: 'string',
        },
        inferrable: true,
      },
      {
        name: 'assignees',
        required: false,
        description: 'Logins for Users to assign to this issue.',
        value_schema: {
          val_type: 'array',
          inner_val_type: 'string',
        },
        inferrable: true,
      },
      {
        name: 'milestone',
        required: false,
        description: 'The number of the milestone to associate this issue with.',
        value_schema: {
          val_type: 'integer',
        },
        inferrable: true,
      },
      {
        name: 'labels',
        required: false,
        description: 'Labels to associate with this issue.',
        value_schema: {
          val_type: 'array',
          inner_val_type: 'string',
        },
        inferrable: true,
      },
      {
        name: 'include_extra_data',
        required: false,
        description:
          'If true, return all the data available about the pull requests. This is a large payload and may impact performance - use with caution.',
        value_schema: {
          val_type: 'boolean',
        },
        inferrable: true,
      },
    ],
  },
  output: {
    available_modes: ['value', 'error'],
    description:
      "A JSON string containing the created issue's details, including id, url, title, body, state, html_url, creation and update timestamps, user, assignees, and labels. If include_extra_data is True, returns all available data about the issue.",
    value_schema: {
      val_type: 'string',
    },
  },
  requirements: {
    authorization: {
      provider_id: 'github',
      provider_type: 'oauth2',
      oauth2: {},
    },
  },
};

export const userId = 'user_123';
