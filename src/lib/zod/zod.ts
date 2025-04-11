import { ExecuteToolResponse } from '../../resources/tools/tools';
import { arcadeToolMinimumSchema, ToolAuthorizationResponse, ZodTool, ZodToolSchema } from './types';
import { z } from 'zod';
import { type Arcade } from '../../index';
import { JSONSchemaToZod } from '@dmitryrechkin/json-schema-to-zod';

/**
 * Custom error class for tool conversion failures
 */
export class ToolConversionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ToolConversionError';
  }
}

/**
 * Checks if an error indicates that authorization for the tool is required
 */
export function isAuthorizationRequiredError(error: Error): boolean {
  return (
    error?.name === 'PermissionDeniedError' ||
    error?.message?.includes('permission denied') ||
    error?.message?.includes('authorization required')
  );
}

/**
 * Converts JSON Schema parameters to Zod schema
 */
export function convertToZodSchema(parameters: any): z.ZodType {
  return JSONSchemaToZod.convert(parameters);
}

/**
 * Converts a single tool to a Zod-validated tool schema
 * @param tool - The tool to convert
 * @returns Zod-validated tool schema
 * @throws ToolConversionError if the tool is invalid
 */
export function convertSingleToolToSchema(tool: any): ZodToolSchema {
  if (!arcadeToolMinimumSchema.safeParse(tool).success) {
    throw new ToolConversionError('Invalid tool format: tool does not match minimum schema requirements');
  }

  const {
    function: { name, description, parameters },
  } = arcadeToolMinimumSchema.parse(tool);

  const zodParameters = convertToZodSchema(parameters);
  return { name, description, parameters: zodParameters };
}

/**
 * Converts OpenAI formatted tools to Zod-validated tool schemas
 * @param tools - Array of formatted tools
 * @returns Array of Zod-validated tool schemas
 */
export function toZodSchema(tools: any[]): ZodToolSchema[] {
  return tools
    .map((tool) => {
      try {
        return convertSingleToolToSchema(tool);
      } catch (error) {
        if (error instanceof ToolConversionError) {
          console.warn(`Skipping invalid tool: ${error.message}`);
          return null;
        }
        throw error;
      }
    })
    .filter((schema): schema is ZodToolSchema => schema !== null);
}

/**
 * Converts a single tool to a full tool with execution capabilities
 * @param tool - The tool to convert
 * @param client - Arcade client instance
 * @param userId - User ID to use for the tool execution
 * @returns Zod-validated tool with execution methods
 * @throws ToolConversionError if the tool is invalid
 */
export function createZodTool({
  tool,
  client,
  userId,
}: {
  tool: any;
  client: Arcade;
  userId: string;
}): ZodTool {
  const schema = convertSingleToolToSchema(tool);
  const { name, description, parameters } = schema;

  return {
    name,
    description,
    parameters,
    execute: async (input: any): Promise<ExecuteToolResponse> => {
      const validationResult = parameters.safeParse(input);
      if (!validationResult.success) {
        throw new Error(`Invalid input: ${validationResult.error.message}`);
      }

      return client.tools.execute({
        tool_name: name,
        input: validationResult.data,
        user_id: userId,
      });
    },
    executeOrAuthorize: async (input: any): Promise<ExecuteToolResponse | ToolAuthorizationResponse> => {
      const validationResult = parameters.safeParse(input);
      if (!validationResult.success) {
        throw new Error(`Invalid input: ${validationResult.error.message}`);
      }

      try {
        return await client.tools.execute({
          tool_name: name,
          input: validationResult.data,
          user_id: userId,
        });
      } catch (error) {
        if (error instanceof Error && isAuthorizationRequiredError(error)) {
          const response = (await client.tools.authorize({
            tool_name: name,
            user_id: userId,
          })) as { url: string };

          return {
            authorization_required: true,
            authorization_response: response,
            url: response.url,
            message:
              'This tool requires authorization. Please visit the following URL to authorize the tool: ' +
              response.url,
          };
        }
        throw error;
      }
    },
  };
}

/**
 * Converts formatted tools to full tools with execution capabilities
 * @param tools - Array of formatted tools
 * @param client - Arcade client instance
 * @param userId - User ID to use for the tool execution
 * @returns Array of Zod-validated tools with execution methods
 */
export async function toZod({
  tools,
  client,
  userId,
}: {
  tools: any[];
  client: Arcade;
  userId: string;
}): Promise<ZodTool[]> {
  const results = tools.map((tool) => {
    try {
      return createZodTool({ tool, client, userId });
    } catch (error) {
      if (error instanceof ToolConversionError) {
        // If the tool is invalid, return null to filter it out
        return null;
      }
      throw error;
    }
  });
  return results.filter((tool): tool is ZodTool => tool !== null);
}
