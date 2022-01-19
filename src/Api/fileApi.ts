import { Api } from 'Api';

import { backendUrl } from './api';

class FileApi extends Api {
  constructor() {
    super();
  }

  formPath(path: string): string {
    return `${backendUrl}/${path}`;
  }
}

export const fileApi = new FileApi();
