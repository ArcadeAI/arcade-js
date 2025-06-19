import { ExecuteToolResponse, ToolDefinition } from '../../resources/tools/tools';
import {
  ZodTool,
  ZodToolSchema,
  ToolExecuteFunctionFactoryInput,
  CreateZodToolInput,
  CreateMultipleZodToolsInput,
  ToolExecuteFunction,
  ToolAuthorizationResponse,
} from './types';
import { z } from 'zod';

/**
 * Checks if an error indicates that authorization for the tool is required
 */
export function isAuthorizationRequiredError(error: Error): boolean {
  const errorMessage = error?.message?.toLowerCase() || '';
  return (
    error?.name === 'PermissionDeniedError' ||
    errorMessage.includes('permission denied') ||
    errorMessage.includes('authorization required')
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
      zodType = zodType.nullable().optional();
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
  switch (schema.val_type) {
    case 'string':
      return schema.enum ? z.enum(schema.enum as [string, ...string[]]) : z.string();
    case 'integer':
      return z.number().int();
    case 'number':
      return z.number();
    case 'boolean':
      return z.boolean();
    case 'json':
      return z.any();
    case 'array':
      if (!schema.inner_val_type) {
        throw new Error('Array type must have inner_val_type specified');
      }
      return z.array(convertValueSchemaToZod({ val_type: schema.inner_val_type }));
    default:
      return z.any();
  }
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
  const { qualified_name, description, input, output, name } = tool;
  const zodParameters = convertParametersToZodSchema(input);
  const zodOutput = output ? convertOutputToZodSchema(output) : undefined;
  return {
    name: qualified_name.replace(/\./g, '_'),
    description: description ?? name,
    parameters: zodParameters,
    output: zodOutput,
  };
}

/**
 * Converts tools to Zod-validated tool schemas
 * @param tools - Array of formatted tools
 * @returns Array of Zod-validated tool schemas
 */
export function toZodSchema(tools: ToolDefinition[]): ZodToolSchema[] {
  return tools.map(convertSingleToolToSchema);
}

/**
 * Creates a tool execution function that will validate the input and execute the tool
 */
export function executeZodTool({
  zodToolSchema,
  client,
  userId,
}: ToolExecuteFunctionFactoryInput): ToolExecuteFunction<ExecuteToolResponse> {
  const { parameters, name: toolName } = zodToolSchema;

  return async (input: unknown): Promise<ExecuteToolResponse> => {
    const validationResult = parameters.safeParse(input);
    if (!validationResult.success) {
      throw new Error(`Invalid input: ${validationResult.error.message}`);
    }

    const result = await client.tools.execute({
      tool_name: toolName,
      input: validationResult.data,
      user_id: userId,
    });
    return result;
  };
}

/**
 * Creates a tool execution function that will execute the tool if it is authorized,
 * otherwise it will return a ToolAuthorizationResponse
 */
export function executeOrAuthorizeZodTool({
  zodToolSchema,
  toolDefinition,
  client,
  userId,
}: ToolExecuteFunctionFactoryInput): ToolExecuteFunction<ExecuteToolResponse | ToolAuthorizationResponse> {
  const { name: toolName } = zodToolSchema;

  return async (input: unknown) => {
    try {
      const result = await executeZodTool({ zodToolSchema, toolDefinition, client, userId })(input);
      return result;
    } catch (error) {
      if (error instanceof Error && isAuthorizationRequiredError(error)) {
        const response = await client.tools.authorize({
          tool_name: toolName,
          user_id: userId,
        });

        return {
          authorization_required: true,
          authorization_response: response,
          url: response.url ?? '',
          message: `This tool requires authorization. Please visit the following URL to authorize the tool: ${response.url}`,
        };
      }
      throw error;
    }
  };
}

/**
 * Converts a single tool to a full tool with execution capabilities
 */
export function createZodTool<TReturn = ExecuteToolResponse>(
  props: CreateZodToolInput<TReturn>,
): ZodTool<TReturn> {
  const { tool, client, userId, executeFactory: providedExecuteFactory } = props;
  const schema = convertSingleToolToSchema(tool);
  const { name, description, parameters, output } = schema;

  const factoryToUse =
    providedExecuteFactory ??
    (executeZodTool as unknown as (props: ToolExecuteFunctionFactoryInput) => ToolExecuteFunction<TReturn>);

  return {
    name,
    description,
    parameters,
    output,
    execute: factoryToUse({ toolDefinition: tool, zodToolSchema: schema, client, userId }),
  };
}

/**
 * Converts Arcade tools to zod tools with execution capabilities
 */
export function toZod<TReturn = ExecuteToolResponse>({
  tools,
  client,
  userId,
  executeFactory: providedExecuteFactory,
}: CreateMultipleZodToolsInput<TReturn>): ZodTool<TReturn>[] {
  const factoryToUse =
    providedExecuteFactory ??
    (executeZodTool as unknown as (props: ToolExecuteFunctionFactoryInput) => ToolExecuteFunction<TReturn>);
  return tools.map((tool) => createZodTool<TReturn>({ tool, client, userId, executeFactory: factoryToUse }));
}

/**
 * Creates a record of Zod-validated tools with configurable execute functions
 */
export function toZodToolSet<TReturn = ExecuteToolResponse>({
  tools,
  client,
  userId,
  executeFactory: providedExecuteFactory,
}: CreateMultipleZodToolsInput<TReturn>): Record<string, ZodTool<TReturn>> {
  const factoryToUse =
    providedExecuteFactory ??
    (executeZodTool as unknown as (props: ToolExecuteFunctionFactoryInput) => ToolExecuteFunction<TReturn>);
  return Object.fromEntries(
    tools.map((tool) => {
      const zodTool = createZodTool<TReturn>({ tool, client, userId, executeFactory: factoryToUse });
      return [zodTool.name, zodTool];
    }),
  );
}
