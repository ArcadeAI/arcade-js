// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as DefinitionAPI from './definition';
import * as Shared from '../shared';

export class Definition extends APIResource {
  /**
   * Returns the arcade tool specification for a specific tool
   */
  get(query: DefinitionGetParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ToolDefinition> {
    return this._client.get('/v1/tools/definition', { query, ...options });
  }
}

export interface DefinitionGetParams {
  /**
   * Director ID
   */
  directorId: string;

  /**
   * Tool ID
   */
  toolId: string;
}

export namespace Definition {
  export import DefinitionGetParams = DefinitionAPI.DefinitionGetParams;
}
