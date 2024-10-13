// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as HealthAPI from './health';

export class Health extends APIResource {
  /**
   * Engine Health
   */
  check(options?: Core.RequestOptions): Core.APIPromise<HealthSchema> {
    return this._client.get('/v1/health', options);
  }
}

export interface HealthSchema {
  healthy?: boolean;
}

export namespace Health {
  export import HealthSchema = HealthAPI.HealthSchema;
}
