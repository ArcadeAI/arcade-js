import {
  convertParametersToZodSchema,
  convertSingleToolToSchema,
  isAuthorizationRequiredError,
  executeZodTool,
  executeOrAuthorizeZodTool,
  toZod,
  toZodToolSet,
} from '@arcadeai/arcadejs/lib/zod/zod';
import { PermissionDeniedError } from '@arcadeai/arcadejs/error';
import type { Headers } from '@arcadeai/arcadejs/core';
import {
  mockAuthorizationResponse,
  mockExecuteResponse,
  sampleTool,
  userId,
  client,
  mockExecute,
} from './mockData';

/**
 * Tests
 */
describe('isAuthorizationRequiredError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns true for PermissionDeniedError name', () => {
    const err = new PermissionDeniedError(
      403,
      { name: 'tool_authorization_required', message: 'authorization required' },
      'authorization required',
      {} as Headers,
    );
    expect(isAuthorizationRequiredError(err)).toBe(true);
  });

  it('returns false for other errors', () => {
    const err = new Error('Unhandled');
    expect(isAuthorizationRequiredError(err)).toBe(false);
  });
});

describe('convertParametersToZodSchema', () => {
  it('creates correct schema with required and optional params', () => {
    const schema = convertParametersToZodSchema(sampleTool.input);

    // Should parse when required field is present
    const parsed = schema.parse({
      owner: 'octocat',
      repo: 'Hello-World',
      title: 'Found a bug',
    });
    expect(parsed).toEqual({
      owner: 'octocat',
      repo: 'Hello-World',
      title: 'Found a bug',
    });

    // Optional field may be omitted
    expect(() =>
      schema.parse({
        owner: 'octocat',
        repo: 'Hello-World',
        title: 'Found a bug',
        body: "I'm having a problem with this.",
      }),
    ).not.toThrow();

    // Missing required should throw
    expect(() =>
      schema.parse({
        owner: 'octocat',
      }),
    ).toThrow();
  });

  it('returns empty object schema when no parameters defined', () => {
    const schema = convertParametersToZodSchema({} as any);
    const parsed = schema.parse({});
    expect(parsed).toEqual({});
  });
});

describe('convertSingleToolToSchema', () => {
  it('converts tool definition and normalizes name', () => {
    const zodSchema = convertSingleToolToSchema(sampleTool);
    expect(zodSchema.name).toBe('Github_CreateIssue'); // dot replaced with underscore
    expect(zodSchema.description).toBe(sampleTool.description);

    // Validate parameters
    expect(() =>
      zodSchema.parameters.parse({ owner: 'octocat', repo: 'Hello-World', title: 'Found a bug' }),
    ).not.toThrow();
  });
});

describe('executeZodTool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('executes tool when input is valid', async () => {
    const zodSchema = convertSingleToolToSchema(sampleTool);

    const execFn = executeZodTool({
      client,
      userId,
      zodToolSchema: zodSchema,
      toolDefinition: sampleTool,
    });

    const result = await execFn({
      owner: 'octocat',
      repo: 'Hello-World',
      title: 'Found a bug',
    });

    expect(client.tools.execute).toHaveBeenCalledWith({
      tool_name: zodSchema.name,
      input: {
        owner: 'octocat',
        repo: 'Hello-World',
        title: 'Found a bug',
      },
      user_id: userId,
    });
    expect(result).toBe(mockExecuteResponse);
  });

  it('throws validation error on invalid input', async () => {
    const zodSchema = convertSingleToolToSchema(sampleTool);

    const execFn = executeZodTool({
      client,
      userId,
      zodToolSchema: zodSchema,
      toolDefinition: sampleTool,
    });

    // Then verify that the execution fails
    await expect(execFn({})).rejects.toThrow('Invalid input');
    expect(client.tools.execute).not.toHaveBeenCalled();
  });
});

describe('executeOrAuthorizeZodTool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns authorization response when execution is not authorized', async () => {
    const authError = new PermissionDeniedError(
      403,
      { name: 'tool_authorization_required', message: 'authorization required' },
      'authorization required',
      {} as Headers,
    );
    mockExecute.mockRejectedValueOnce(authError);

    const zodSchema = convertSingleToolToSchema(sampleTool);

    const execFn = executeOrAuthorizeZodTool({
      client,
      userId,
      zodToolSchema: zodSchema,
      toolDefinition: sampleTool,
    });

    const result = await execFn({
      owner: 'octocat',
      repo: 'Hello-World',
      title: 'Found a bug',
    });

    expect(client.tools.authorize).toHaveBeenCalledWith({
      tool_name: zodSchema.name,
      user_id: userId,
    });

    expect(result).toEqual({
      authorization_required: true,
      authorization_response: mockAuthorizationResponse,
      url: mockAuthorizationResponse.url ?? '',
      message: expect.stringContaining('authorize'),
    });
  });

  it('executes tool directly when authorized', async () => {
    const zodSchema = convertSingleToolToSchema(sampleTool);

    const execFn = executeOrAuthorizeZodTool({
      client,
      userId,
      zodToolSchema: zodSchema,
      toolDefinition: sampleTool,
    });

    const result = await execFn({
      owner: 'octocat',
      repo: 'Hello-World',
      title: 'Found a bug',
    });

    expect(client.tools.execute).toHaveBeenCalledTimes(1);
    expect(client.tools.authorize).not.toHaveBeenCalled();
    expect(result).toBe(mockExecuteResponse);
  });
});

describe('toZod and toZodToolSet', () => {
  it('createZodTool returns executable tool', async () => {
    const tool = toZod({ tools: [sampleTool], client, userId })[0]!;
    const execResult = await tool.execute({
      owner: 'octocat',
      repo: 'Hello-World',
      title: 'Found a bug',
    });

    expect(tool.name).toBe('Github_CreateIssue');
    expect(tool.description).toBe(sampleTool.description);
    // Verify parameters validation works correctly
    expect(() => {
      tool.parameters.parse({
        owner: 'octocat',
        repo: 'Hello-World',
        title: 'Found a bug',
      });
    }).not.toThrow();
    expect(execResult).toBe(mockExecuteResponse);
  });

  it('toZodToolSet maps tools by normalized name', () => {
    const toolSet = toZodToolSet({ tools: [sampleTool], client, userId });

    expect(toolSet['Github_CreateIssue']).toBeDefined();
    expect(toolSet['Github_CreateIssue']!.name).toBe('Github_CreateIssue');
  });
});
