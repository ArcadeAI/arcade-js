// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Secrets extends APIResource {
  /**
   * Create or update a secret
   */
  create(secretKey: string, body: SecretCreateParams, options?: RequestOptions): APIPromise<SecretResponse> {
    return this._client.post(path`/v1/admin/secrets/${secretKey}`, { body, ...options });
  }

  /**
   * List all secrets that are visible to the caller
   */
  list(options?: RequestOptions): APIPromise<SecretListResponse> {
    return this._client.get('/v1/admin/secrets', options);
  }

  /**
   * Delete a secret by its ID
   */
  delete(secretID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/admin/secrets/${secretID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SecretResponse {
  id?: string;

  binding?: SecretResponse.Binding;

  created_at?: string;

  description?: string;

  hint?: string;

  key?: string;

  last_accessed_at?: string;

  updated_at?: string;
}

export namespace SecretResponse {
  export interface Binding {
    id?: string;

    type?: 'static' | 'tenant' | 'project' | 'account';
  }
}

export interface SecretListResponse {
  items?: Array<SecretResponse>;

  limit?: number;

  offset?: number;

  page_count?: number;

  total_count?: number;
}

export interface SecretCreateParams {
  value: string;

  description?: string;
}

export declare namespace Secrets {
  export {
    type SecretResponse as SecretResponse,
    type SecretListResponse as SecretListResponse,
    type SecretCreateParams as SecretCreateParams,
  };
}
