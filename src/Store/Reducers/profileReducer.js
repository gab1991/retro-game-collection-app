import { removeGame } from './utils';

const profileReducer = (state = null, { type, payload }) => {
  switch (type) {
    case 'FILL_PROFILE':
      return payload;
    case 'REMOVE_GAME_FROM_LIST': {
      const { list, platform, gameName } = payload;
      let updUser = removeGame(state, list, platform, gameName);
      return updUser;
    }
    default:
      return state;
  }
};

export default profileReducer;
