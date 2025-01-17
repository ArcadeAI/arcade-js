// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
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
import { OffsetPage, type OffsetPageParams } from '../../pagination';

export class Tools extends APIResource {
  scheduled: ScheduledAPI.Scheduled = new ScheduledAPI.Scheduled(this._client);
  formatted: FormattedAPI.Formatted = new FormattedAPI.Formatted(this._client);

  /**
   * Returns a page of tools from the engine configuration, optionally filtered by
   * toolkit
   */
  list(
    query?: ToolListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolListResponsesOffsetPage, ToolListResponse>;
  list(options?: Core.RequestOptions): Core.PagePromise<ToolListResponsesOffsetPage, ToolListResponse>;
  list(
    query: ToolListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolListResponsesOffsetPage, ToolListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/tools', ToolListResponsesOffsetPage, { query, ...options });
  }

  /**
   * Authorizes a user for a specific tool by name
   */
  authorize(
    body: ToolAuthorizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthAuthorizationResponse> {
    return this._client.post('/v1/tools/authorize', { body, ...options });
  }

  /**
   * Executes a tool by name and arguments
   */
  execute(body: ToolExecuteParams, options?: Core.RequestOptions): Core.APIPromise<ExecuteToolResponse> {
    return this._client.post('/v1/tools/execute', { body, ...options });
  }

  /**
   * Returns the arcade tool specification for a specific tool
   */
  get(name: string, options?: Core.RequestOptions): Core.APIPromise<ToolGetResponse> {
    return this._client.get(`/v1/tools/${name}`, options);
  }
}

export class ToolListResponsesOffsetPage extends OffsetPage<ToolListResponse> {}

export class ToolExecutionsOffsetPage extends OffsetPage<ToolExecution> {}

export interface AuthorizeToolRequest {
  tool_name: string;

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
   * JSON input to the tool, if any
   */
  input?: Record<string, unknown>;

  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately
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
    authorization?: Shared.AuthAuthorizationResponse;

    error?: Output.Error;

    value?: unknown;
  }

  export namespace Output {
    export interface Error {
      message: string;

      additional_prompt_content?: string;

      can_retry?: boolean;

      developer_message?: string;

      retry_after_ms?: number;
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
    authorization?: Shared.AuthAuthorizationResponse;

    error?: Output.Error;

    value?: unknown;
  }

  export namespace Output {
    export interface Error {
      message: string;

      additional_prompt_content?: string;

      can_retry?: boolean;

      developer_message?: string;

      retry_after_ms?: number;
    }
  }
}

export interface ValueSchema {
  val_type: string;

  enum?: Array<string>;

  inner_val_type?: string;
}

export interface ToolListResponse {
  input: ToolListResponse.Input;

  name: string;

  toolkit: ToolListResponse.Toolkit;

  description?: string;

  fully_qualified_name?: string;

  output?: ToolListResponse.Output;

  requirements?: ToolListResponse.Requirements;
}

export namespace ToolListResponse {
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
  }

  export namespace Requirements {
    export interface Authorization {
      id?: string;

      oauth2?: Authorization.Oauth2;

      provider_id?: string;

      provider_type?: string;
    }

    export namespace Authorization {
      export interface Oauth2 {
        scopes?: Array<string>;
      }
    }
  }
}

export interface ToolGetResponse {
  input: ToolGetResponse.Input;

  name: string;

  toolkit: ToolGetResponse.Toolkit;

  description?: string;

  fully_qualified_name?: string;

  output?: ToolGetResponse.Output;

  requirements?: ToolGetResponse.Requirements;
}

export namespace ToolGetResponse {
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
  }

  export namespace Requirements {
    export interface Authorization {
      id?: string;

      oauth2?: Authorization.Oauth2;

      provider_id?: string;

      provider_type?: string;
    }

    export namespace Authorization {
      export interface Oauth2 {
        scopes?: Array<string>;
      }
    }
  }
}

export interface ToolListParams extends OffsetPageParams {
  /**
   * Toolkit name
   */
  toolkit?: string;
}

export interface ToolAuthorizeParams {
  tool_name: string;

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
   * JSON input to the tool, if any
   */
  input?: Record<string, unknown>;

  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately
   */
  run_at?: string;

  /**
   * The tool version to use (optional). If not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

Tools.ToolListResponsesOffsetPage = ToolListResponsesOffsetPage;
Tools.Scheduled = Scheduled;
Tools.Formatted = Formatted;
Tools.FormattedListResponsesOffsetPage = FormattedListResponsesOffsetPage;

export declare namespace Tools {
  export {
    type AuthorizeToolRequest as AuthorizeToolRequest,
    type ExecuteToolRequest as ExecuteToolRequest,
    type ExecuteToolResponse as ExecuteToolResponse,
    type ToolExecution as ToolExecution,
    type ToolExecutionAttempt as ToolExecutionAttempt,
    type ValueSchema as ValueSchema,
    type ToolListResponse as ToolListResponse,
    type ToolGetResponse as ToolGetResponse,
    ToolListResponsesOffsetPage as ToolListResponsesOffsetPage,
    type ToolListParams as ToolListParams,
    type ToolAuthorizeParams as ToolAuthorizeParams,
    type ToolExecuteParams as ToolExecuteParams,
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
    FormattedListResponsesOffsetPage as FormattedListResponsesOffsetPage,
    type FormattedListParams as FormattedListParams,
    type FormattedGetParams as FormattedGetParams,
  };
}
