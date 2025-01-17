// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Auth extends APIResource {
  /**
   * Starts the authorization process for given authorization requirements
   */
  authorize(
    body: AuthAuthorizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthAuthorizationResponse> {
    return this._client.post('/v1/auth/authorize', { body, ...options });
  }

  /**
   * Checks the status of an ongoing authorization process for a specific tool. If
   * 'wait' param is present, does not respond until either the auth status becomes
   * completed or the timeout is reached.
   */
  status(
    query: AuthStatusParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthAuthorizationResponse> {
    return this._client.get('/v1/auth/status', { query, ...options });
  }
}

export interface AuthRequest {
  auth_requirement: AuthRequest.AuthRequirement;

  user_id: string;
}

export namespace AuthRequest {
  export interface AuthRequirement {
    /**
     * one of ID or ProviderID must be set
     */
    id?: string;

    oauth2?: AuthRequirement.Oauth2;

    /**
     * one of ID or ProviderID must be set
     */
    provider_id?: string;

    provider_type?: string;
  }

  export namespace AuthRequirement {
    export interface Oauth2 {
      scopes?: Array<string>;
    }
  }
}

export interface AuthAuthorizeParams {
  auth_requirement: AuthAuthorizeParams.AuthRequirement;

  user_id: string;
}

export namespace AuthAuthorizeParams {
  export interface AuthRequirement {
    /**
     * one of ID or ProviderID must be set
     */
    id?: string;

    oauth2?: AuthRequirement.Oauth2;

    /**
     * one of ID or ProviderID must be set
     */
    provider_id?: string;

    provider_type?: string;
  }

  export namespace AuthRequirement {
    export interface Oauth2 {
      scopes?: Array<string>;
    }
  }
}

export interface AuthStatusParams {
  /**
   * Authorization ID
   */
  id: string;

  /**
   * Timeout in seconds (max 59)
   */
  wait?: number;
}

export declare namespace Auth {
  export {
    type AuthRequest as AuthRequest,
    type AuthAuthorizeParams as AuthAuthorizeParams,
    type AuthStatusParams as AuthStatusParams,
  };
}
