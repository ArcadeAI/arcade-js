// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ToolsAPI from './tools';
import * as Shared from './shared';

export class Tools extends APIResource {
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
   * Returns the arcade tool specification for a specific tool
   */
  definition(query: ToolDefinitionParams, options?: Core.RequestOptions): Core.APIPromise<Definition> {
    return this._client.get('/v1/tools/definition', { query, ...options });
  }

  /**
   * Executes a tool by name and arguments
   */
  execute(body: ToolExecuteParams, options?: Core.RequestOptions): Core.APIPromise<ToolResponse> {
    return this._client.post('/v1/tools/execute', { body, ...options });
  }
}

export interface Definition {
  inputs: Definition.Inputs;

  name: string;

  version: string;

  description?: string;

  output?: Definition.Output;

  requirements?: Definition.Requirements;
}

export namespace Definition {
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
      provider: string;

      oauth2?: Authorization.Oauth2;
    }

    export namespace Authorization {
      export interface Oauth2 {
        authority?: string;

        scopes?: Array<string>;
      }
    }
  }
}

export interface ToolResponse {
  invocation_id: string;

  duration?: number;

  finished_at?: ToolResponse.FinishedAt;

  output?: ToolResponse.Output;

  success?: boolean;
}

export namespace ToolResponse {
  export interface FinishedAt {
    'time.Time'?: string;
  }

  export interface Output {
    value: unknown;

    error?: Output.Error;
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

export interface ToolAuthorizeParams {
  tool_name: string;

  user_id: string;

  /**
   * Optional: if not provided, latest version is assumed
   */
  tool_version?: string;
}

export interface ToolDefinitionParams {
  /**
   * Director ID
   */
  director_id: string;

  /**
   * Tool ID
   */
  tool_id: string;
}

export interface ToolExecuteParams {
  /**
   * Serialized JSON string
   */
  inputs: string;

  tool_name: string;

  tool_version: string;

  user_id: string;
}

export namespace Tools {
  export import Definition = ToolsAPI.Definition;
  export import ToolResponse = ToolsAPI.ToolResponse;
  export import ToolAuthorizeParams = ToolsAPI.ToolAuthorizeParams;
  export import ToolDefinitionParams = ToolsAPI.ToolDefinitionParams;
  export import ToolExecuteParams = ToolsAPI.ToolExecuteParams;
}
