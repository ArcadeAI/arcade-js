// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ToolsAPI from './tools';
import * as Shared from '../shared';
import * as FormattedAPI from './formatted';
import {
  Formatted,
  FormattedGetParams,
  FormattedGetResponse,
  FormattedListParams,
  FormattedListResponse,
  FormattedListResponsesOffsetPage,
} from './formatted';
import * as ScheduledAPI from './scheduled';
import { Scheduled, ScheduledGetResponse, ScheduledListParams } from './scheduled';
import { APIPromise } from '../../core/api-promise';
import { OffsetPage, type OffsetPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tools extends APIResource {
  scheduled: ScheduledAPI.Scheduled = new ScheduledAPI.Scheduled(this._client);
  formatted: FormattedAPI.Formatted = new FormattedAPI.Formatted(this._client);

  /**
   * Returns a page of tools from the engine configuration, optionally filtered by
   * toolkit
   */
  list(
    query: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolDefinitionsOffsetPage, ToolDefinition> {
    return this._client.getAPIList('/v1/tools', OffsetPage<ToolDefinition>, { query, ...options });
  }

  /**
   * Authorizes a user for a specific tool by name
   */
  authorize(body: ToolAuthorizeParams, options?: RequestOptions): APIPromise<Shared.AuthorizationResponse> {
    return this._client.post('/v1/tools/authorize', { body, ...options });
  }

  /**
   * Executes a tool by name and arguments
   */
  execute(body: ToolExecuteParams, options?: RequestOptions): APIPromise<ExecuteToolResponse> {
    return this._client.post('/v1/tools/execute', { body, ...options });
  }

  /**
   * Returns the arcade tool specification for a specific tool
   */
  get(
    name: string,
    query: ToolGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ToolDefinition> {
    return this._client.get(path`/v1/tools/${name}`, { query, ...options });
  }
}

export type ToolDefinitionsOffsetPage = OffsetPage<ToolDefinition>;

export type ToolExecutionsOffsetPage = OffsetPage<ToolExecution>;

export interface AuthorizeToolRequest {
  tool_name: string;

  /**
   * Optional: if provided, the user will be redirected to this URI after
   * authorization
   */
  next_uri?: string;

  /**
   * Optional: if not provided, any version is used
   */
  tool_version?: string;

  /**
   * Required only when calling with an API key
   */
  user_id?: string;
}

export interface ExecuteToolRequest {
  tool_name: string;

  /**
   * Whether to include the error stacktrace in the response. If not provided, the
   * error stacktrace is not included.
   */
  include_error_stacktrace?: boolean;

  /**
   * JSON input to the tool, if any
   */
  input?: { [key: string]: unknown };

  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately. Format ISO 8601: YYYY-MM-DDTHH:MM:SS
   */
  run_at?: string;

  /**
   * The tool version to use (optional). If not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

export interface ExecuteToolResponse {
  id?: string;

  duration?: number;

  execution_id?: string;

  execution_type?: string;

  finished_at?: string;

  output?: ExecuteToolResponse.Output;

  run_at?: string;

  status?: string;

  /**
   * Whether the request was successful. For immediately-executed requests, this will
   * be true if the tool call succeeded. For scheduled requests, this will be true if
   * the request was scheduled successfully.
   */
  success?: boolean;
}

export namespace ExecuteToolResponse {
  export interface Output {
    authorization?: Shared.AuthorizationResponse;

    error?: Output.Error;

    logs?: Array<Output.Log>;

    value?: unknown;
  }

  export namespace Output {
    export interface Error {
      can_retry: boolean;

      kind:
        | 'TOOLKIT_LOAD_FAILED'
        | 'TOOL_DEFINITION_BAD_DEFINITION'
        | 'TOOL_DEFINITION_BAD_INPUT_SCHEMA'
        | 'TOOL_DEFINITION_BAD_OUTPUT_SCHEMA'
        | 'TOOL_REQUIREMENTS_NOT_MET'
        | 'TOOL_RUNTIME_BAD_INPUT_VALUE'
        | 'TOOL_RUNTIME_BAD_OUTPUT_VALUE'
        | 'TOOL_RUNTIME_RETRY'
        | 'TOOL_RUNTIME_CONTEXT_REQUIRED'
        | 'TOOL_RUNTIME_FATAL'
        | 'CONTEXT_CHECK_FAILED'
        | 'CONTEXT_DENIED'
        | 'UPSTREAM_RUNTIME_BAD_REQUEST'
        | 'UPSTREAM_RUNTIME_AUTH_ERROR'
        | 'UPSTREAM_RUNTIME_NOT_FOUND'
        | 'UPSTREAM_RUNTIME_VALIDATION_ERROR'
        | 'UPSTREAM_RUNTIME_RATE_LIMIT'
        | 'UPSTREAM_RUNTIME_SERVER_ERROR'
        | 'UPSTREAM_RUNTIME_UNMAPPED'
        | 'UNKNOWN';

      message: string;

      additional_prompt_content?: string;

      developer_message?: string;

      extra?: { [key: string]: unknown };

      retry_after_ms?: number;

      stacktrace?: string;

      status_code?: number;
    }

    export interface Log {
      level: string;

      message: string;

      subtype?: string;
    }
  }
}

export interface ToolDefinition {
  fully_qualified_name: string;

  input: ToolDefinition.Input;

  name: string;

  qualified_name: string;

  toolkit: ToolDefinition.Toolkit;

  description?: string;

  formatted_schema?: { [key: string]: unknown };

  output?: ToolDefinition.Output;

  requirements?: ToolDefinition.Requirements;
}

export namespace ToolDefinition {
  export interface Input {
    parameters?: Array<Input.Parameter>;
  }

  export namespace Input {
    export interface Parameter {
      name: string;

      value_schema: ToolsAPI.ValueSchema;

      description?: string;

      inferrable?: boolean;

      required?: boolean;
    }
  }

  export interface Toolkit {
    name: string;

    description?: string;

    version?: string;
  }

  export interface Output {
    available_modes?: Array<string>;

    description?: string;

    value_schema?: ToolsAPI.ValueSchema;
  }

  export interface Requirements {
    authorization?: Requirements.Authorization;

    met?: boolean;

    secrets?: Array<Requirements.Secret>;
  }

  export namespace Requirements {
    export interface Authorization {
      id?: string;

      oauth2?: Authorization.Oauth2;

      provider_id?: string;

      provider_type?: string;

      status?: 'active' | 'inactive';

      status_reason?: string;

      token_status?: 'not_started' | 'pending' | 'completed' | 'failed';
    }

    export namespace Authorization {
      export interface Oauth2 {
        scopes?: Array<string>;
      }
    }

    export interface Secret {
      key: string;

      met?: boolean;

      status_reason?: string;
    }
  }
}

export interface ToolExecution {
  id?: string;

  created_at?: string;

  execution_status?: string;

  execution_type?: string;

  finished_at?: string;

  run_at?: string;

  started_at?: string;

  tool_name?: string;

  toolkit_name?: string;

  toolkit_version?: string;

  updated_at?: string;

  user_id?: string;
}

export interface ToolExecutionAttempt {
  id?: string;

  finished_at?: string;

  output?: ToolExecutionAttempt.Output;

  started_at?: string;

  success?: boolean;

  system_error_message?: string;
}

export namespace ToolExecutionAttempt {
  export interface Output {
    authorization?: Shared.AuthorizationResponse;

    error?: Output.Error;

    logs?: Array<Output.Log>;

    value?: unknown;
  }

  export namespace Output {
    export interface Error {
      can_retry: boolean;

      kind:
        | 'TOOLKIT_LOAD_FAILED'
        | 'TOOL_DEFINITION_BAD_DEFINITION'
        | 'TOOL_DEFINITION_BAD_INPUT_SCHEMA'
        | 'TOOL_DEFINITION_BAD_OUTPUT_SCHEMA'
        | 'TOOL_REQUIREMENTS_NOT_MET'
        | 'TOOL_RUNTIME_BAD_INPUT_VALUE'
        | 'TOOL_RUNTIME_BAD_OUTPUT_VALUE'
        | 'TOOL_RUNTIME_RETRY'
        | 'TOOL_RUNTIME_CONTEXT_REQUIRED'
        | 'TOOL_RUNTIME_FATAL'
        | 'CONTEXT_CHECK_FAILED'
        | 'CONTEXT_DENIED'
        | 'UPSTREAM_RUNTIME_BAD_REQUEST'
        | 'UPSTREAM_RUNTIME_AUTH_ERROR'
        | 'UPSTREAM_RUNTIME_NOT_FOUND'
        | 'UPSTREAM_RUNTIME_VALIDATION_ERROR'
        | 'UPSTREAM_RUNTIME_RATE_LIMIT'
        | 'UPSTREAM_RUNTIME_SERVER_ERROR'
        | 'UPSTREAM_RUNTIME_UNMAPPED'
        | 'UNKNOWN';

      message: string;

      additional_prompt_content?: string;

      developer_message?: string;

      extra?: { [key: string]: unknown };

      retry_after_ms?: number;

      stacktrace?: string;

      status_code?: number;
    }

    export interface Log {
      level: string;

      message: string;

      subtype?: string;
    }
  }
}

export interface ValueSchema {
  val_type: string;

  enum?: Array<string>;

  inner_val_type?: string;
}

export interface ToolListParams extends OffsetPageParams {
  /**
   * Include all versions of each tool
   */
  include_all_versions?: boolean;

  /**
   * Comma separated tool formats that will be included in the response.
   */
  include_format?: Array<'arcade' | 'openai' | 'anthropic'>;

  /**
   * Toolkit name
   */
  toolkit?: string;

  /**
   * User ID
   */
  user_id?: string;
}

export interface ToolAuthorizeParams {
  tool_name: string;

  /**
   * Optional: if provided, the user will be redirected to this URI after
   * authorization
   */
  next_uri?: string;

  /**
   * Optional: if not provided, any version is used
   */
  tool_version?: string;

  /**
   * Required only when calling with an API key
   */
  user_id?: string;
}

export interface ToolExecuteParams {
  tool_name: string;

  /**
   * Whether to include the error stacktrace in the response. If not provided, the
   * error stacktrace is not included.
   */
  include_error_stacktrace?: boolean;

  /**
   * JSON input to the tool, if any
   */
  input?: { [key: string]: unknown };

  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately. Format ISO 8601: YYYY-MM-DDTHH:MM:SS
   */
  run_at?: string;

  /**
   * The tool version to use (optional). If not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

export interface ToolGetParams {
  /**
   * Comma separated tool formats that will be included in the response.
   */
  include_format?: Array<'arcade' | 'openai' | 'anthropic'>;

  /**
   * User ID
   */
  user_id?: string;
}

Tools.Scheduled = Scheduled;
Tools.Formatted = Formatted;

export declare namespace Tools {
  export {
    type AuthorizeToolRequest as AuthorizeToolRequest,
    type ExecuteToolRequest as ExecuteToolRequest,
    type ExecuteToolResponse as ExecuteToolResponse,
    type ToolDefinition as ToolDefinition,
    type ToolExecution as ToolExecution,
    type ToolExecutionAttempt as ToolExecutionAttempt,
    type ValueSchema as ValueSchema,
    type ToolDefinitionsOffsetPage as ToolDefinitionsOffsetPage,
    type ToolListParams as ToolListParams,
    type ToolAuthorizeParams as ToolAuthorizeParams,
    type ToolExecuteParams as ToolExecuteParams,
    type ToolGetParams as ToolGetParams,
  };

  export {
    Scheduled as Scheduled,
    type ScheduledGetResponse as ScheduledGetResponse,
    type ScheduledListParams as ScheduledListParams,
  };

  export {
    Formatted as Formatted,
    type FormattedListResponse as FormattedListResponse,
    type FormattedGetResponse as FormattedGetResponse,
    type FormattedListResponsesOffsetPage as FormattedListResponsesOffsetPage,
    type FormattedListParams as FormattedListParams,
    type FormattedGetParams as FormattedGetParams,
  };
}
