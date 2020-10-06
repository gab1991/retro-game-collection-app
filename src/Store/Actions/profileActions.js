import Backend from '../../Backend/Backend';
import { showErrModal } from './modalActions';

const fillProfile = (profile) => {
  return {
    type: 'FILL_PROFILE',
    payload: {
      ...profile,
    },
  };
};

const getProfileInfo = () => async (dispatch, getState) => {
  try {
    const { logged } = getState();
    const { token } = logged;

    const { data: profile } = await Backend.getProfileInfo(token);
    return dispatch(fillProfile(profile));
  } catch (err) {
    console.log(err);
  }
};

const reorderGames = (newSortedGames, platform, list) => async (dispatch) => {
  try {
    await Backend.updateProfile({
      sortedGames: newSortedGames,
      platform,
      list,
      action: 'reorder',
    });
  } catch (err) {
    console.log(err);
  }
};

const removeGame = (gameDetails, list, platform) => {
  return async (dispatch) => {
    try {
      await Backend.updateProfile({
        action: 'removeGame',
        list,
        platform,
        game: gameDetails,
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

const addGame = (gameDetails, list, platform) => {
  return async (dispatch) => {
    try {
      await Backend.updateProfile({
        action: 'addGame',
        list,
        platform,
        game: gameDetails,
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

export { getProfileInfo, reorderGames, removeGame, addGame };
