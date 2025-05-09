import type { Arcade } from '../../index';
import { AuthorizationResponse } from '../../resources/shared';
import { ExecuteToolResponse, ToolDefinition } from '../../resources/tools/tools';
import { z } from 'zod';

/**
 * Response returned when a tool requires authorization before execution
 */
export interface ToolAuthorizationResponse {
  authorization_required: true;
  authorization_response: AuthorizationResponse;
  url: string;
  message: string;
}

/**
 * Base interface for all tool schemas with Zod validation
 */
export interface ZodToolSchema {
  /** Qualified name of the tool */
  name: string;
  /** Optional, human-readable description */
  description?: string | undefined;
  /** Zod schema for validating tool parameters */
  parameters: z.ZodType;
  /** Zod schema for validating tool output (if any) */
  output: z.ZodType | undefined;
}

/**
 * Union type for all possible tool execution responses
 */
export type ToolResponse<T extends unknown = unknown> = ExecuteToolResponse | ToolAuthorizationResponse | T;

/**
 * Generic type for any tool execution function
 */
export type ToolExecuteFunction<TReturn> = (input: unknown) => Promise<TReturn>;

/**
 * A complete tool implementation with Zod validation and execution capabilities
 */
export interface ZodTool<TReturn = ExecuteToolResponse> extends ZodToolSchema {
  execute: ToolExecuteFunction<TReturn>;
}

/**
 * Arcade client
 */
export type ArcadeClient = Omit<Arcade, '_options'>;

/**
 * Input required to create a tool execution function
 */
export interface ToolExecuteFunctionFactoryInput {
  /** Original tool definition from Arcade */
  toolDefinition: ToolDefinition;
  /** Zod-validated tool schema */
  zodToolSchema: ZodToolSchema;
  /** Arcade client instance */
  client: ArcadeClient;
  /** User ID for tool execution */
  userId: string;
}

/**
 * Base input type for tool creation functions
 */
export interface BaseToolCreationInput<TReturn = ExecuteToolResponse> {
  client: ArcadeClient;
  userId: string;
  executeFactory?: (props: ToolExecuteFunctionFactoryInput) => ToolExecuteFunction<TReturn>;
}

/**
 * Input required to create a single Zod tool
 */
export interface CreateZodToolInput<TReturn = ExecuteToolResponse> extends BaseToolCreationInput<TReturn> {
  tool: ToolDefinition;
}

/**
 * Input required to create multiple Zod tools
 */
export interface CreateMultipleZodToolsInput<TReturn = ExecuteToolResponse>
  extends BaseToolCreationInput<TReturn> {
  tools: ToolDefinition[];
}
