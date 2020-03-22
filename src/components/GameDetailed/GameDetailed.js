import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { profile } from '../../actions/actions';
import Backend from '../../Backend/Backend';
import styles from './GameDetailed.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import Slider from '../UI/Slider/Slider';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';

function GameDetailed(props) {
  const slug = props.match.params.gameSlug;
  const platformName = props.match.params.platformName;
  const { userData, profileInfo } = props;
  const [gameDetails, setGameDetails] = useState();
  const [screenshots, setScreenshots] = useState();
  const [boxArtUrl, setBoxArtUrl] = useState();
  const [isOwned, setisOwned] = useState();
  const [descriptionParsed, setDescriptionParsed] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    Backend.getProfileInfo(userData.username, userData.token).then(res =>
      dispatch(profile(res))
    );
  }, [userData]);

  useEffect(() => {
    if (profileInfo && gameDetails) isOwnedChecker();
  }, [profileInfo, gameDetails]);

  useEffect(() => {
    Backend.getGameDetails(slug).then(res => {
      setGameDetails(res);
      const description = res.description;
      setDescriptionParsed(ReactHtmlParser(description));
    });

    Backend.getScreenshots(slug).then(res => {
      const screenshotsUrls = [];
      res.results.forEach(obj => screenshotsUrls.push(obj.image));
      setScreenshots(screenshotsUrls);
    });
  }, [slug]);

  useEffect(() => {
    if (gameDetails) {
      Backend.getBoxArt(platformName, gameDetails.name).then(res =>
        setBoxArtUrl(res)
      );
    }
  }, [gameDetails, platformName]);

  const isOwnedChecker = () => {
    const userPlatforms = profileInfo.owned_list.platforms;
    let chosenPlatform;
    for (let i = 0; i < userPlatforms.length; i++) {
      if (platformName === userPlatforms[i].name) {
        chosenPlatform = userPlatforms[i];
      }
    }

    if (chosenPlatform) {
      const games = chosenPlatform.games;
      for (let i = 0; i < games.length; i++) {
        if (gameDetails.name === games[i].name) setisOwned(true);
      }
    }
  };

  const toggleOwnedList = (platform, gameDetails) => {
    const username = props.userData.username;
    const token = props.userData.token;
    const action = isOwned ? 'removeGame' : 'addGame';

    Backend.updateProfile(username, token, {
      action: action,
      platform: platform,
      game: gameDetails
    }).then(res => {
      if (res.success) setisOwned(!isOwned);
    });
  };

  const getBack = () => {
    props.history.push(props.history.location.state.from);
  };

  return (
    <div className={styles.GameDetailed}>
      <div className={styles.Info}>
        {gameDetails && boxArtUrl && (
          <GameInfoBox gameInfo={gameDetails} boxArt={boxArtUrl} />
        )}
      </div>
      <div className={styles.Desc}>
        {descriptionParsed ? descriptionParsed : null}
      </div>
      <div className={styles.Screenshots}>
        {screenshots && <Slider images={screenshots} />}
      </div>
      <div className={styles.Contorls}>
        <ButtonNeon txtContent={'Add to Whishlist'} />
        <ButtonNeon
          txtContent={isOwned ? 'Remove from Owned' : 'Owned'}
          onClick={() => toggleOwnedList(platformName, gameDetails)}
        />
        <ButtonNeon txtContent={'Cancel'} onClick={getBack} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile
  };
}

export default connect(mapStateToProps)(GameDetailed);
