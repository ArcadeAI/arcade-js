// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { OffsetPage, type OffsetPageParams } from '../../pagination';

export class UserConnections extends APIResource {
  /**
   * List all auth connections
   */
  list(
    query?: UserConnectionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<UserConnectionResponsesOffsetPage, UserConnectionResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<UserConnectionResponsesOffsetPage, UserConnectionResponse>;
  list(
    query: UserConnectionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<UserConnectionResponsesOffsetPage, UserConnectionResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/admin/user_connections', UserConnectionResponsesOffsetPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete a user/auth provider connection
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/admin/user_connections/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class UserConnectionResponsesOffsetPage extends OffsetPage<UserConnectionResponse> {}

export interface UserConnectionResponse {
  id?: string;

  connection_id?: string;

  connection_status?: string;

  provider_description?: string;

  provider_id?: string;

  provider_type?: string;

  provider_user_info?: unknown;

  scopes?: Array<string>;

  user_id?: string;
}

export interface UserConnectionListParams extends OffsetPageParams {
  provider?: UserConnectionListParams.Provider;

  user?: UserConnectionListParams.User;
}

export namespace UserConnectionListParams {
  export interface Provider {
    /**
     * Provider ID
     */
    id?: string;
  }

  export interface User {
    /**
     * User ID
     */
    id?: string;
  }
}

UserConnections.UserConnectionResponsesOffsetPage = UserConnectionResponsesOffsetPage;

export declare namespace UserConnections {
  export {
    type UserConnectionResponse as UserConnectionResponse,
    UserConnectionResponsesOffsetPage as UserConnectionResponsesOffsetPage,
    type UserConnectionListParams as UserConnectionListParams,
  };
}
