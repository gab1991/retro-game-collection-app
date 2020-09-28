function getPlatform(platformName, platformList) {
  let foundPlatfrom;
  let updInd;
  for (let i = 0; i < platformList.length; i++) {
    if (platformName === platformList[i].name) {
      foundPlatfrom = platformList[i];
      updInd = i;
      break;
    }
  }

  return { foundPlatfrom, updInd };
}

function isGameInList(gameName, gameList) {
  for (let i = 0; i < gameList.length; i++) {
    if (gameName === gameList[i].name) {
      return { result: true, index: i };
    }
  }
  return { result: false, index: null };
}

function removeGame(profile, list, platform, gameName) {
  const userPlatforms = profile[list].platforms;
  const { foundPlatfrom, updInd } = getPlatform(platform, userPlatforms);

  // if this platform is not in the userlist
  if (!foundPlatfrom) {
    throw Error(`Couldn't find this platfrom`);
  }

  let gamesForPlatform = foundPlatfrom.games;

  // check for existing games
  const gameInd = isGameInList(gameName, gamesForPlatform).index;

  if (gameInd !== null) gamesForPlatform.splice(gameInd, 1);

  // Check wheter remove directory or not
  if (gamesForPlatform.length === 0) userPlatforms.splice(updInd, 1);

  const updUser = { ...profile };
  updUser[list].platforms = userPlatforms;

  return updUser;
}

export { removeGame };
