import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import styles from './GameDetailed.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import Slider from '../UI/Slider/Slider';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';

export default function GameDetailed(props) {
  const {
    name,
    slug,
    description,
    background_image: background
  } = props.gameInfo;
  const descriptionParsed = ReactHtmlParser(description);
  const [screenshots, setScreenshots] = useState();
  const [boxArtUrl, setBoxArtUrl] = useState();

  useEffect(() => {
    Backend.getScreenshots(slug).then(res => {
      const screenshotsUrls = [];
      res.results.forEach(obj => screenshotsUrls.push(obj.image));
      setScreenshots(screenshotsUrls);

      Backend.getBoxArt('Genesis', slug).then((res) => setBoxArtUrl(res));
    });
    return () => {
      setScreenshots();
    };
  }, []);

  return (
    <div className={styles.GameDetailed}>
      <div className={styles.Info}>
        <GameInfoBox gameInfo={props.gameInfo} boxArt={boxArtUrl} />
      </div>
      <div className={styles.Desc}>{descriptionParsed}</div>
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
