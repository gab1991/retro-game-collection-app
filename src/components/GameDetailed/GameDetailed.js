import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Backend from '../../Backend/Backend';
import styles from './GameDetailed.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import Slider from '../UI/Slider/Slider';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';

function GameDetailed(props) {
  const slug = props.match.params.gameSlug;
  const platformName = props.match.params.platformName;
  const [gameDetails, setGameDetails] = useState();
  const [screenshots, setScreenshots] = useState();
  const [boxArtUrl, setBoxArtUrl] = useState();
  const [descriptionParsed, setDescriptionParsed] = useState();

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

  const addGameToOwnedList = (platform, name) => {
    const username = props.userData.username;
    const token = props.userData.token;

    Backend.updateProfile(username, token, {
      action: 'addGame',
      platform: platform,
      name: name
    });
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
          txtContent={'Owned'}
          onClick={() => addGameToOwnedList(platformName, gameDetails.name)}
        />
        <ButtonNeon txtContent={'Cancel'} />
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
