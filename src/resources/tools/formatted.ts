// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Formatted extends APIResource {
  /**
   * Returns the formatted tool specification for a specific tool, given a provider
   */
  get(name: string, query?: FormattedGetParams, options?: Core.RequestOptions): Core.APIPromise<unknown>;
  get(name: string, options?: Core.RequestOptions): Core.APIPromise<unknown>;
  get(
    name: string,
    query: FormattedGetParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<unknown> {
    if (isRequestOptions(query)) {
      return this.get(name, {}, query);
    }
    return this._client.get(`/v1/formatted_tools/${name}`, { query, ...options });
  }
}

export type FormattedGetResponse = unknown;

export interface FormattedGetParams {
  /**
   * Provider format
   */
  format?: string;
}

export declare namespace Formatted {
  export { type FormattedGetResponse as FormattedGetResponse, type FormattedGetParams as FormattedGetParams };
}
