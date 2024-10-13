// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as AuthAPI from './auth';

export class Auth extends APIResource {
  /**
   * Starts the authorization process for given authorization requirements
   */
  authorize(
    body: AuthAuthorizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthorizationResponse> {
    return this._client.post('/v1/auth/authorize', { body, ...options });
  }

  /**
   * Checks the status of an ongoing authorization process for a specific tool
   */
  status(query: AuthStatusParams, options?: Core.RequestOptions): Core.APIPromise<AuthorizationResponse> {
    return this._client.get('/v1/auth/status', { query, ...options });
  }
}

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

export interface AuthAuthorizeParams {
  auth_requirement: AuthAuthorizeParams.AuthRequirement;

  user_id: string;
}

export namespace AuthAuthorizeParams {
  export interface AuthRequirement {
    provider: string;

    oauth2?: AuthRequirement.Oauth2;
  }

  export namespace AuthRequirement {
    export interface Oauth2 {
      authority?: string;

      scopes?: Array<string>;
    }
  }
}

export interface AuthStatusParams {
  /**
   * Authorization ID
   */
  authorizationID: string;

  /**
   * Scopes
   */
  scopes?: string;
}

export namespace Auth {
  export import AuthorizationResponse = AuthAPI.AuthorizationResponse;
  export import AuthAuthorizeParams = AuthAPI.AuthAuthorizeParams;
  export import AuthStatusParams = AuthAPI.AuthStatusParams;
}
