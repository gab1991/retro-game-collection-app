import { TThunk } from 'Store/types';

import { Backend } from 'Backend/Backend';
import { TPlatformNames } from 'Configs/appConfig';

import { setBoxArtUrl } from './actions';
import { selectBoxArts } from './selectors';

export const getBoxArt = (platform: TPlatformNames, gameName: string): TThunk => {
  return async (dispatch, getStore) => {
    const store = getStore();
    const boxArts = selectBoxArts(store);

    if (boxArts?.[platform]?.[gameName]) {
      //no need to request a url. It's already in reducer;
      return;
    }

    const { data: boxArtUrl } = await Backend.getBoxArt(platform, gameName);

    if (!boxArtUrl) return;

    dispatch(setBoxArtUrl({ gameName, platform, url: boxArtUrl }));
  };
};
