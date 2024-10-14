// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ToolsAPI from './tools';
import * as Shared from '../shared';
import * as DefinitionAPI from './definition';

export class Tools extends APIResource {
  definition: DefinitionAPI.Definition = new DefinitionAPI.Definition(this._client);

  /**
   * Returns a list of tools, optionally filtered by toolkit or auth provider
   */
  list(query?: ToolListParams, options?: Core.RequestOptions): Core.APIPromise<ToolListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ToolListResponse>;
  list(
    query: ToolListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/tools/list', { query, ...options });
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
  execute(body: ToolExecuteParams, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.post('/v1/tools/execute', { body, ...options });
  }
}

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
   * Serialized JSON string
   */
  inputs?: string;

  /**
   * Optional: if not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

export interface Inputs {
  parameters?: Array<Parameter>;
}

export interface Output {
  available_modes?: Array<string>;

  description?: string;

  value_schema?: ValueSchema;
}

export interface Parameter {
  name: string;

  value_schema: ValueSchema;

  description?: string;

  inferrable?: boolean;

  required?: boolean;
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

export interface Response {
  invocation_id: string;

  duration?: number;

  finished_at?: Response.FinishedAt;

  output?: ResponseOutput;

  success?: boolean;
}

export namespace Response {
  export interface FinishedAt {
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

export interface ToolkitDefinition {
  name: string;

  description?: string;

  version?: string;
}

export interface ValueSchema {
  val_type: string;

  enum?: Array<string>;

  inner_val_type?: string;
}

export type ToolListResponse = Array<Shared.ToolDefinition>;

export interface ToolListParams {
  /**
   * Toolkit Name
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
   * Serialized JSON string
   */
  inputs?: string;

  /**
   * Optional: if not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

export namespace Tools {
  export import AuthorizeToolRequest = ToolsAPI.AuthorizeToolRequest;
  export import ExecuteToolRequest = ToolsAPI.ExecuteToolRequest;
  export import Inputs = ToolsAPI.Inputs;
  export import Output = ToolsAPI.Output;
  export import Parameter = ToolsAPI.Parameter;
  export import Requirements = ToolsAPI.Requirements;
  export import Response = ToolsAPI.Response;
  export import ResponseOutput = ToolsAPI.ResponseOutput;
  export import ToolkitDefinition = ToolsAPI.ToolkitDefinition;
  export import ValueSchema = ToolsAPI.ValueSchema;
  export import ToolListResponse = ToolsAPI.ToolListResponse;
  export import ToolListParams = ToolsAPI.ToolListParams;
  export import ToolAuthorizeParams = ToolsAPI.ToolAuthorizeParams;
  export import ToolExecuteParams = ToolsAPI.ToolExecuteParams;
  export import Definition = DefinitionAPI.Definition;
  export import DefinitionGetParams = DefinitionAPI.DefinitionGetParams;
}
