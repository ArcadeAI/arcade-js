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
  description: string | undefined;
  parameters: z.ZodType;
  output: z.ZodType | undefined;
  execute: (input: any) => Promise<ExecuteToolResponse>;
  executeOrAuthorize: (input: any) => Promise<ExecuteToolResponse | ToolAuthorizationResponse>;
}

/**
 * Schema definition for an Arcade tool, containing the tool's name,
 * description, and Zod-validated parameter structure.
 */
export interface ZodToolSchema {
  name: string;
  description: string | undefined;
  parameters: z.ZodType;
  output: z.ZodType | undefined;
}
