import { ExecuteToolResponse } from '../../resources/tools/tools';
import { arcadeToolMinimumSchema, ToolAuthorizationResponse, ZodTool, ZodToolSchema } from './types';
import * as z from 'zod';
import { type Arcade } from '../../index';

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
async function convertToZodSchema(parameters: any): Promise<z.ZodType> {
  const { JSONSchemaToZod } = await import('@dmitryrechkin/json-schema-to-zod');
  return JSONSchemaToZod.convert(parameters);
}

/**
 * Converts OpenAI formatted tools to Zod-validated tool schemas
 * @param tools - Array of formatted tools
 * @returns Array of Zod-validated tool schemas
 */
export async function toZodSchema(tools: any[]): Promise<ZodToolSchema[]> {
  const validTools = tools.filter((item) => arcadeToolMinimumSchema.safeParse(item).success);
  const schemas: ZodToolSchema[] = [];

  for (const item of validTools) {
    const {
      function: { name, description, parameters },
    } = arcadeToolMinimumSchema.parse(item);

    const zodParameters = await convertToZodSchema(parameters);
    schemas.push({ name, description, parameters: zodParameters });
  }

  return schemas;
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
  // First convert to schemas
  const schemas = await toZodSchema(tools);

  // Then add execution capabilities
  return schemas.map(({ name, description, parameters }) => ({
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
  }));
}
