// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { OffsetPage, type OffsetPageParams } from '../../pagination';

export class Formatted extends APIResource {
  /**
   * Returns a page of tools from the engine configuration, optionally filtered by
   * toolkit, formatted for a specific provider
   */
  list(
    query?: FormattedListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FormattedListResponsesOffsetPage, FormattedListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<FormattedListResponsesOffsetPage, FormattedListResponse>;
  list(
    query: FormattedListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FormattedListResponsesOffsetPage, FormattedListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/tools/formatted/list', FormattedListResponsesOffsetPage, {
      query,
      ...options,
    });
  }

  /**
   * Returns the formatted tool specification for a specific tool, given a provider
   */
  get(query?: FormattedGetParams, options?: Core.RequestOptions): Core.APIPromise<unknown>;
  get(options?: Core.RequestOptions): Core.APIPromise<unknown>;
  get(
    query: FormattedGetParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<unknown> {
    if (isRequestOptions(query)) {
      return this.get({}, query);
    }
    return this._client.get('/v1/tools/formatted/definition', { query, ...options });
  }
}

export class FormattedListResponsesOffsetPage extends OffsetPage<FormattedListResponse> {}

export type FormattedListResponse = unknown;

export type FormattedGetResponse = unknown;

export interface FormattedListParams extends OffsetPageParams {
  /**
   * Provider format
   */
  format?: string;

  /**
   * Toolkit name
   */
  toolkit?: string;
}

export interface FormattedGetParams {
  /**
   * Provider format
   */
  format?: string;
}

Formatted.FormattedListResponsesOffsetPage = FormattedListResponsesOffsetPage;

export declare namespace Formatted {
  export {
    type FormattedListResponse as FormattedListResponse,
    type FormattedGetResponse as FormattedGetResponse,
    FormattedListResponsesOffsetPage as FormattedListResponsesOffsetPage,
    type FormattedListParams as FormattedListParams,
    type FormattedGetParams as FormattedGetParams,
  };
}
