import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Backend from '../../../../Backend/Backend';
import styles from './GameBox.css';

function GameBox(props) {
  const { game, platform } = props;
  const [boxArtUrl, setBoxArtUrl] = useState();

  useEffect(() => {
    Backend.getBoxArt(platform, game.name).then(res => setBoxArtUrl(res));
  }, []);

  const openGameDetailsHandler = slug => {
    props.history.push({
      pathname: `/${platform}/${slug}`,
      state: {
        from: props.location.pathname
      }
    });
  };

  return (
    <div
      className={styles.GameBox}
      onClick={() => openGameDetailsHandler(game.slug)}>
      <img src={boxArtUrl} alt={boxArtUrl} className={styles.BoxArtImg} />
    </div>
  );
}
export default withRouter(GameBox);
