import axios_base, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IS_PROD } from 'Configs/server.config';

type TApiClient = AxiosInstance;
type TExecReqConfig = AxiosRequestConfig;
type TReqResult<T = unknown> = AxiosPromise<T>;
type TServerStatus = 'success' | 'fail' | 'error';
type TServerError = unknown;
interface IServerResponse<T = unknown> {
  additionals?: unknown;
  err_message?: string;
  errors?: TServerError[];
  payload?: T;
  status: TServerStatus;
}

export type TApiResponse<T = unknown> = TReqResult<IServerResponse<T>>;

const backendUrl = IS_PROD ? '' : 'http://localhost:8000';

export abstract class Api {
  private readonly client: TApiClient;

  constructor() {
    this.client = axios_base.create({
      baseURL: backendUrl,
      timeout: 4000,
      withCredentials: true,
    });
  }

  async executeReq(config: TExecReqConfig = {}): Promise<AxiosResponse> {
    try {
      return await this.client(config);
    } catch (err) {
      console.error('ERROR', err);
      throw err;
    }
  }
}
