// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as AuthAPI from './auth';
import * as Shared from './shared';

export class Auth extends APIResource {
  /**
   * Starts the authorization process for given authorization requirements
   */
  authorization(
    body: AuthAuthorizationParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthorizationResponse> {
    return this._client.post('/v1/auth/authorize', { body, ...options });
  }

  /**
   * Checks the status of an ongoing authorization process for a specific tool
   */
  status(
    query: AuthStatusParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthorizationResponse> {
    return this._client.get('/v1/auth/status', { query, ...options });
  }
}

export interface AuthAuthorizationParams {
  auth_requirement: AuthAuthorizationParams.AuthRequirement;

  user_id: string;
}

export namespace AuthAuthorizationParams {
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
  export import AuthAuthorizationParams = AuthAPI.AuthAuthorizationParams;
  export import AuthStatusParams = AuthAPI.AuthStatusParams;
}
