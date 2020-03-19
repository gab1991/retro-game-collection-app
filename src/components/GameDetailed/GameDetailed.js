import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import styles from './GameDetailed.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import Slider from '../UI/Slider/Slider';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';

export default function GameDetailed(props) {
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
        <ButtonNeon txtContent={'Owned'} />
        <ButtonNeon txtContent={'Cancel'} />
      </div>
    </div>
  );
}
