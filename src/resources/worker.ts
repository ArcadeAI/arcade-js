// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';

export class Worker extends APIResource {}

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

export declare namespace Worker {
  export {
    type CreateWorkerRequest as CreateWorkerRequest,
    type UpdateWorkerRequest as UpdateWorkerRequest,
    type WorkerHealthResponse as WorkerHealthResponse,
    type WorkerResponse as WorkerResponse,
  };
}
