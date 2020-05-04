import { removeGame } from './utils';

const profileReducer = (state = null, action) => {
  switch (action.type) {
    case 'FILL':
      return action.payload;
    case 'REMOVE_GAME_FROM_LIST':
      const { list, platform, gameName } = action.payload;
      let updUser = removeGame(state, list, platform, gameName);
      return updUser;
    default:
      return state;
  }
};

export default profileReducer;
