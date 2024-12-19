// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
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
import { Scheduled, ScheduledDetailsResponse, ScheduledListResponse } from './scheduled';
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
    return this._client.getAPIList('/v1/tools/list', ToolListResponsesOffsetPage, { query, ...options });
  }

  /**
   * Authorizes a user for a specific tool by name
   */
  authorize(
    body: ToolAuthorizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthorizationResponse> {
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
  get(query: ToolGetParams, options?: Core.RequestOptions): Core.APIPromise<ToolGetResponse> {
    return this._client.get('/v1/tools/definition', { query, ...options });
  }
}

export class ToolListResponsesOffsetPage extends OffsetPage<ToolListResponse> {}

export interface AuthorizeToolRequest {
  tool_name: string;

  user_id: string;

  /**
   * Optional: if not provided, any version is used
   */
  tool_version?: string;
}

export interface ExecuteToolRequest {
  tool_name: string;

  /**
   * JSON input to the tool, if any
   */
  inputs?: unknown;

  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately
   */
  run_at?: ExecuteToolRequest.RunAt;

  /**
   * The tool version to use (optional). If not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

export namespace ExecuteToolRequest {
  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately
   */
  export interface RunAt {
    'time.Time'?: string;
  }
}

export interface ExecuteToolResponse {
  id?: string;

  duration?: number;

  execution_type?: string;

  finished_at?: ExecuteToolResponse.FinishedAt;

  invocation_id?: string;

  output?: ResponseOutput;

  run_at?: ExecuteToolResponse.RunAt;

  status?: string;

  /**
   * Whether the request was successful. For immediately-executed requests, this will
   * be true if the tool call succeeded. For scheduled requests, this will be true if
   * the request was scheduled successfully.
   */
  success?: boolean;
}

export namespace ExecuteToolResponse {
  export interface FinishedAt {
    'time.Time'?: string;
  }

  export interface RunAt {
    'time.Time'?: string;
  }
}

export interface ResponseOutput {
  error?: ResponseOutput.Error;

  requires_authorization?: Shared.AuthorizationResponse;

  value?: unknown;
}

export namespace ResponseOutput {
  export interface Error {
    message: string;

    additional_prompt_content?: string;

    can_retry?: boolean;

    developer_message?: string;

    retry_after_ms?: number;
  }
}

export interface ToolExecution {
  id?: string;

  created_at?: ToolExecution.CreatedAt;

  execution_status?: string;

  execution_type?: string;

  finished_at?: ToolExecution.FinishedAt;

  run_at?: ToolExecution.RunAt;

  started_at?: ToolExecution.StartedAt;

  tool_name?: string;

  toolkit_name?: string;

  toolkit_version?: string;

  updated_at?: ToolExecution.UpdatedAt;

  user_id?: string;
}

export namespace ToolExecution {
  export interface CreatedAt {
    'time.Time'?: string;
  }

  export interface FinishedAt {
    'time.Time'?: string;
  }

  export interface RunAt {
    'time.Time'?: string;
  }

  export interface StartedAt {
    'time.Time'?: string;
  }

  export interface UpdatedAt {
    'time.Time'?: string;
  }
}

export interface ToolExecutionAttempt {
  id?: string;

  finished_at?: ToolExecutionAttempt.FinishedAt;

  output?: ResponseOutput;

  started_at?: ToolExecutionAttempt.StartedAt;

  success?: boolean;

  system_error_message?: string;
}

export namespace ToolExecutionAttempt {
  export interface FinishedAt {
    'time.Time'?: string;
  }

  export interface StartedAt {
    'time.Time'?: string;
  }
}

export interface ToolListResponse {
  inputs: ToolListResponse.Inputs;

  name: string;

  toolkit: ToolListResponse.Toolkit;

  description?: string;

  fully_qualified_name?: string;

  output?: ToolListResponse.Output;

  requirements?: ToolListResponse.Requirements;
}

export namespace ToolListResponse {
  export interface Inputs {
    parameters?: Array<Inputs.Parameter>;
  }

  export namespace Inputs {
    export interface Parameter {
      name: string;

      value_schema: Parameter.ValueSchema;

      description?: string;

      inferrable?: boolean;

      required?: boolean;
    }

    export namespace Parameter {
      export interface ValueSchema {
        val_type: string;

        enum?: Array<string>;

        inner_val_type?: string;
      }
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

    value_schema?: Output.ValueSchema;
  }

  export namespace Output {
    export interface ValueSchema {
      val_type: string;

      enum?: Array<string>;

      inner_val_type?: string;
    }
  }

  export interface Requirements {
    authorization?: Requirements.Authorization;
  }

  export namespace Requirements {
    export interface Authorization {
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
  inputs: ToolGetResponse.Inputs;

  name: string;

  toolkit: ToolGetResponse.Toolkit;

  description?: string;

  fully_qualified_name?: string;

  output?: ToolGetResponse.Output;

  requirements?: ToolGetResponse.Requirements;
}

export namespace ToolGetResponse {
  export interface Inputs {
    parameters?: Array<Inputs.Parameter>;
  }

  export namespace Inputs {
    export interface Parameter {
      name: string;

      value_schema: Parameter.ValueSchema;

      description?: string;

      inferrable?: boolean;

      required?: boolean;
    }

    export namespace Parameter {
      export interface ValueSchema {
        val_type: string;

        enum?: Array<string>;

        inner_val_type?: string;
      }
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

    value_schema?: Output.ValueSchema;
  }

  export namespace Output {
    export interface ValueSchema {
      val_type: string;

      enum?: Array<string>;

      inner_val_type?: string;
    }
  }

  export interface Requirements {
    authorization?: Requirements.Authorization;
  }

  export namespace Requirements {
    export interface Authorization {
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

  user_id: string;

  /**
   * Optional: if not provided, any version is used
   */
  tool_version?: string;
}

export interface ToolExecuteParams {
  tool_name: string;

  /**
   * JSON input to the tool, if any
   */
  inputs?: unknown;

  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately
   */
  run_at?: ToolExecuteParams.RunAt;

  /**
   * The tool version to use (optional). If not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

export namespace ToolExecuteParams {
  /**
   * The time at which the tool should be run (optional). If not provided, the tool
   * is run immediately
   */
  export interface RunAt {
    'time.Time'?: string;
  }
}

export interface ToolGetParams {
  /**
   * Tool ID
   */
  toolId: string;
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
    type ResponseOutput as ResponseOutput,
    type ToolExecution as ToolExecution,
    type ToolExecutionAttempt as ToolExecutionAttempt,
    type ToolListResponse as ToolListResponse,
    type ToolGetResponse as ToolGetResponse,
    ToolListResponsesOffsetPage as ToolListResponsesOffsetPage,
    type ToolListParams as ToolListParams,
    type ToolAuthorizeParams as ToolAuthorizeParams,
    type ToolExecuteParams as ToolExecuteParams,
    type ToolGetParams as ToolGetParams,
  };

  export {
    Scheduled as Scheduled,
    type ScheduledListResponse as ScheduledListResponse,
    type ScheduledDetailsResponse as ScheduledDetailsResponse,
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
