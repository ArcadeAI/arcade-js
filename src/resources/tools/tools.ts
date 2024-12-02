// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import { ToolDefinitionsOffsetPage } from '../shared';
import * as FormattedAPI from './formatted';
import {
  Formatted,
  FormattedGetParams,
  FormattedGetResponse,
  FormattedListParams,
  FormattedListResponse,
  FormattedListResponsesOffsetPage,
} from './formatted';
import { type OffsetPageParams } from '../../pagination';

export class Tools extends APIResource {
  formatted: FormattedAPI.Formatted = new FormattedAPI.Formatted(this._client);

  /**
   * Returns a page of tools, optionally filtered by toolkit
   */
  list(
    query?: ToolListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolDefinitionsOffsetPage, Shared.ToolDefinition>;
  list(options?: Core.RequestOptions): Core.PagePromise<ToolDefinitionsOffsetPage, Shared.ToolDefinition>;
  list(
    query: ToolListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolDefinitionsOffsetPage, Shared.ToolDefinition> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/tools/list', ToolDefinitionsOffsetPage, { query, ...options });
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

  /**
   * Returns the arcade tool specification for a specific tool
   */
  get(query: ToolGetParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ToolDefinition> {
    return this._client.get('/v1/tools/definition', { query, ...options });
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
   * JSON input to the tool, if any
   */
  inputs?: unknown;

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
   * Optional: if not provided, any version is used
   */
  tool_version?: string;

  user_id?: string;
}

export interface ToolGetParams {
  /**
   * Tool ID
   */
  toolId: string;
}

Tools.Formatted = Formatted;
Tools.FormattedListResponsesOffsetPage = FormattedListResponsesOffsetPage;

export declare namespace Tools {
  export {
    type AuthorizeToolRequest as AuthorizeToolRequest,
    type ExecuteToolRequest as ExecuteToolRequest,
    type Inputs as Inputs,
    type Output as Output,
    type Parameter as Parameter,
    type Requirements as Requirements,
    type Response as Response,
    type ResponseOutput as ResponseOutput,
    type ToolkitDefinition as ToolkitDefinition,
    type ValueSchema as ValueSchema,
    type ToolListParams as ToolListParams,
    type ToolAuthorizeParams as ToolAuthorizeParams,
    type ToolExecuteParams as ToolExecuteParams,
    type ToolGetParams as ToolGetParams,
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

export { ToolDefinitionsOffsetPage };
