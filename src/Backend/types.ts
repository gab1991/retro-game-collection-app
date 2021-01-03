import { EPlatformList } from 'Configs/appConfig';

export interface IGetGamesForPlatParams {
  ordering: string;
  page: number;
  page_size: number;
  platforms: EPlatformList;
  search: string;
}

interface IMethodArgs {
  errCb?: () => void;
}

export type TBackend = {
  [method: string]: (args: IMethodArgs) => any;
};
