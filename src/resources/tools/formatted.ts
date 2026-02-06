// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { OffsetPage, type OffsetPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Formatted extends APIResource {
  /**
   * Returns a page of tools from the engine configuration, optionally filtered by
   * toolkit, formatted for a specific provider
   */
  list(
    query: FormattedListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FormattedListResponsesOffsetPage, FormattedListResponse> {
    return this._client.getAPIList('/v1/formatted_tools', OffsetPage<FormattedListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Returns the formatted tool specification for a specific tool, given a provider
   */
  get(
    name: string,
    query: FormattedGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FormattedGetResponse> {
    return this._client.get(path`/v1/formatted_tools/${name}`, { query, ...options });
  }
}

export type FormattedListResponsesOffsetPage = OffsetPage<FormattedListResponse>;

export type FormattedListResponse = { [key: string]: unknown };

export type FormattedGetResponse = { [key: string]: unknown };

export interface FormattedListParams extends OffsetPageParams {
  /**
   * Provider format
   */
  format?: string;

  /**
   * Include all versions of each tool
   */
  include_all_versions?: boolean;

  /**
   * Toolkit name
   */
  toolkit?: string;

  /**
   * User ID
   */
  user_id?: string;
}

export interface FormattedGetParams {
  /**
   * Provider format
   */
  format?: string;

  /**
   * User ID
   */
  user_id?: string;
}

export declare namespace Formatted {
  export {
    type FormattedListResponse as FormattedListResponse,
    type FormattedGetResponse as FormattedGetResponse,
    type FormattedListResponsesOffsetPage as FormattedListResponsesOffsetPage,
    type FormattedListParams as FormattedListParams,
    type FormattedGetParams as FormattedGetParams,
  };
}
