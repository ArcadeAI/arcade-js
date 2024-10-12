// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as OperationsAPI from './operations';

export class Operations extends APIResource {
  /**
   * Engine Health
   */
  health(options?: Core.RequestOptions): Core.APIPromise<HealthSchema> {
    return this._client.get('/v1/health', options);
  }
}

export interface HealthSchema {
  healthy?: boolean;
}

export namespace Operations {
  export import HealthSchema = OperationsAPI.HealthSchema;
}
