// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Arcade } from '../client';

export abstract class APIResource {
  protected _client: Arcade;

  constructor(client: Arcade) {
    this._client = client;
  }
}
