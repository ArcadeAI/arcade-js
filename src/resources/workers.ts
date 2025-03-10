// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ToolsAPI from './tools/tools';
import { OffsetPage, type OffsetPageParams } from '../pagination';

export class Workers extends APIResource {
  /**
   * Create a worker
   */
  create(body: WorkerCreateParams, options?: Core.RequestOptions): Core.APIPromise<WorkerResponse> {
    return this._client.post('/v1/workers', { body, ...options });
  }

  /**
   * Update a worker
   */
  update(
    id: string,
    body: WorkerUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WorkerResponse> {
    return this._client.patch(`/v1/workers/${id}`, { body, ...options });
  }

  /**
   * List all workers with their definitions
   */
  list(
    query?: WorkerListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<WorkerResponsesOffsetPage, WorkerResponse>;
  list(options?: Core.RequestOptions): Core.PagePromise<WorkerResponsesOffsetPage, WorkerResponse>;
  list(
    query: WorkerListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<WorkerResponsesOffsetPage, WorkerResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/workers', WorkerResponsesOffsetPage, { query, ...options });
  }

  /**
   * Delete a worker
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/workers/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get a worker by ID
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<WorkerResponse> {
    return this._client.get(`/v1/workers/${id}`, options);
  }

  /**
   * Get the health of a worker
   */
  health(id: string, options?: Core.RequestOptions): Core.APIPromise<WorkerHealthResponse> {
    return this._client.get(`/v1/workers/${id}/health`, options);
  }

  /**
   * Returns a page of tools
   */
  tools(id: string, options?: Core.RequestOptions): Core.APIPromise<WorkerToolsResponse> {
    return this._client.get(`/v1/workers/${id}/tools`, options);
  }
}

export class WorkerResponsesOffsetPage extends OffsetPage<WorkerResponse> {}

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

export interface WorkerToolsResponse {
  items?: Array<ToolsAPI.ToolDefinition>;

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

export interface WorkerUpdateParams {
  enabled?: boolean;

  http?: WorkerUpdateParams.HTTP;
}

export namespace WorkerUpdateParams {
  export interface HTTP {
    retry?: number;

    secret?: string;

    timeout?: number;

    uri?: string;
  }
}

export interface WorkerListParams extends OffsetPageParams {}

Workers.WorkerResponsesOffsetPage = WorkerResponsesOffsetPage;

export declare namespace Workers {
  export {
    type CreateWorkerRequest as CreateWorkerRequest,
    type UpdateWorkerRequest as UpdateWorkerRequest,
    type WorkerHealthResponse as WorkerHealthResponse,
    type WorkerResponse as WorkerResponse,
    type WorkerToolsResponse as WorkerToolsResponse,
    WorkerResponsesOffsetPage as WorkerResponsesOffsetPage,
    type WorkerCreateParams as WorkerCreateParams,
    type WorkerUpdateParams as WorkerUpdateParams,
    type WorkerListParams as WorkerListParams,
  };
}
