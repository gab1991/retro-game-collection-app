import { IGetGamesForPlatParams } from 'Api/types';
import { TThunk } from 'Store/types';

import { rawgApi } from 'Api/rawgApi';
import { appConfig } from 'Configs/appConfig';
import { showErrModal } from 'Store/appStateReducer/actions';

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
      const {
        data: { payload },
      } = await rawgApi.getGamesForPlatform(req);

      if (!payload) {
        throw new Error('no payload');
      }

      dispatch(writePageData({ ...payload }));

      const { results: games } = payload;

      if (!games?.length) {
        dispatch(setNoGamesFound(true));
      } else {
        dispatch(setNoGamesFound(false));
      }
      dispatch(setGamesToShow(games));
    } catch (err) {
      dispatch(showErrModal({ message: 'Something wrong happens! Try again later' }));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};
