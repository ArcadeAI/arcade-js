import { AuthorizationResponse } from '../../resources/shared';
import { ExecuteToolResponse } from '../../resources/tools/tools';
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
 * Represents a tool with Zod schema validation and execution capabilities.
 */
export interface ZodTool {
  name: string;
  description: string;
  parameters: z.ZodType;
  execute: (input: any, userId: string) => Promise<ExecuteToolResponse>;
  executeOrAuthorize: (
    input: any,
    userId: string,
  ) => Promise<ExecuteToolResponse | ToolAuthorizationResponse>;
}

/**
 * Schema definition for an Arcade tool, containing the tool's name,
 * description, and Zod-validated parameter structure.
 */
export interface ZodToolSchema {
  name: string;
  description: string;
  parameters: z.ZodType;
}

/**
 * Minimum schema required for an Arcade tool - validates basic structure
 */
export const arcadeToolMinimumSchema = z.object({
  function: z.object({
    name: z.string(),
    description: z.string(),
    parameters: z.any(),
  }),
});
