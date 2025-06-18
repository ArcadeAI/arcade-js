// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class AuthProviders extends APIResource {
  /**
   * Create a new auth provider
   */
  create(
    body: AuthProviderCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthProviderResponse> {
    return this._client.post('/v1/admin/auth_providers', { body, ...options });
  }

  /**
   * List a page of auth providers that are available to the caller
   */
  list(options?: Core.RequestOptions): Core.APIPromise<AuthProviderListResponse> {
    return this._client.get('/v1/admin/auth_providers', options);
  }

  /**
   * Delete a specific auth provider
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<AuthProviderResponse> {
    return this._client.delete(`/v1/admin/auth_providers/${id}`, options);
  }

  /**
   * Get the details of a specific auth provider
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<AuthProviderResponse> {
    return this._client.get(`/v1/admin/auth_providers/${id}`, options);
  }

  /**
   * Patch an existing auth provider
   */
  patch(
    pathId: string,
    body: AuthProviderPatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthProviderResponse> {
    return this._client.patch(`/v1/admin/auth_providers/${pathId}`, { body, ...options });
  }
}

export interface AuthProviderCreateRequest {
  id: string;

  description?: string;

  oauth2?: AuthProviderCreateRequest.Oauth2;

  provider_id?: string;

  status?: string;

  type?: string;
}

export namespace AuthProviderCreateRequest {
  export interface Oauth2 {
    client_id: string;

    authorize_request?: Oauth2.AuthorizeRequest;

    client_secret?: string;

    pkce?: Oauth2.Pkce;

    refresh_request?: Oauth2.RefreshRequest;

    scope_delimiter?: ',' | ' ';

    token_introspection_request?: Oauth2.TokenIntrospectionRequest;

    token_request?: Oauth2.TokenRequest;

    user_info_request?: Oauth2.UserInfoRequest;
  }

  export namespace Oauth2 {
    export interface AuthorizeRequest {
      endpoint: string;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface Pkce {
      code_challenge_method?: string;

      enabled?: boolean;
    }

    export interface RefreshRequest {
      endpoint: string;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface TokenIntrospectionRequest {
      endpoint: string;

      triggers: TokenIntrospectionRequest.Triggers;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export namespace TokenIntrospectionRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }

    export interface TokenRequest {
      endpoint: string;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface UserInfoRequest {
      endpoint: string;

      triggers: UserInfoRequest.Triggers;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export namespace UserInfoRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }
  }
}

export interface AuthProviderResponse {
  id?: string;

  binding?: AuthProviderResponse.Binding;

  created_at?: string;

  description?: string;

  oauth2?: AuthProviderResponse.Oauth2;

  provider_id?: string;

  status?: string;

  type?: string;

  updated_at?: string;
}

export namespace AuthProviderResponse {
  export interface Binding {
    id?: string;

    type?: 'static' | 'tenant' | 'project' | 'account';
  }

  export interface Oauth2 {
    authorize_request?: Oauth2.AuthorizeRequest;

    client_id?: string;

    client_secret?: Oauth2.ClientSecret;

    pkce?: Oauth2.Pkce;

    refresh_request?: Oauth2.RefreshRequest;

    scope_delimiter?: string;

    token_introspection_request?: Oauth2.TokenIntrospectionRequest;

    token_request?: Oauth2.TokenRequest;

    user_info_request?: Oauth2.UserInfoRequest;
  }

  export namespace Oauth2 {
    export interface AuthorizeRequest {
      auth_method?: string;

      endpoint?: string;

      expiration_format?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: string;

      response_content_type?: string;

      response_map?: Record<string, string>;
    }

    export interface ClientSecret {
      binding?: 'static' | 'tenant' | 'project' | 'account';

      editable?: boolean;

      exists?: boolean;

      hint?: string;

      value?: string;
    }

    export interface Pkce {
      code_challenge_method?: string;

      enabled?: boolean;
    }

    export interface RefreshRequest {
      auth_method?: string;

      endpoint?: string;

      expiration_format?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: string;

      response_content_type?: string;

      response_map?: Record<string, string>;
    }

    export interface TokenIntrospectionRequest {
      auth_method?: string;

      enabled?: boolean;

      endpoint?: string;

      expiration_format?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: string;

      response_content_type?: string;

      response_map?: Record<string, string>;

      triggers?: TokenIntrospectionRequest.Triggers;
    }

    export namespace TokenIntrospectionRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }

    export interface TokenRequest {
      auth_method?: string;

      endpoint?: string;

      expiration_format?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: string;

      response_content_type?: string;

      response_map?: Record<string, string>;
    }

    export interface UserInfoRequest {
      auth_method?: string;

      endpoint?: string;

      expiration_format?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: string;

      response_content_type?: string;

      response_map?: Record<string, string>;

      triggers?: UserInfoRequest.Triggers;
    }

    export namespace UserInfoRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }
  }
}

export interface AuthProviderUpdateRequest {
  id?: string;

  description?: string;

  oauth2?: AuthProviderUpdateRequest.Oauth2;

  provider_id?: string;

  status?: string;

  type?: string;
}

export namespace AuthProviderUpdateRequest {
  export interface Oauth2 {
    authorize_request?: Oauth2.AuthorizeRequest;

    client_id?: string;

    client_secret?: string;

    pkce?: Oauth2.Pkce;

    refresh_request?: Oauth2.RefreshRequest;

    scope_delimiter?: ',' | ' ';

    token_request?: Oauth2.TokenRequest;

    user_info_request?: Oauth2.UserInfoRequest;
  }

  export namespace Oauth2 {
    export interface AuthorizeRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface Pkce {
      code_challenge_method?: string;

      enabled?: boolean;
    }

    export interface RefreshRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface TokenRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface UserInfoRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;

      triggers?: UserInfoRequest.Triggers;
    }

    export namespace UserInfoRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }
  }
}

export interface AuthProviderListResponse {
  items?: Array<AuthProviderResponse>;

  limit?: number;

  offset?: number;

  page_count?: number;

  total_count?: number;
}

export interface AuthProviderCreateParams {
  id: string;

  description?: string;

  oauth2?: AuthProviderCreateParams.Oauth2;

  provider_id?: string;

  status?: string;

  type?: string;
}

export namespace AuthProviderCreateParams {
  export interface Oauth2 {
    client_id: string;

    authorize_request?: Oauth2.AuthorizeRequest;

    client_secret?: string;

    pkce?: Oauth2.Pkce;

    refresh_request?: Oauth2.RefreshRequest;

    scope_delimiter?: ',' | ' ';

    token_introspection_request?: Oauth2.TokenIntrospectionRequest;

    token_request?: Oauth2.TokenRequest;

    user_info_request?: Oauth2.UserInfoRequest;
  }

  export namespace Oauth2 {
    export interface AuthorizeRequest {
      endpoint: string;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface Pkce {
      code_challenge_method?: string;

      enabled?: boolean;
    }

    export interface RefreshRequest {
      endpoint: string;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface TokenIntrospectionRequest {
      endpoint: string;

      triggers: TokenIntrospectionRequest.Triggers;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export namespace TokenIntrospectionRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }

    export interface TokenRequest {
      endpoint: string;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface UserInfoRequest {
      endpoint: string;

      triggers: UserInfoRequest.Triggers;

      auth_method?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export namespace UserInfoRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }
  }
}

export interface AuthProviderPatchParams {
  body_id?: string;

  description?: string;

  oauth2?: AuthProviderPatchParams.Oauth2;

  provider_id?: string;

  status?: string;

  type?: string;
}

export namespace AuthProviderPatchParams {
  export interface Oauth2 {
    authorize_request?: Oauth2.AuthorizeRequest;

    client_id?: string;

    client_secret?: string;

    pkce?: Oauth2.Pkce;

    refresh_request?: Oauth2.RefreshRequest;

    scope_delimiter?: ',' | ' ';

    token_request?: Oauth2.TokenRequest;

    user_info_request?: Oauth2.UserInfoRequest;
  }

  export namespace Oauth2 {
    export interface AuthorizeRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface Pkce {
      code_challenge_method?: string;

      enabled?: boolean;
    }

    export interface RefreshRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface TokenRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;
    }

    export interface UserInfoRequest {
      auth_method?: string;

      endpoint?: string;

      method?: string;

      params?: Record<string, string>;

      request_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_content_type?: 'application/x-www-form-urlencoded' | 'application/json';

      response_map?: Record<string, string>;

      triggers?: UserInfoRequest.Triggers;
    }

    export namespace UserInfoRequest {
      export interface Triggers {
        on_token_grant?: boolean;

        on_token_refresh?: boolean;
      }
    }
  }
}

export declare namespace AuthProviders {
  export {
    type AuthProviderCreateRequest as AuthProviderCreateRequest,
    type AuthProviderResponse as AuthProviderResponse,
    type AuthProviderUpdateRequest as AuthProviderUpdateRequest,
    type AuthProviderListResponse as AuthProviderListResponse,
    type AuthProviderCreateParams as AuthProviderCreateParams,
    type AuthProviderPatchParams as AuthProviderPatchParams,
  };
}
