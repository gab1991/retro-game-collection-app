import React from 'react';
import styles from './GameDetailed.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';

export default function GameDetailed(props) {
  const { name, description, background_image: background } = props.gameInfo;
  const descriptionParsed = ReactHtmlParser(description);

  return (
    <div className={styles.GameDetailed}>
      <div className={styles.Info}>
        <GameInfoBox gameInfo={props.gameInfo} />
      </div>
      <div className={styles.Desc}>{descriptionParsed}</div>
      <div className={styles.Screenshots}></div>
      <div className={styles.Contorls}></div>
    </div>
  );
}
