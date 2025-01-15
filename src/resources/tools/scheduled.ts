// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ToolsAPI from './tools';
import { ToolExecutionsOffsetPage } from './tools';
import { type OffsetPageParams } from '../../pagination';

export class Scheduled extends APIResource {
  /**
   * Returns a page of scheduled tool executions
   */
  list(
    query?: ScheduledListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolExecutionsOffsetPage, ToolsAPI.ToolExecution>;
  list(options?: Core.RequestOptions): Core.PagePromise<ToolExecutionsOffsetPage, ToolsAPI.ToolExecution>;
  list(
    query: ScheduledListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ToolExecutionsOffsetPage, ToolsAPI.ToolExecution> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/scheduled_tools', ToolExecutionsOffsetPage, { query, ...options });
  }

  /**
   * Returns the details for a specific scheduled tool execution
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<ScheduledGetResponse> {
    return this._client.get(`/v1/scheduled_tools/${id}`, options);
  }
}

export interface ScheduledGetResponse {
  id?: string;

  attempts?: Array<ToolsAPI.ToolExecutionAttempt>;

  created_at?: string;

  execution_status?: string;

  execution_type?: string;

  finished_at?: string;

  input?: Record<string, unknown>;

  run_at?: string;

  started_at?: string;

  tool_name?: string;

  toolkit_name?: string;

  toolkit_version?: string;

  updated_at?: string;

  user_id?: string;
}

export interface ScheduledListParams extends OffsetPageParams {}

export declare namespace Scheduled {
  export {
    type ScheduledGetResponse as ScheduledGetResponse,
    type ScheduledListParams as ScheduledListParams,
  };
}

export { ToolExecutionsOffsetPage };
