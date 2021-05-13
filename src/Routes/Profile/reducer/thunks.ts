import { batch } from 'react-redux';
import { api } from 'Api';

import { IReorderGamesActionArgs } from './types';
import { EEbaySortOrder } from 'Api/types';
import { TThunk } from 'Store/types';

import { appConfig, EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { showErrModal } from 'Store/appStateReducer/actions';
import { setEbayItems } from 'Store/ebayItemsReducer/actions';
import { IRawgGameDetails } from 'Typings/RawgData';

import { fillProfile, reorderGames } from './actions';
import { selectGamesFromList } from './selectors';

export const getProfileInfo = (): TThunk => async (dispatch) => {
  try {
    const { data: profile } = await api.getProfileInfo();
    dispatch(fillProfile(profile));

    //fill possible ebayCards
    const {
      wish_list: { platforms: platfromsInWishList = [] },
    } = profile;

    for (const platform of platfromsInWishList) {
      const { name: platformName, games } = platform || {};

      for (const game of games) {
        const { name: gameName, watchedEbayOffers } = game || {};
        const ebayItems = watchedEbayOffers.map((ebayItem) => ({
          itemId: [ebayItem.id],
        }));
        dispatch(setEbayItems(ebayItems, platformName, gameName, EEbaySortOrder.Watched));
      }
    }
  } catch (err) {
    dispatch(showErrModal({ message: `Couldn't get your profile! Try once more` }));
  }
};

export const reorderGamesThunk = (args: IReorderGamesActionArgs): TThunk => async (dispatch, getStore) => {
  const store = getStore();
  const prevSortedGames = selectGamesFromList(store, args.list, args.platform);

  dispatch(reorderGames.request(args));

  try {
    await api.updateProfile({
      action: 'reorder',
      ...args,
    });
  } catch (err) {
    batch(() => {
      prevSortedGames && dispatch(reorderGames.failure({ ...args, newSortedGames: prevSortedGames }));
      dispatch(showErrModal({ message: `Couldn't rearrange games! Try later` }));
    });
  }
};

export const removeGame = (game: string, list: EAvailableLists, platform: TPlatformNames): TThunk => {
  return async (dispatch) => {
    try {
      await api.updateProfile({
        action: 'removeGame',
        game,
        list,
        platform,
      });
    } catch (err) {
      dispatch(
        showErrModal({
          message: appConfig.defaultApiErr,
        })
      );
    }
  };
};

export const addGame = (game: IRawgGameDetails, list: EAvailableLists, platform: TPlatformNames): TThunk => {
  return async (dispatch) => {
    try {
      await api.updateProfile({
        action: 'addGame',
        game,
        list,
        platform,
      });
    } catch (err) {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

export const toggleEbayVisibility = (game: string, platform: TPlatformNames, isShowed: boolean): TThunk => {
  return async (dispatch) => {
    try {
      await api.toggleEbayVisibility(game, platform, isShowed);
    } catch (error) {
      dispatch(
        showErrModal({
          message: appConfig.defaultApiErr,
        })
      );
    }
  };
};
