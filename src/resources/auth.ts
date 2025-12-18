// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Auth extends APIResource {
  /**
   * Starts the authorization process for given authorization requirements
   */
  authorize(body: AuthAuthorizeParams, options?: RequestOptions): APIPromise<Shared.AuthorizationResponse> {
    return this._client.post('/v1/auth/authorize', { body, ...options });
  }

  /**
   * Confirms a user's details during an authorization flow
   */
  confirmUser(body: AuthConfirmUserParams, options?: RequestOptions): APIPromise<ConfirmUserResponse> {
    return this._client.post('/v1/auth/confirm_user', { body, ...options });
  }

  /**
   * Checks the status of an ongoing authorization process for a specific tool. If
   * 'wait' param is present, does not respond until either the auth status becomes
   * completed or the timeout is reached.
   */
  status(query: AuthStatusParams, options?: RequestOptions): APIPromise<Shared.AuthorizationResponse> {
    return this._client.get('/v1/auth/status', { query, ...options });
  }
}

export interface AuthRequest {
  auth_requirement: AuthRequest.AuthRequirement;

  user_id: string;

  /**
   * Optional: if provided, the user will be redirected to this URI after
   * authorization
   */
  next_uri?: string;
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

export interface ConfirmUserRequest {
  flow_id: string;

  user_id: string;
}

export interface ConfirmUserResponse {
  auth_id: string;

  next_uri?: string;
}

export interface AuthAuthorizeParams {
  auth_requirement: AuthAuthorizeParams.AuthRequirement;

  user_id: string;

  /**
   * Optional: if provided, the user will be redirected to this URI after
   * authorization
   */
  next_uri?: string;
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

export interface AuthConfirmUserParams {
  flow_id: string;

  user_id: string;
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
    type ConfirmUserRequest as ConfirmUserRequest,
    type ConfirmUserResponse as ConfirmUserResponse,
    type AuthAuthorizeParams as AuthAuthorizeParams,
    type AuthConfirmUserParams as AuthConfirmUserParams,
    type AuthStatusParams as AuthStatusParams,
  };
}
