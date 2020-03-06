import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import appConfig from '../../configs/appConfig';
import styles from './GameSelector.css';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';

export default function GameSelector(props) {
  const platform = props.platform;
  const [gamesToShow, setGamesToShow] = useState();
  const [recievedData, setRecievedData] = useState();

  useEffect(() => {
    if (platform) {
      Backend.getGamesForPlatform({
        page: appConfig.GameSelector.defaultPage,
        page_size: appConfig.GameSelector.gamesPerRequest,
        ordering: appConfig.GameSelector.defaultOrdering,
        platforms: '167'
      }).then(res => {
        const games = res.results;
        setGamesToShow(games);
        setRecievedData(res);
      });
    }
  }, [platform]);

  useEffect(() => {
    if (gamesToShow) {
      console.log('gamesToShow', gamesToShow);
    }
  }, [gamesToShow]);

  useEffect(() => {
    if (gamesToShow) {
      console.log('data', recievedData);
    }
  }, [recievedData]);

  return (
    <div className={styles.GameSelector}>
      <div className={styles.Header}>
        Header
        <Paginator />
      </div>
      <div className={styles.GamePicker}>
        {gamesToShow &&
          gamesToShow.map(game => <GameCard key={game.slug} gameInfo={game} />)}
      </div>
    </div>
  );
}
