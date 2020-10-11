import Backend from '../../Backend/Backend';

const CONTENT_SET_BOX_ART_URL = 'CONTENT_SET_BOX_ART_URL';

const setBoxArtUrl = (url, platform, gameName) => {
  return {
    type: CONTENT_SET_BOX_ART_URL,
    payload: {
      url,
      platform,
      gameName,
    },
  };
};

const getBoxArt = (platformName, gameName) => {
  return async (dispatch, getState) => {
    const {
      content: { boxArts },
    } = getState();

    if (boxArts?.[platformName]?.[gameName]) {
      //no need to request a url. It's already in reducer;
      return;
    }

    const { data: boxArtUrl = { boxArtUrl: null } } = await Backend.getBoxArt(
      platformName,
      gameName
    );

    if (!boxArtUrl) return;

    dispatch(setBoxArtUrl(boxArtUrl, platformName, gameName));
  };
};

export { CONTENT_SET_BOX_ART_URL, getBoxArt };
