import { Api, ISignUpData, TApiResponse } from 'Api';

import { endpoints } from './config';

class AuthApi extends Api {
  constructor() {
    super();
  }

  checkCredentials(): TApiResponse<{ username: string }> {
    return this.executeReq({
      method: 'POST',
      url: endpoints.auth.checkCredentialUrl,
    });
  }

  logout(): TApiResponse {
    return this.executeReq({
      method: 'POST',
      url: endpoints.auth.logoutUrl,
    });
  }

  postSignIn(username: string, password: string): TApiResponse {
    return this.executeReq({
      data: {
        password,
        username,
      },
      method: 'POST',
      url: `${endpoints.auth.signInUrl}`,
    });
  }

  postSignUp(data: ISignUpData): TApiResponse {
    return this.executeReq({
      data,
      method: 'POST',
      url: `${endpoints.auth.signUpUrl}`,
    });
  }
}

export const authApi = new AuthApi();
