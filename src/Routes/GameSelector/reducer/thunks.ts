import { Backend } from 'Backend';

import { IGetGamesForPlatParams } from 'Backend/types';
import { TThunk } from 'Store/types';

import { appConfig } from 'Configs/appConfig';

import { setGamesToShow, setIsLoading, setNoGamesFound, writePageData } from './actions';
import { selectQuery } from './selectors';

export const getGamesForPlatform = (platformName: string): TThunk => {
  return async (dispatch, getStore) => {
    const state = getStore();
    const { page, direction, ordername, search } = selectQuery(state);
    const platformID = appConfig.platformIdList[platformName];

    const req: IGetGamesForPlatParams = {
      ordering: `${direction === '↓' ? '-' : ''}${ordername}`,
      page: page || 1,
      page_size: appConfig.GameSelector.gamesPerRequest,
      platforms: platformID,
      search: `${search || ' '}`,
    };

    dispatch(setIsLoading(true));
    try {
      const { data } = await Backend.getGamesForPlatform(req);

      dispatch(writePageData({ ...data }));

      const { results: games } = data;

      if (!games?.length) {
        dispatch(setNoGamesFound(true));
      } else {
        dispatch(setNoGamesFound(false));
      }
      dispatch(setGamesToShow(games));
    } catch (err) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};
