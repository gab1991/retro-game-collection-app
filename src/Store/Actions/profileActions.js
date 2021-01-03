import { Backend } from 'Backend';

import { showErrModal } from '../appStateReducer/actions';

import { setEbayItems } from './ebayItemsActions';

const FILL_PROFILE = 'FILL_PROFILE';

const fillProfile = (profile) => {
  return {
    payload: {
      ...profile,
    },
    type: FILL_PROFILE,
  };
};

const getProfileInfo = () => async (dispatch, getState) => {
  const { data: profile = { profile: null } } = await Backend.getProfileInfo(() => {
    dispatch(showErrModal({ message: `Could't get your profile! Try once more` }));
  });

  if (!profile) return;

  dispatch(fillProfile(profile));

  //fill possible ebayCards
  const { wish_list: { platforms: platfromsInWishList } = { platforms: [] } } = profile;

  for (const platform of platfromsInWishList) {
    const { name: platformName, games } = platform || {};

    for (const game of games) {
      const { name: gameName, watchedEbayOffers } = game || {};
      const ebayItems = watchedEbayOffers.map((ebayItem) => ({
        itemId: [ebayItem.id],
      }));
      dispatch(setEbayItems(ebayItems, platformName, gameName, 'Watched'));
    }
  }
};

const reorderGames = (newSortedGames, platform, list) => async (dispatch) => {
  await Backend.updateProfile({
    action: 'reorder',
    list,
    platform,
    sortedGames: newSortedGames,
  });
};

const removeGame = (gameDetails, list, platform) => {
  return async (dispatch) => {
    await Backend.updateProfile(
      {
        action: 'removeGame',
        game: gameDetails,
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

const addGame = (gameDetails, list, platform) => {
  return async (dispatch) => {
    await Backend.updateProfile(
      {
        action: 'addGame',
        game: gameDetails,
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

const toggleEbayVisibility = (gameName, platform, isShowed) => {
  return async (dispatch) => {
    await Backend.toggleEbayVisibility(gameName, platform, isShowed, () => {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    });
  };
};

export { addGame, getProfileInfo, removeGame, reorderGames, toggleEbayVisibility };
export { FILL_PROFILE };
