import Backend from '../../Backend/Backend';
import { showErrModal } from './appStateActions';
import { setEbayItems } from './ebayItemsActions';

const FILL_PROFILE = 'FILL_PROFILE';

const fillProfile = (profile) => {
  return {
    type: FILL_PROFILE,
    payload: {
      ...profile,
    },
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
    sortedGames: newSortedGames,
    platform,
    list,
    action: 'reorder',
  });
};

const removeGame = (gameDetails, list, platform) => {
  return async (dispatch) => {
    await Backend.updateProfile(
      {
        action: 'removeGame',
        list,
        platform,
        game: gameDetails,
      },
      () => {
        dispatch(
          showErrModal({
            message: 'Something wrong happened.Try again later',
          }),
        );
      },
    );
  };
};

const addGame = (gameDetails, list, platform) => {
  return async (dispatch) => {
    await Backend.updateProfile(
      {
        action: 'addGame',
        list,
        platform,
        game: gameDetails,
      },
      () => {
        dispatch(
          showErrModal({
            message: 'Something wrong happened.Try again later',
          }),
        );
      },
    );
  };
};

const toggleEbayVisibility = (gameName, platform, isShowed) => {
  return async (dispatch) => {
    await Backend.toggleEbayVisibility(gameName, platform, isShowed, () => {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        }),
      );
    });
  };
};

export { getProfileInfo, reorderGames, removeGame, addGame, toggleEbayVisibility };
export { FILL_PROFILE };
