// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AuthorizationContext {
  token?: string;

  user_info?: Record<string, unknown>;
}

export interface AuthorizationResponse {
  id?: string;

  context?: AuthorizationContext;

  provider_id?: string;

  scopes?: Array<string>;

  status?: 'pending' | 'completed' | 'failed';

  url?: string;

  user_id?: string;
}

export interface Error {
  message?: string;

  name?: string;
}
