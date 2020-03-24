const profileReducer = (state = null, action) => {
  switch (action.type) {
    case 'FILL': {
      const serverProfInfo = { ...action.payload };
      const localStorageInfo = localStorage.getItem(
        `${serverProfInfo.username}`
      );
      if (localStorageInfo) {
        // return JSON.parse(localStorageInfo);
        return serverProfInfo;
      } else {
        localStorage.setItem(
          `${serverProfInfo.username}`,
          JSON.stringify(serverProfInfo)
        );
        return serverProfInfo;
      }
    }
    default:
      return state;
  }
};

export default profileReducer;
