import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import appConfig from '../../configs/appConfig';
import styles from './GameSelector.css';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';

export default function GameSelector(props) {
  const { platform, platformInfo } = props;
  const [gamesToShow, setGamesToShow] = useState();
  const [recievedData, setRecievedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    {
      Backend.getGamesForPlatform({
        page: currentPage,
        page_size: appConfig.GameSelector.gamesPerRequest,
        ordering: appConfig.GameSelector.defaultOrdering,
        platforms: platformInfo.id
      }).then(res => {
        const games = res.results;
        setGamesToShow(games);
        setRecievedData(res);
      });
    }
  }, [currentPage]);

  useEffect(() => {
    if (gamesToShow) {
      // console.log('gamesToShow', gamesToShow);
    }
  }, [gamesToShow]);

  const pageChangeHandler = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.GameSelector}>
      <div className={styles.Header}>
        Header
        {recievedData && (
          <Paginator
            totalCount={recievedData.count}
            itemsPerPage={appConfig.GameSelector.gamesPerRequest}
            currentPage={currentPage}
            changeCurrentPage={pageChangeHandler}
          />
        )}
      </div>
      <div className={styles.GamePicker}>
        {gamesToShow &&
          gamesToShow.map(game => <GameCard key={game.slug} gameInfo={game} />)}
      </div>
    </div>
  );
}
