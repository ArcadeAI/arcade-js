// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { OffsetPage, type OffsetPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class UserConnections extends APIResource {
  /**
   * List all auth connections
   */
  list(
    query: UserConnectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<UserConnectionResponsesOffsetPage, UserConnectionResponse> {
    return this._client.getAPIList('/v1/admin/user_connections', OffsetPage<UserConnectionResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a user/auth provider connection
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/admin/user_connections/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type UserConnectionResponsesOffsetPage = OffsetPage<UserConnectionResponse>;

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
  /**
   * Provider ID
   */
  provider_id?: string;

  /**
   * User ID
   */
  user_id?: string;
}

export declare namespace UserConnections {
  export {
    type UserConnectionResponse as UserConnectionResponse,
    type UserConnectionResponsesOffsetPage as UserConnectionResponsesOffsetPage,
    type UserConnectionListParams as UserConnectionListParams,
  };
}
