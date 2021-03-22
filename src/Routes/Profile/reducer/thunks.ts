import { Backend } from 'Backend';

import { IProfileGame } from './types';
import { EEbaySortOrder } from 'Backend/types';
import { TThunk } from 'Store/types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { showErrModal } from 'Store/appStateReducer/actions';
import { setEbayItems } from 'Store/ebayItemsReducer/actions';
import { IRawgGameDetails } from 'Typings/RawgData';

import { fillProfile } from './actions';

export const getProfileInfo = (): TThunk => async (dispatch) => {
  try {
    const { data: profile } = await Backend.getProfileInfo();
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
    dispatch(showErrModal({ message: `Could't get your profile! Try once more` }));
  }
};

export const reorderGames = (
  newSortedGames: Array<IProfileGame>,
  platform: TPlatformNames,
  list: EAvailableLists
): TThunk => async () => {
  await Backend.updateProfile({
    action: 'reorder',
    list,
    platform,
    sortedGames: newSortedGames,
  });
};

export const removeGame = (game: string, list: EAvailableLists, platform: TPlatformNames): TThunk => {
  return async (dispatch) => {
    await Backend.updateProfile(
      {
        action: 'removeGame',
        game,
        list,
        platform,
      },
      () => {
        dispatch(
          showErrModal({
            message: 'Something wrong happened.Try again later',
          })
        );
      }
    );
  };
};

export const addGame = (game: IRawgGameDetails, list: EAvailableLists, platform: TPlatformNames): TThunk => {
  return async (dispatch) => {
    await Backend.updateProfile(
      {
        action: 'addGame',
        game,
        list,
        platform,
      },
      () => {
        dispatch(
          showErrModal({
            message: 'Something wrong happened.Try again later',
          })
        );
      }
    );
  };
};

export const toggleEbayVisibility = (game: string, platform: TPlatformNames, isShowed: boolean): TThunk => {
  return async (dispatch) => {
    console.log(game, platform, isShowed);
    await Backend.toggleEbayVisibility(game, platform, isShowed, () => {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    });
  };
};
