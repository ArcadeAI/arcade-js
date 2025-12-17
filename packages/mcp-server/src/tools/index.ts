// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import list_admin_user_connections from './admin/user-connections/list-admin-user-connections';
import delete_admin_user_connections from './admin/user-connections/delete-admin-user-connections';
import create_admin_auth_providers from './admin/auth-providers/create-admin-auth-providers';
import list_admin_auth_providers from './admin/auth-providers/list-admin-auth-providers';
import delete_admin_auth_providers from './admin/auth-providers/delete-admin-auth-providers';
import get_admin_auth_providers from './admin/auth-providers/get-admin-auth-providers';
import patch_admin_auth_providers from './admin/auth-providers/patch-admin-auth-providers';
import create_admin_secrets from './admin/secrets/create-admin-secrets';
import list_admin_secrets from './admin/secrets/list-admin-secrets';
import delete_admin_secrets from './admin/secrets/delete-admin-secrets';
import authorize_auth from './auth/authorize-auth';
import confirm_user_auth from './auth/confirm-user-auth';
import status_auth from './auth/status-auth';
import check_health from './health/check-health';
import create_chat_completions from './chat/completions/create-chat-completions';
import list_tools from './tools/list-tools';
import authorize_tools from './tools/authorize-tools';
import execute_tools from './tools/execute-tools';
import get_tools from './tools/get-tools';
import list_tools_scheduled from './tools/scheduled/list-tools-scheduled';
import get_tools_scheduled from './tools/scheduled/get-tools-scheduled';
import list_tools_formatted from './tools/formatted/list-tools-formatted';
import get_tools_formatted from './tools/formatted/get-tools-formatted';
import create_workers from './workers/create-workers';
import update_workers from './workers/update-workers';
import list_workers from './workers/list-workers';
import delete_workers from './workers/delete-workers';
import get_workers from './workers/get-workers';
import health_workers from './workers/health-workers';
import tools_workers from './workers/tools-workers';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(list_admin_user_connections);
addEndpoint(delete_admin_user_connections);
addEndpoint(create_admin_auth_providers);
addEndpoint(list_admin_auth_providers);
addEndpoint(delete_admin_auth_providers);
addEndpoint(get_admin_auth_providers);
addEndpoint(patch_admin_auth_providers);
addEndpoint(create_admin_secrets);
addEndpoint(list_admin_secrets);
addEndpoint(delete_admin_secrets);
addEndpoint(authorize_auth);
addEndpoint(confirm_user_auth);
addEndpoint(status_auth);
addEndpoint(check_health);
addEndpoint(create_chat_completions);
addEndpoint(list_tools);
addEndpoint(authorize_tools);
addEndpoint(execute_tools);
addEndpoint(get_tools);
addEndpoint(list_tools_scheduled);
addEndpoint(get_tools_scheduled);
addEndpoint(list_tools_formatted);
addEndpoint(get_tools_formatted);
addEndpoint(create_workers);
addEndpoint(update_workers);
addEndpoint(list_workers);
addEndpoint(delete_workers);
addEndpoint(get_workers);
addEndpoint(health_workers);
addEndpoint(tools_workers);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
