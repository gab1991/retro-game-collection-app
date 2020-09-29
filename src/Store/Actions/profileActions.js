import Backend from '../../Backend/Backend';

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

export { getProfileInfo };
