import { ExecuteToolResponse, ToolDefinition } from '../../resources/tools/tools';
import { ToolAuthorizationResponse, ZodTool, ZodToolSchema } from './types';
import { z } from 'zod';
import type { Arcade } from '../../index';

type ArcadeClient = Omit<Arcade, '_options'>;

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
 * Converts Arcade Tool Input to Zod schema
 */
export function convertParametersToZodSchema(parameters: ToolDefinition.Input): z.ZodType {
  if (!parameters.parameters || !Array.isArray(parameters.parameters)) {
    return z.object({});
  }

  const schemaObj: Record<string, z.ZodType> = {};

  for (const param of parameters.parameters) {
    const { name, required, value_schema } = param;
    let zodType = convertValueSchemaToZod(value_schema);

    if (!required) {
      zodType = zodType.optional();
    }

    schemaObj[name] = zodType;
  }

  return z.object(schemaObj);
}

/**
 * Converts a value schema to Zod type
 */
function convertValueSchemaToZod(schema: {
  val_type: string;
  inner_val_type?: string | null;
  enum?: string[] | null;
}): z.ZodType {
  let baseType: z.ZodType;

  switch (schema.val_type) {
    case 'string':
      baseType = schema.enum ? z.enum(schema.enum as [string, ...string[]]) : z.string();
      break;
    case 'integer':
      baseType = z.number().int();
      break;
    case 'number':
      baseType = z.number();
      break;
    case 'boolean':
      baseType = z.boolean();
      break;
    case 'json':
      baseType = z.any();
      break;
    case 'array':
      if (!schema.inner_val_type) {
        throw new Error('Array type must have inner_val_type specified');
      }
      baseType = z.array(convertValueSchemaToZod({ val_type: schema.inner_val_type }));
      break;
    default:
      throw new Error(`Unsupported value type: ${schema.val_type}`);
  }

  return baseType;
}

/**
 * Converts Arcade Tool Output to Zod schema
 */
export function convertOutputToZodSchema(output: ToolDefinition.Output): z.ZodType {
  if (!output.value_schema) {
    return z.any();
  }

  return convertValueSchemaToZod(output.value_schema);
}

/**
 * Converts a single tool to a Zod-validated tool schema
 * @param tool - The tool to convert
 * @returns Zod-validated tool schema
 * @throws ToolConversionError if the tool is invalid
 */
export function convertSingleToolToSchema(tool: ToolDefinition): ZodToolSchema {
  const { qualified_name, description, input, output } = tool;
  const zodParameters = convertParametersToZodSchema(input);
  const zodOutput = output ? convertOutputToZodSchema(output) : undefined;
  return {
    name: qualified_name.replace(/\./g, '_'),
    description,
    parameters: zodParameters,
    output: zodOutput,
  };
}

/**
 * Converts OpenAI formatted tools to Zod-validated tool schemas
 * @param tools - Array of formatted tools
 * @returns Array of Zod-validated tool schemas
 */
export function toZodSchema(tools: ToolDefinition[]): ZodToolSchema[] {
  return tools.map(convertSingleToolToSchema);
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
  tool: ToolDefinition;
  client: ArcadeClient;
  userId: string;
}): ZodTool {
  const schema = convertSingleToolToSchema(tool);
  const { name, description, parameters, output } = schema;

  return {
    name,
    description,
    parameters,
    output,
    execute: async (input: z.infer<typeof parameters>): Promise<ExecuteToolResponse> => {
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
    executeOrAuthorize: async (
      input: z.infer<typeof parameters>,
    ): Promise<ExecuteToolResponse | ToolAuthorizationResponse> => {
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
export function toZod({
  tools,
  client,
  userId,
}: {
  tools: ToolDefinition[];
  client: ArcadeClient;
  userId: string;
}): ZodTool[] {
  return tools.map((tool) => createZodTool({ tool, client, userId }));
}
