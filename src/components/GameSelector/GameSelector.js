import React, { useEffect } from 'react';
import Backend from '../../Backend/Backend';
import styles from './GameSelector.css';

export default function GameSelector(props) {
  const platform = props.platform;

  useEffect(() => {
    if (platform) {
      console.log('get');
      Backend.getGamesForPlatform({
        page: 1,
        page_size: 20,
        ordering: '-rating',
        platforms: '167'
      }).then(res => console.log(res));
    }
  }, []);

  return <div className={styles.GameSelector}>we are here</div>;
}
