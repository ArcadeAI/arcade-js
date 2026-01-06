// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ToolsAPI from './tools';
import { ToolExecutionsOffsetPage } from './tools';
import { APIPromise } from '../../core/api-promise';
import { OffsetPage, type OffsetPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Scheduled extends APIResource {
  /**
   * Returns a page of scheduled tool executions
   */
  list(
    query: ScheduledListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ToolExecutionsOffsetPage, ToolsAPI.ToolExecution> {
    return this._client.getAPIList('/v1/scheduled_tools', OffsetPage<ToolsAPI.ToolExecution>, {
      query,
      ...options,
    });
  }

  /**
   * Returns the details for a specific scheduled tool execution
   */
  get(id: string, options?: RequestOptions): APIPromise<ScheduledGetResponse> {
    return this._client.get(path`/v1/scheduled_tools/${id}`, options);
  }
}

export interface ScheduledGetResponse {
  id?: string;

  attempts?: Array<ToolsAPI.ToolExecutionAttempt>;

  created_at?: string;

  execution_status?: string;

  execution_type?: string;

  finished_at?: string;

  input?: { [key: string]: unknown };

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

export { type ToolExecutionsOffsetPage };
