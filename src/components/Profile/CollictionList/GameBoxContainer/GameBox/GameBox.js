import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBoxArt } from '../../../../../Store/Actions/contentActions';
import styles from './GameBox.module.scss';

function GameBox(props) {
  const dispatch = useDispatch();
  const {
    className,
    game: { slug, name: gameName },
    platform,
    showDesc = true,
    scaling = true,
  } = props;
  const boxArtUrl = useSelector(
    (state) => state.content.boxArts?.[platform]?.[gameName]
  );
  const [descrVisibility, setDescrVisibility] = useState(false);

  useEffect(() => {
    dispatch(getBoxArt(platform, gameName));
  }, [platform, gameName, dispatch]);

  const toggleDescrVisivility = (bool) => {
    setDescrVisibility(bool);
  };

  return (
    <Link
      to={`/${platform}/${slug}`}
      className={`${styles.GameBox} ${
        scaling ? styles.Scaling : ''
      } ${className}`}
      onMouseEnter={() => toggleDescrVisivility(true)}
      onMouseLeave={() => toggleDescrVisivility(false)}
      draggable="false">
      <img
        src={boxArtUrl}
        alt={boxArtUrl}
        className={styles.BoxArtImg}
        draggable="false"
      />
      {showDesc && (
        <div
          className={`${styles.Desctiprion} 
            ${descrVisibility ? styles.DesctiprionVisible : null}`}>
          {gameName}
        </div>
      )}
    </Link>
  );
}
export default GameBox;
