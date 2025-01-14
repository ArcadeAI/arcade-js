// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AuthorizationResponse {
  id?: string;

  context?: AuthorizationResponse.Context;

  provider_id?: string;

  scopes?: Array<string>;

  status?: 'pending' | 'completed' | 'failed';

  url?: string;

  user_id?: string;
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
