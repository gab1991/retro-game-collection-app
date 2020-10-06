import Backend from '../../Backend/Backend';

const setBoxArtUrl = (url, platform, gameName) => {
  return {
    type: 'CONTENT_SET_BOX_ART_URL',
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
      console.log('no need to upload');
      //no need to request a url. It's already in reducer;
      return;
    }

    try {
      const { data: boxArtUrl } = await Backend.getBoxArt(
        platformName,
        gameName
      );
      dispatch(setBoxArtUrl(boxArtUrl, platformName, gameName));
    } catch (err) {
      // need to add error handling;
    }
  };
};

export { getBoxArt };
