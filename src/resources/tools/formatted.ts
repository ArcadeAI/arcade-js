// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as FormattedAPI from './formatted';
import { OffsetPage, type OffsetPageParams } from '../../pagination';

export class Formatted extends APIResource {
  /**
   * Returns a page of tools, optionally filtered by toolkit, formatted for a
   * specific provider
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
  get(query: FormattedGetParams, options?: Core.RequestOptions): Core.APIPromise<unknown> {
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
   * Tool ID
   */
  toolId: string;

  /**
   * Provider format
   */
  format?: string;
}

export namespace Formatted {
  export import FormattedListResponse = FormattedAPI.FormattedListResponse;
  export import FormattedGetResponse = FormattedAPI.FormattedGetResponse;
  export import FormattedListResponsesOffsetPage = FormattedAPI.FormattedListResponsesOffsetPage;
  export import FormattedListParams = FormattedAPI.FormattedListParams;
  export import FormattedGetParams = FormattedAPI.FormattedGetParams;
}
