// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as ToolsAPI from './tools';
import { OffsetPage } from '../pagination';

export interface AuthorizationResponse {
  authorization_id?: string;

  authorization_url?: string;

  context?: AuthorizationResponse.Context;

  scopes?: Array<string>;

  status?: 'pending' | 'completed' | 'failed';
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

export class ToolDefinitionsOffsetPage extends OffsetPage<ToolDefinition> {}
