// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AuthorizationResponse {
  authorizationID?: string;

  authorizationURL?: string;

  context?: AuthorizationResponse.Context;

  scopes?: Array<string>;

  status?: string;
}

export namespace AuthorizationResponse {
  export interface Context {
    token?: string;
  }
}
