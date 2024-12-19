// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ToolsAPI from './tools';

export class Scheduled extends APIResource {
  /**
   * Returns a page of scheduled tool executions
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ScheduledListResponse> {
    return this._client.get('/v1/tools/scheduled', options);
  }

  /**
   * Returns the details for a specific scheduled tool execution
   */
  details(id: string, options?: Core.RequestOptions): Core.APIPromise<ScheduledDetailsResponse> {
    return this._client.get(`/v1/tools/scheduled/${id}`, options);
  }
}

export interface ScheduledListResponse {
  items?: Array<ToolsAPI.ToolExecution>;

  limit?: number;

  offset?: number;

  page_count?: number;

  total_count?: number;
}

export interface ScheduledDetailsResponse {
  id?: string;

  attempts?: Array<ToolsAPI.ToolExecutionAttempt>;

  created_at?: ScheduledDetailsResponse.CreatedAt;

  execution_status?: string;

  execution_type?: string;

  finished_at?: ScheduledDetailsResponse.FinishedAt;

  inputs?: Record<string, unknown>;

  run_at?: ScheduledDetailsResponse.RunAt;

  started_at?: ScheduledDetailsResponse.StartedAt;

  tool_name?: string;

  toolkit_name?: string;

  toolkit_version?: string;

  updated_at?: ScheduledDetailsResponse.UpdatedAt;

  user_id?: string;
}

export namespace ScheduledDetailsResponse {
  export interface CreatedAt {
    'time.Time'?: string;
  }

  export interface FinishedAt {
    'time.Time'?: string;
  }

  export interface RunAt {
    'time.Time'?: string;
  }

  export interface StartedAt {
    'time.Time'?: string;
  }

  export interface UpdatedAt {
    'time.Time'?: string;
  }
}

export declare namespace Scheduled {
  export {
    type ScheduledListResponse as ScheduledListResponse,
    type ScheduledDetailsResponse as ScheduledDetailsResponse,
  };
}
