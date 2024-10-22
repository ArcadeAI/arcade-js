// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as ChatAPI from './chat';
import * as Shared from '../shared';
import * as CompletionsAPI from './completions';

export class Chat extends APIResource {
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
}

export interface ChatMessage {
  /**
   * The content of the message.
   */
  content: string;

  /**
   * The role of the author of this message. One of system, user, tool, or assistant.
   */
  role: string;

  /**
   * tool Name
   */
  name?: string;

  /**
   * tool_call_id
   */
  tool_call_id?: string;

  /**
   * tool calls if any
   */
  tool_calls?: Array<ChatMessage.ToolCall>;
}

export namespace ChatMessage {
  export interface ToolCall {
    id?: string;

    function?: ToolCall.Function;

    type?: 'function';
  }

  export namespace ToolCall {
    export interface Function {
      arguments?: string;

      name?: string;
    }
  }
}

export interface ChatRequest {
  frequency_penalty?: number;

  /**
   * LogitBias is must be a token id string (specified by their token ID in the
   * tokenizer), not a word string. incorrect: `"logit_bias":{"You": 6}`, correct:
   * `"logit_bias":{"1639": 6}` refs:
   * https://platform.openai.com/docs/api-reference/chat/create#chat/create-logit_bias
   */
  logit_bias?: Record<string, number>;

  /**
   * LogProbs indicates whether to return log probabilities of the output tokens or
   * not. If true, returns the log probabilities of each output token returned in the
   * content of message. This option is currently not available on the
   * gpt-4-vision-preview model.
   */
  logprobs?: boolean;

  max_tokens?: number;

  messages?: Array<ChatMessage>;

  model?: string;

  n?: number;

  /**
   * Disable the default behavior of parallel tool calls by setting it: false.
   */
  parallel_tool_calls?: unknown;

  presence_penalty?: number;

  response_format?: 'json_object' | 'text';

  seed?: number;

  stop?: Array<string>;

  stream?: boolean;

  /**
   * Options for streaming response. Only set this when you set stream: true.
   */
  stream_options?: ChatRequest.StreamOptions;

  temperature?: number;

  /**
   * This can be either a string or an ToolChoice object.
   */
  tool_choice?: unknown;

  tools?: unknown;

  /**
   * TopLogProbs is an integer between 0 and 5 specifying the number of most likely
   * tokens to return at each token position, each with an associated log
   * probability. logprobs must be set to true if this parameter is used.
   */
  top_logprobs?: number;

  top_p?: number;

  user?: string;
}

export namespace ChatRequest {
  /**
   * Options for streaming response. Only set this when you set stream: true.
   */
  export interface StreamOptions {
    /**
     * If set, an additional chunk will be streamed before the data: [DONE] message.
     * The usage field on this chunk shows the token usage statistics for the entire
     * request, and the choices field will always be an empty array. All other chunks
     * will also include a usage field, but with a null value.
     */
    include_usage?: boolean;
  }
}

export interface ChatResponse {
  id?: string;

  choices?: Array<Choice>;

  created?: number;

  model?: string;

  object?: string;

  system_fingerprint?: string;

  usage?: Usage;
}

export interface Choice {
  finish_reason?: string;

  index?: number;

  logprobs?: unknown;

  message?: ChatMessage;

  tool_authorizations?: Array<Shared.AuthorizationResponse>;

  tool_messages?: Array<ChatMessage>;
}

export interface Usage {
  completion_tokens?: number;

  prompt_tokens?: number;

  total_tokens?: number;
}

export namespace Chat {
  export import ChatMessage = ChatAPI.ChatMessage;
  export import ChatRequest = ChatAPI.ChatRequest;
  export import ChatResponse = ChatAPI.ChatResponse;
  export import Choice = ChatAPI.Choice;
  export import Usage = ChatAPI.Usage;
  export import Completions = CompletionsAPI.Completions;
  export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
}
