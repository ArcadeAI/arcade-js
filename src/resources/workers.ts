// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ToolsAPI from './tools/tools';
import { ToolDefinitionsOffsetPage } from './tools/tools';
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
  tools(
    id: string,
    query?: WorkerToolsParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolDefinitionsOffsetPage, ToolsAPI.ToolDefinition>;
  tools(
    id: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolDefinitionsOffsetPage, ToolsAPI.ToolDefinition>;
  tools(
    id: string,
    query: WorkerToolsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolDefinitionsOffsetPage, ToolsAPI.ToolDefinition> {
    if (isRequestOptions(query)) {
      return this.tools(id, {}, query);
    }
    return this._client.getAPIList(`/v1/workers/${id}/tools`, ToolDefinitionsOffsetPage, {
      query,
      ...options,
    });
  }
}

export class WorkerResponsesOffsetPage extends OffsetPage<WorkerResponse> {}

export interface CreateWorkerRequest {
  id: string;

  enabled?: boolean;

  http?: CreateWorkerRequest.HTTP;

  mcp?: CreateWorkerRequest.Mcp;

  type?: string;
}

export namespace CreateWorkerRequest {
  export interface HTTP {
    retry: number;

    secret: string;

    timeout: number;

    uri: string;
  }

  export interface Mcp {
    retry: number;

    timeout: number;

    uri: string;
  }
}

export interface UpdateWorkerRequest {
  enabled?: boolean;

  http?: UpdateWorkerRequest.HTTP;

  mcp?: UpdateWorkerRequest.Mcp;
}

export namespace UpdateWorkerRequest {
  export interface HTTP {
    retry?: number;

    secret?: string;

    timeout?: number;

    uri?: string;
  }

  export interface Mcp {
    retry?: number;

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

  binding?: WorkerResponse.Binding;

  enabled?: boolean;

  http?: WorkerResponse.HTTP;

  mcp?: WorkerResponse.Mcp;

  oxp?: WorkerResponse.Oxp;

  type?: 'http' | 'mcp' | 'unknown';
}

export namespace WorkerResponse {
  export interface Binding {
    id?: string;

    type?: 'static' | 'tenant' | 'organization' | 'account';
  }

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

  export interface Mcp {
    retry?: number;

    timeout?: number;

    uri?: string;
  }

  export interface Oxp {
    retry?: number;

    secret?: Oxp.Secret;

    timeout?: number;

    uri?: string;
  }

  export namespace Oxp {
    export interface Secret {
      binding?: 'static' | 'tenant' | 'organization' | 'account';

      editable?: boolean;

      exists?: boolean;

      hint?: string;

      value?: string;
    }
  }
}

export interface WorkerCreateParams {
  id: string;

  enabled?: boolean;

  http?: WorkerCreateParams.HTTP;

  mcp?: WorkerCreateParams.Mcp;

  type?: string;
}

export namespace WorkerCreateParams {
  export interface HTTP {
    retry: number;

    secret: string;

    timeout: number;

    uri: string;
  }

  export interface Mcp {
    retry: number;

    timeout: number;

    uri: string;
  }
}

export interface WorkerUpdateParams {
  enabled?: boolean;

  http?: WorkerUpdateParams.HTTP;

  mcp?: WorkerUpdateParams.Mcp;
}

export namespace WorkerUpdateParams {
  export interface HTTP {
    retry?: number;

    secret?: string;

    timeout?: number;

    uri?: string;
  }

  export interface Mcp {
    retry?: number;

    timeout?: number;

    uri?: string;
  }
}

export interface WorkerListParams extends OffsetPageParams {}

export interface WorkerToolsParams extends OffsetPageParams {}

Workers.WorkerResponsesOffsetPage = WorkerResponsesOffsetPage;

export declare namespace Workers {
  export {
    type CreateWorkerRequest as CreateWorkerRequest,
    type UpdateWorkerRequest as UpdateWorkerRequest,
    type WorkerHealthResponse as WorkerHealthResponse,
    type WorkerResponse as WorkerResponse,
    WorkerResponsesOffsetPage as WorkerResponsesOffsetPage,
    type WorkerCreateParams as WorkerCreateParams,
    type WorkerUpdateParams as WorkerUpdateParams,
    type WorkerListParams as WorkerListParams,
    type WorkerToolsParams as WorkerToolsParams,
  };
}

export { ToolDefinitionsOffsetPage };
