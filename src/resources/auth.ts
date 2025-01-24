// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Shared from './shared';
import * as Core from '../core';

export const DEFAULT_LONGPOLL_WAIT_TIME = 45;

/**
 * Error thrown when authorization-related operations fail
 */
export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class Auth extends APIResource {
  /**
   * Starts the authorization process for a given provider and scopes.
   * @param userId - The user ID for which authorization is being requested
   * @param provider - The authorization provider (e.g., 'github', 'google', 'linkedin', 'microsoft', 'slack', 'spotify', 'x', 'zoom')
   * @param options - Optional parameters
   * @param options.providerType - The type of authorization provider. Defaults to 'oauth2'
   * @param options.scopes - A list of scopes required for authorization, if any. Defaults to []
   * @returns The authorization response
   *
   * Example:
   * ```ts
   * const authResponse = await client.auth.start("user@example.com", "github");
   * ```
   */
  start(
    userId: string,
    provider: string,
    options: AuthStartOptions = {},
  ): Core.APIPromise<Shared.AuthorizationResponse> {
    const { providerType = 'oauth2', scopes = [] } = options;

    const authRequirement: AuthAuthorizeParams.AuthRequirement = {
      provider_id: provider,
      provider_type: providerType,
      oauth2: {
        scopes,
      },
    };

    return this.authorize({
      auth_requirement: authRequirement,
      user_id: userId,
    });
  }

  /**
   * Starts the authorization process for given authorization requirements
   */
  authorize(
    body: AuthAuthorizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthorizationResponse> {
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
  ): Core.APIPromise<Shared.AuthorizationResponse> {
    return this._client.get('/v1/auth/status', { query, ...options });
  }

  /**
   * Waits for the authorization process to complete.
   * @param authResponseOrId - The authorization response or ID to wait for completion
   * @returns The completed authorization response
   * @throws {AuthorizationError} When the authorization ID is missing or invalid
   *
   * Example:
   * ```ts
   * const authResponse = await client.auth.start("user@example.com", "github");
   * try {
   *   const completedAuth = await client.auth.waitForCompletion(authResponse);
   *   console.log('Authorization completed:', completedAuth);
   * } catch (error) {
   *   if (error instanceof AuthorizationError) {
   *     console.error('Authorization failed:', error.message);
   *   }
   * }
   * ```
   */
  async waitForCompletion(
    authResponseOrId: Shared.AuthorizationResponse | string,
  ): Promise<Shared.AuthorizationResponse> {
    let authId: string;
    let authResponse: Shared.AuthorizationResponse;

    if (typeof authResponseOrId === 'string') {
      authId = authResponseOrId;
      authResponse = { status: 'pending' } as Shared.AuthorizationResponse;
    } else {
      if (!authResponseOrId.id) {
        throw new AuthorizationError('Authorization ID is required');
      }
      authId = authResponseOrId.id;
      authResponse = authResponseOrId;
    }

    while (authResponse.status !== 'completed') {
      authResponse = await this.status({
        id: authId,
        wait: DEFAULT_LONGPOLL_WAIT_TIME,
      });
    }

    return authResponse;
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

export interface AuthStartOptions {
  /**
   * The type of authorization provider
   * @default 'oauth2'
   */
  providerType?: string;

  /**
   * A list of scopes required for authorization
   * @default []
   */
  scopes?: string[];
}

export declare namespace Auth {
  export {
    type AuthRequest as AuthRequest,
    type AuthAuthorizeParams as AuthAuthorizeParams,
    type AuthStatusParams as AuthStatusParams,
    type AuthStartOptions as AuthStartOptions,
  };
}
