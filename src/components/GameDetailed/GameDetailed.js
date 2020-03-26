import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Backend from '../../Backend/Backend';
import styles from './GameDetailed.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import Slider from '../UI/Slider/Slider';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';
import { profile } from '../../actions/actions';

function GameDetailed(props) {
  const slug = props.match.params.gameSlug;
  const platformName = props.match.params.platformName;
  const { userData, profileInfo } = props;
  const [gameDetails, setGameDetails] = useState();
  const [screenshots, setScreenshots] = useState();
  const [boxArtUrl, setBoxArtUrl] = useState();
  const [isOwned, setisOwned] = useState();
  const [isWished, setisWished] = useState();
  const [descriptionParsed, setDescriptionParsed] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) console.log('tut');
    Backend.getProfileInfo(userData.username, userData.token).then(res =>
      dispatch(profile(res))
    );
  }, [userData]);

  useEffect(() => {
    if (profileInfo && gameDetails) isInListChecker();
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

  const isInListChecker = () => {
    const listToCheck = ['owned_list', 'wish_list'];

    for (let i = 0; i < listToCheck.length; i++) {
      const currentList = listToCheck[i];
      const userPlatforms = profileInfo[currentList].platforms;
      let chosenPlatform;
      for (let i = 0; i < userPlatforms.length; i++) {
        if (platformName === userPlatforms[i].name) {
          chosenPlatform = userPlatforms[i];
        }
      }
      if (chosenPlatform) {
        const games = chosenPlatform.games;
        for (let i = 0; i < games.length; i++) {
          if (gameDetails.name === games[i].name) {
            if (currentList === 'owned_list') {
              setisOwned(true);
            } else if (currentList === 'wish_list') {
              setisWished(true);
            }
          }
        }
      }
    }
  };

  const toggleList = (platform, gameDetails, list) => {
    const username = props.userData.username;
    const token = props.userData.token;

    let action;
    if (list === 'owned_list') {
      action = isOwned ? 'removeGame' : 'addGame';
    } else if (list === 'wish_list') {
      action = isWished ? 'removeGame' : 'addGame';
    }

    Backend.updateProfile(username, token, {
      action: action,
      list: list,
      platform: platform,
      game: gameDetails
    }).then(res => {
      if (res.success) {
        if (list === 'owned_list') {
          setisOwned(!isOwned);
        } else if (list === 'wish_list') {
          setisWished(!isWished);
        }
      }
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
        <ButtonNeon
          txtContent={isWished ? 'Remove From Wishlist' : 'Add to Wishlist'}
          onClick={() => toggleList(platformName, gameDetails, 'wish_list')}
        />
        <ButtonNeon
          txtContent={isOwned ? 'Remove from Owned' : 'Owned'}
          onClick={() => toggleList(platformName, gameDetails, 'owned_list')}
        />
        <ButtonNeon txtContent={'Back'} onClick={getBack} />
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
