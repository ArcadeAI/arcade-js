import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { OffsetPage, type OffsetPageParams } from '../../pagination';
import { z } from 'zod';
import { ExecuteToolResponse } from './tools';
import { AuthorizationResponse } from '../shared';

/**
 * Response returned when a tool requires authorization before execution
 */
interface AuthorizationRequiredResponse {
  authorization_required: true;
  authorization_response: AuthorizationResponse;
  url: string;
  message: string;
}

/**
 * Represents an Arcade Tool with Zod validation
 * @template UserIdProvided - Whether the user ID is provided during tool creation
 */
export interface ArcadeZodTool<UserIdProvided extends boolean = false> {
  name: string;
  description: string;
  parameters: z.ZodType;
  execute: UserIdProvided extends true ? (input: any) => Promise<ExecuteToolResponse>
  : (input: any, userId: string) => Promise<ExecuteToolResponse>;
  executeOrAuthorize: UserIdProvided extends true ?
    (input: any) => Promise<ExecuteToolResponse | AuthorizationRequiredResponse>
  : (input: any, userId: string) => Promise<ExecuteToolResponse | AuthorizationRequiredResponse>;
}

/**
 * Minimum schema required for an Arcade tool - validates basic structure
 */
const arcadeToolMinimumSchema = z.object({
  function: z.object({
    name: z.string(),
    description: z.string(),
    parameters: z.any(),
  }),
});

/**
 * Checks if an error indicates that authorization for the tool is required
 */
function isAuthorizationRequiredError(error: Error): boolean {
  return (
    error?.name === 'PermissionDeniedError' ||
    error?.message?.includes('permission denied') ||
    error?.message?.includes('authorization required')
  );
}

/**
 * Converts an Arcade Tool to Zod
 * @param toolData - The Arcade Tool
 * @param client - API client for making requests
 * @param userId - Optional user ID to use for the tool execution
 * @returns A tool object with Zod schema validation and execution methods
 */
async function convertToZodTool<T extends boolean = false>(
  toolData: any,
  client: Core.APIClient,
  userId?: string,
): Promise<ArcadeZodTool<T>> {
  const {
    function: { name, description, parameters },
  } = arcadeToolMinimumSchema.parse(toolData);

  // Convert JSON Schema to Zod
  const { JSONSchemaToZod } = await import('@dmitryrechkin/json-schema-to-zod');
  const zodParameters = JSONSchemaToZod.convert(parameters);

  return {
    name,
    description,
    parameters: zodParameters,
    execute: async (input: any, execUserId?: string): Promise<ExecuteToolResponse> => {
      // Validate the input against the Zod schema
      const validationResult = zodParameters.safeParse(input);
      if (!validationResult.success) {
        throw new Error(`Invalid input: ${validationResult.error.message}`);
      }

      // Use userId from tool creation if available, otherwise from execute call
      const effectiveUserId = userId || execUserId;

      // Execute the tool via the client's API
      return client.post('/v1/tools/execute', {
        body: {
          tool_name: name,
          input: validationResult.data,
          user_id: effectiveUserId,
        },
      });
    },
    executeOrAuthorize: async (
      input: any,
      execUserId?: string,
    ): Promise<ExecuteToolResponse | AuthorizationRequiredResponse> => {
      // Validate the input against the Zod schema
      const validationResult = zodParameters.safeParse(input);
      if (!validationResult.success) {
        throw new Error(`Invalid input: ${validationResult.error.message}`);
      }

      // Use userId from tool creation if available, otherwise from execute call
      const effectiveUserId = userId || execUserId;

      try {
        // Try to execute the tool
        return await client.post('/v1/tools/execute', {
          body: {
            tool_name: name,
            input: validationResult.data,
            user_id: effectiveUserId,
          },
        });
      } catch (error) {
        if (error instanceof Error && isAuthorizationRequiredError(error)) {
          // If the tool requires authorization, get the authorization response
          const response = (await client.post('/v1/tools/authorize', {
            body: {
              tool_name: name,
              user_id: effectiveUserId,
            },
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
  } as ArcadeZodTool<T>;
}

/**
 * Response from listing Arcade Tools with Zod validation
 */
export type ArcadeZodToolResponse<T extends boolean = false> = {
  items: ArcadeZodTool<T>[];
  total_count: number;
  page_count: number;
  offset: number;
  limit: number;
};

/**
 * API resource for working with Arcade Tools with Zod validation
 */
export class Zod extends APIResource {
  /**
   * Lists Arcade Tools with Zod validation, optionally filtered by toolkit
   * Supports pagination and optional user ID for the tool execution
   */
  async list(
    query: ZodListParams & { user_id: string },
    options?: Core.RequestOptions,
  ): Promise<ArcadeZodToolResponse<true>>;
  async list(query?: ZodListParams, options?: Core.RequestOptions): Promise<ArcadeZodToolResponse<false>>;
  async list(options?: Core.RequestOptions): Promise<ArcadeZodToolResponse<false>>;
  async list(
    query: ZodListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Promise<ArcadeZodToolResponse<boolean>> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }

    const queryParams = query ? { ...query, format: 'openai' } : { format: 'openai' };
    const hasUserId = !!query.user_id;

    // Get tools from API with OpenAI format
    const page = await this._client.getAPIList('/v1/formatted_tools', OffsetPage, {
      query: queryParams,
      ...options,
    });

    // Convert formatted tools to Zod-validated tools
    const items = page.items || [];
    const validItems = items.filter((item) => arcadeToolMinimumSchema.safeParse(item).success);
    const convertedItems = await Promise.all(
      validItems.map((item) => convertToZodTool<typeof hasUserId>(item, this._client, query?.user_id)),
    );

    // Extract pagination details
    const { body } = page as any;
    const { limit, offset, page_count, total_count } = body;

    return {
      items: convertedItems,
      limit,
      offset,
      page_count,
      total_count,
    } as ArcadeZodToolResponse<typeof hasUserId>;
  }

  /**
   * Gets a single Arcade Tool by name with Zod validation
   * Can optionally include user ID for the tool execution
   */
  async get(
    name: string,
    query: ZodGetParams & { user_id: string },
    options?: Core.RequestOptions,
  ): Promise<ArcadeZodTool<true>>;
  async get(name: string, query?: ZodGetParams, options?: Core.RequestOptions): Promise<ArcadeZodTool<false>>;
  async get(name: string, options?: Core.RequestOptions): Promise<ArcadeZodTool<false>>;
  async get(
    name: string,
    query: ZodGetParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Promise<ArcadeZodTool<boolean>> {
    if (isRequestOptions(query)) {
      return this.get(name, {}, query);
    }

    const queryParams = query ? { ...query, format: 'openai' } : { format: 'openai' };
    const hasUserId = !!query.user_id;

    // Get the specific tool in OpenAI format
    const data = await this._client.get(`/v1/formatted_tools/${name}`, {
      query: queryParams,
      ...options,
    });

    // Validate response format
    if (!arcadeToolMinimumSchema.safeParse(data).success) {
      throw new Error(`Invalid tool response for ${name}`);
    }

    // Convert to Zod-validated tool
    return convertToZodTool<typeof hasUserId>(data, this._client, query?.user_id);
  }
}

/**
 * Parameters for listing Arcade Tools
 */
export interface ZodListParams extends OffsetPageParams {
  toolkit?: string;
  user_id?: string;
}

/**
 * Parameters for getting a specific Arcade Tool
 */
export interface ZodGetParams {
  user_id?: string;
}

export declare namespace Zod {
  export {
    type ZodListParams as ZodListParams,
    type ZodGetParams as ZodGetParams,
    type ArcadeZodTool as ArcadeZodTool,
  };
}
