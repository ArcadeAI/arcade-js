// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as ToolsAPI from './tools/tools';

export interface AuthorizationResponse {
  authorization_id?: string;

  authorization_url?: string;

  context?: AuthorizationResponse.Context;

  scopes?: Array<string>;

  status?: string;
}

export namespace AuthorizationResponse {
  export interface Context {
    token?: string;

    user_info?: Record<string, unknown>;
  }
}

export interface Error {
  message?: string;

  name?: string;
}

export interface ToolDefinition {
  inputs: ToolsAPI.Inputs;

  name: string;

  toolkit: ToolsAPI.ToolkitDefinition;

  description?: string;

  output?: ToolsAPI.Output;

  requirements?: ToolsAPI.Requirements;
}
