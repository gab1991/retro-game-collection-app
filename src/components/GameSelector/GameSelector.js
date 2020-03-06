import React, { useEffect } from 'react';
import Backend from '../../Backend/Backend';
import styles from './GameSelector.css';
import GameCard from '../GameSelector/GameCard/GameCard';

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

  return (
    <div className={styles.GameSelector}>
      <div className={styles.Header}>Header</div>
      <div className={styles.GamePicker}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </div>
  );
}
