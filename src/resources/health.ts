// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Health extends APIResource {
  /**
   * Check if Arcade Engine is healthy
   */
  check(options?: RequestOptions): APIPromise<HealthSchema> {
    return this._client.get('/v1/health', options);
  }
}

export interface HealthSchema {
  healthy?: boolean;
}

export declare namespace Health {
  export { type HealthSchema as HealthSchema };
}
