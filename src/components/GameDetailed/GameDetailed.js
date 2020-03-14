import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import styles from './GameDetailed.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import Slider from '../UI/Slider/Slider';

export default function GameDetailed(props) {
  const {
    name,
    slug,
    description,
    background_image: background
  } = props.gameInfo;
  const descriptionParsed = ReactHtmlParser(description);
  const [screenshots, setScreenshots] = useState();

  useEffect(() => {
    Backend.getScreenshots(slug).then(res => {
      const screenshotsUrls = [];
      res.results.forEach(obj => screenshotsUrls.push(obj.image));
      setScreenshots(screenshotsUrls);
    });
  }, []);

  return (
    <div className={styles.GameDetailed}>
      <div className={styles.Info}>
        <GameInfoBox gameInfo={props.gameInfo} />
      </div>
      <div className={styles.Desc}>{descriptionParsed}</div>
      <div className={styles.Screenshots}>
        {screenshots && <Slider images={screenshots} />}
      </div>
      <div className={styles.Contorls}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
}
