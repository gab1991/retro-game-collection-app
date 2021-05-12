import axios_base, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { IApiMethods, TBackend } from './types';

import { TPlatformNames } from 'Configs/appConfig';

import { endpoints } from './api_config';

type TApiClient = AxiosInstance;
type TExecReqConfig = AxiosRequestConfig;
type TReqResult<T = any> = AxiosPromise<T>;

class Api {
  private readonly client: TApiClient;

  constructor(backendUrl: string) {
    this.client = axios_base.create({
      baseURL: backendUrl,
      timeout: 4000,
    });
  }

  async executeReq(config: TExecReqConfig = {}) {
    try {
      const res = await this.client(config);
      console.log('in api', res);
      //handling ebayApi specific errors
      const {
        data: { Ack: ebayApiError },
      } = res;

      if (ebayApiError === 'Failure') {
        throw res;
      }

      return res;
    } catch (err) {
      console.error('ERROR', err);
      throw err;
    }
  }

  checkCredentials(token: string, username: string): TReqResult<{ success: string }> {
    return this.executeReq({
      data: {
        username,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: endpoints.checkCredentialUrl,
    });
  }

  getBoxArt(platform: TPlatformNames, slug: string): TReqResult<string> {
    return this.executeReq({
      method: 'GET',
      url: `${endpoints.boxArtworkUrl}/${platform}/${encodeURIComponent(slug)}`,
    });
  }
}

const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';
export const api = new Api(backendUrl);
