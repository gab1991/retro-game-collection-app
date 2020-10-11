import { CONTENT_SET_BOX_ART_URL } from '../Actions/contentActions';

const initial = {
  boxArts: {},
};

const contentReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case CONTENT_SET_BOX_ART_URL: {
      const { platform, gameName, url } = payload;

      if (!platform || !gameName || !url) return state;

      const newBoxarts = { ...state.boxArts };
      newBoxarts[platform] = { ...newBoxarts[platform] };
      newBoxarts[platform][gameName] = url;

      return { ...state, boxArts: newBoxarts };
    }

    default:
      return state;
  }
};

export default contentReducer;
