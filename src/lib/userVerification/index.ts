import { APIResource } from '../../resource';

export type ConfirmUserOptions = {
  host?: string;
};

export interface ConfirmUserResponse {
  auth_id: string;
  next_uri: string;
}

const defaultCoordinator: string = 'https://cloud.arcade.dev';
const verifyPath: string = '/api/v1/oauth/confirm_user';

export class UserVerification extends APIResource {
  confirm(flow_id: string, user_id: string, options?: ConfirmUserOptions): Promise<ConfirmUserResponse> {
    let host = options?.host || defaultCoordinator;
    if (host.endsWith('/')) {
      host = host.substring(0, host.length - 1);
    }
    const url = host + verifyPath;

    // Build up the request and send it
    return this._client.post(url, {
      body: {
        flow_id,
        user_id,
      },
      headers: {
        Authorization: 'Bearer ' + this._client.apiKey,
      },
    });
  }
}
