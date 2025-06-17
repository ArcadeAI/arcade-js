// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AuthProvidersAPI from './auth-providers';
import {
  AuthProviderCreateParams,
  AuthProviderCreateRequest,
  AuthProviderListResponse,
  AuthProviderPatchParams,
  AuthProviderResponse,
  AuthProviderUpdateRequest,
  AuthProviders,
} from './auth-providers';
import * as SecretsAPI from './secrets';
import { SecretListResponse, SecretResponse, Secrets } from './secrets';
import * as UserConnectionsAPI from './user-connections';
import {
  UserConnectionListParams,
  UserConnectionResponse,
  UserConnectionResponsesOffsetPage,
  UserConnections,
} from './user-connections';

export class Admin extends APIResource {
  userConnections: UserConnectionsAPI.UserConnections = new UserConnectionsAPI.UserConnections(this._client);
  authProviders: AuthProvidersAPI.AuthProviders = new AuthProvidersAPI.AuthProviders(this._client);
  secrets: SecretsAPI.Secrets = new SecretsAPI.Secrets(this._client);
}

Admin.UserConnections = UserConnections;
Admin.UserConnectionResponsesOffsetPage = UserConnectionResponsesOffsetPage;
Admin.AuthProviders = AuthProviders;
Admin.Secrets = Secrets;

export declare namespace Admin {
  export {
    UserConnections as UserConnections,
    type UserConnectionResponse as UserConnectionResponse,
    UserConnectionResponsesOffsetPage as UserConnectionResponsesOffsetPage,
    type UserConnectionListParams as UserConnectionListParams,
  };

  export {
    AuthProviders as AuthProviders,
    type AuthProviderCreateRequest as AuthProviderCreateRequest,
    type AuthProviderResponse as AuthProviderResponse,
    type AuthProviderUpdateRequest as AuthProviderUpdateRequest,
    type AuthProviderListResponse as AuthProviderListResponse,
    type AuthProviderCreateParams as AuthProviderCreateParams,
    type AuthProviderPatchParams as AuthProviderPatchParams,
  };

  export {
    Secrets as Secrets,
    type SecretResponse as SecretResponse,
    type SecretListResponse as SecretListResponse,
  };
}
