import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Backend from '../../../../Backend/Backend';
import styles from './GameBox.css';

function GameBox(props) {
  const { game, platform, transition } = props;
  const [boxArtUrl, setBoxArtUrl] = useState();
  const [descrVisibility, setDescrVisibility] = useState(false);
  const [draggable, setDraggable] = useState(false);

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

  const toggleDescrVisivility = () => {
    setDescrVisibility(prevState => {
      return !prevState;
    });
    setDraggable(prevState => {
      return !prevState;
    });
  };

  // const mouseDownHandler = () => {
  //   console.log('here');
  //   setDraggable(true);
  // };

  return (
    <div
      className={`${styles.GameBox}
      ${transition ? styles.Transition : null}`}
      onClick={() => openGameDetailsHandler(game.slug)}
      onMouseEnter={() => toggleDescrVisivility()}
      onMouseLeave={() => toggleDescrVisivility()}
      // onMouseDown={() => mouseDownHandler()}
    >
      <img
        src={boxArtUrl}
        alt={boxArtUrl}
        className={styles.BoxArtImg}
        draggable="false"
      />
      <div
        className={`${styles.Desctiprion} 
        ${descrVisibility ? styles.DesctiprionVisible : null}`}>
        {game.name}
      </div>
    </div>
  );
}
export default withRouter(GameBox);
