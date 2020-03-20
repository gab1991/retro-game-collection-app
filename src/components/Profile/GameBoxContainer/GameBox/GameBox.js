import React, { useState, useEffect } from 'react';
import Backend from '../../../../Backend/Backend';
import styles from './GameBox.css';

export default function GameBox(props) {
  const { game, platform } = props;
  const [boxArtUrl, setBoxArtUrl] = useState();

  useEffect(() => {
    console.log(boxArtUrl);
  }, [boxArtUrl]);

  useEffect(() => {
    Backend.getBoxArt(platform, game).then(res => setBoxArtUrl(res));
  }, []);

  return (
    <div className={styles.GameBox}>
      <img src={boxArtUrl} alt={boxArtUrl} className={styles.BoxArtImg} />
    </div>
  );
}
