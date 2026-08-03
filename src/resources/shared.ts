// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AuthorizationContext {
  token?: string;

  user_info?: { [key: string]: unknown };
}

export interface AuthorizationResponse {
  id?: string;

  context?: AuthorizationContext;

  provider_id?: string;

  scopes?: Array<string>;

  status?: 'not_started' | 'pending' | 'completed' | 'failed';

  url?: string;

  user_id?: string;
}

export interface Error {
  /**
   * FieldErrors carries machine-actionable, per-field detail for a request-body
   * validation failure so a client can map each failure to a specific input field.
   * It is empty (and omitted) for every other error, keeping Message the single
   * source of truth for those.
   */
  field_errors?: Array<Error.FieldError>;

  message?: string;

  name?: string;
}

export namespace Error {
  export interface FieldError {
    /**
     * Field is the json field path of the offending value, rooted at the request body
     * with inline-embed levels flattened (e.g. "oauth2.token_request.endpoint").
     */
    field?: string;

    /**
     * Message is the human-readable, per-field explanation.
     */
    message?: string;

    /**
     * Param is the rule's parameter when it has one (e.g. "500" for max), omitted
     * otherwise.
     */
    param?: string;

    /**
     * Rule is the validation rule that failed (e.g. "required", "max", "url").
     */
    rule?: string;
  }
}
