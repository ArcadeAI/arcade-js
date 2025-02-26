// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Worker extends APIResource {
  /**
   * Create a worker
   */
  create(body: WorkerCreateParams, options?: Core.RequestOptions): Core.APIPromise<WorkerResponse> {
    return this._client.post('/v1/admin/workers', { body, ...options });
  }

  /**
   * List all workers with their definitions
   */
  list(options?: Core.RequestOptions): Core.APIPromise<WorkerListResponse> {
    return this._client.get('/v1/admin/workers', options);
  }
}

export interface CreateWorkerRequest {
  id: string;

  enabled: boolean;

  http?: CreateWorkerRequest.HTTP;
}

export namespace CreateWorkerRequest {
  export interface HTTP {
    retry: number;

    secret: string;

    timeout: number;

    uri: string;
  }
}

export interface UpdateWorkerRequest {
  enabled?: boolean;

  http?: UpdateWorkerRequest.HTTP;
}

export namespace UpdateWorkerRequest {
  export interface HTTP {
    retry?: number;

    secret?: string;

    timeout?: number;

    uri?: string;
  }
}

export interface WorkerHealthResponse {
  id?: string;

  enabled?: boolean;

  healthy?: boolean;

  message?: string;
}

export interface WorkerResponse {
  id?: string;

  enabled?: boolean;

  http?: WorkerResponse.HTTP;

  type?: string;
}

export namespace WorkerResponse {
  export interface HTTP {
    retry?: number;

    secret?: HTTP.Secret;

    timeout?: number;

    uri?: string;
  }

  export namespace HTTP {
    export interface Secret {
      binding?: 'static' | 'tenant' | 'organization' | 'account';

      editable?: boolean;

      exists?: boolean;

      hint?: string;

      value?: string;
    }
  }
}

export interface WorkerListResponse {
  items?: Array<WorkerResponse>;

  limit?: number;

  offset?: number;

  page_count?: number;

  total_count?: number;
}

export interface WorkerCreateParams {
  id: string;

  enabled: boolean;

  http?: WorkerCreateParams.HTTP;
}

export namespace WorkerCreateParams {
  export interface HTTP {
    retry: number;

    secret: string;

    timeout: number;

    uri: string;
  }
}

export declare namespace Worker {
  export {
    type CreateWorkerRequest as CreateWorkerRequest,
    type UpdateWorkerRequest as UpdateWorkerRequest,
    type WorkerHealthResponse as WorkerHealthResponse,
    type WorkerResponse as WorkerResponse,
    type WorkerListResponse as WorkerListResponse,
    type WorkerCreateParams as WorkerCreateParams,
  };
}
