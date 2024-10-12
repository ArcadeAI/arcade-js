// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as AuthorizationAPI from './authorization';
import * as Shared from './shared';

export class Authorization extends APIResource {
  /**
   * Starts the authorization process for given authorization requirements
   */
  authorize(
    body: AuthorizationAuthorizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthorizationResponse> {
    return this._client.post('/v1/auth/authorize', { body, ...options });
  }

  /**
   * Checks the status of an ongoing authorization process for a specific tool
   */
  status(
    query: AuthorizationStatusParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthorizationResponse> {
    return this._client.get('/v1/auth/status', { query, ...options });
  }
}

export interface AuthorizationAuthorizeParams {
  auth_requirement: AuthorizationAuthorizeParams.AuthRequirement;

  user_id: string;
}

export namespace AuthorizationAuthorizeParams {
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

export interface AuthorizationStatusParams {
  /**
   * Authorization ID
   */
  authorizationID: string;

  /**
   * Scopes
   */
  scopes?: string;
}

export namespace Authorization {
  export import AuthorizationAuthorizeParams = AuthorizationAPI.AuthorizationAuthorizeParams;
  export import AuthorizationStatusParams = AuthorizationAPI.AuthorizationStatusParams;
}
