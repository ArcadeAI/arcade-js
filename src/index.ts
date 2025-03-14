// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import { type OffsetPageParams, OffsetPageResponse } from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Auth, AuthAuthorizeParams, AuthRequest, AuthStatusParams } from './resources/auth';
import { Health, HealthSchema } from './resources/health';
import {
  CreateWorkerRequest,
  UpdateWorkerRequest,
  WorkerCreateParams,
  WorkerHealthResponse,
  WorkerListParams,
  WorkerResponse,
  WorkerResponsesOffsetPage,
  WorkerToolsParams,
  WorkerUpdateParams,
  Workers,
} from './resources/workers';
import { Chat, ChatMessage, ChatRequest, ChatResponse, Choice, Usage } from './resources/chat/chat';
import {
  AuthorizeToolRequest,
  ExecuteToolRequest,
  ExecuteToolResponse,
  ToolAuthorizeParams,
  ToolDefinition,
  ToolDefinitionsOffsetPage,
  ToolExecuteParams,
  ToolExecution,
  ToolExecutionAttempt,
  ToolListParams,
  Tools,
  ValueSchema,
} from './resources/tools/tools';

export interface ClientOptions {
  /**
   * API key used for authorization in header
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['ARCADE_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Arcade API.
 */
export class Arcade extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Arcade API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['ARCADE_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['ARCADE_BASE_URL'] ?? https://api.arcade.dev] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('ARCADE_BASE_URL'),
    apiKey = Core.readEnv('ARCADE_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.ArcadeError(
        "The ARCADE_API_KEY environment variable is missing or empty; either provide it, or instantiate the Arcade client with an apiKey option, like new Arcade({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.arcade.dev`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;
    this.idempotencyHeader = 'Idempotency-Key';

    this.apiKey = apiKey;
  }

  auth: API.Auth = new API.Auth(this);
  health: API.Health = new API.Health(this);
  chat: API.Chat = new API.Chat(this);
  tools: API.Tools = new API.Tools(this);
  workers: API.Workers = new API.Workers(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: this.apiKey };
  }

  static Arcade = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static ArcadeError = Errors.ArcadeError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Arcade.Auth = Auth;
Arcade.Health = Health;
Arcade.Chat = Chat;
Arcade.Tools = Tools;
Arcade.ToolDefinitionsOffsetPage = ToolDefinitionsOffsetPage;
Arcade.Workers = Workers;
Arcade.WorkerResponsesOffsetPage = WorkerResponsesOffsetPage;
export declare namespace Arcade {
  export type RequestOptions = Core.RequestOptions;

  export import OffsetPage = Pagination.OffsetPage;
  export { type OffsetPageParams as OffsetPageParams, type OffsetPageResponse as OffsetPageResponse };

  export {
    Auth as Auth,
    type AuthRequest as AuthRequest,
    type AuthAuthorizeParams as AuthAuthorizeParams,
    type AuthStatusParams as AuthStatusParams,
  };

  export { Health as Health, type HealthSchema as HealthSchema };

  export {
    Chat as Chat,
    type ChatMessage as ChatMessage,
    type ChatRequest as ChatRequest,
    type ChatResponse as ChatResponse,
    type Choice as Choice,
    type Usage as Usage,
  };

  export {
    Tools as Tools,
    type AuthorizeToolRequest as AuthorizeToolRequest,
    type ExecuteToolRequest as ExecuteToolRequest,
    type ExecuteToolResponse as ExecuteToolResponse,
    type ToolDefinition as ToolDefinition,
    type ToolExecution as ToolExecution,
    type ToolExecutionAttempt as ToolExecutionAttempt,
    type ValueSchema as ValueSchema,
    ToolDefinitionsOffsetPage as ToolDefinitionsOffsetPage,
    type ToolListParams as ToolListParams,
    type ToolAuthorizeParams as ToolAuthorizeParams,
    type ToolExecuteParams as ToolExecuteParams,
  };

  export {
    Workers as Workers,
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

  export type AuthorizationContext = API.AuthorizationContext;
  export type AuthorizationResponse = API.AuthorizationResponse;
  export type Error = API.Error;
}

export { toFile, fileFromPath } from './uploads';
export {
  ArcadeError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Arcade;
