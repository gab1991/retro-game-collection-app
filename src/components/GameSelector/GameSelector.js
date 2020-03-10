import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import { images, appConfig } from '../../configs/appConfig';
import styles from './GameSelector.css';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';
import SelectorControls from './SelectorControls/SelectorControls';

export default function GameSelector(props) {
  const { platform, platformInfo } = props;
  const orderingOptions = appConfig.GameSelector.ordering;

  const [platformDescription, setPlatformDescription] = useState();
  const [gamesToShow, setGamesToShow] = useState();
  const [recievedData, setRecievedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordering, setOrdering] = useState({
    name: 'rating',
    direction: 'desc'
  });
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    {
      Backend.getGamesForPlatform({
        page: currentPage,
        page_size: appConfig.GameSelector.gamesPerRequest,
        ordering: `${ordering.direction === 'desc' ? '-' : ''}${ordering.name}`,
        platforms: platformInfo.id
      }).then(res => {
        const games = res.results;
        setGamesToShow(games);
        setRecievedData(res);
      });
    }
  }, [currentPage, ordering]);

  useEffect(() => {
    Backend.getPlatformDetails(platformInfo.id).then(res => {
      setPlatformDescription(res.description);
    });
  }, []);

  const pageChangeHandler = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const gameSearchChangeHandler = e => {
    setInputValue(e.target.value);
  };

  const sendRequestHandler = e => {
    if (e.key === 'Enter' || e.target.name === 'searchBtn') {
      Backend.getGamesForPlatform({
        page: 1,
        page_size: appConfig.GameSelector.gamesPerRequest,
        ordering: appConfig.GameSelector.defaultOrdering,
        platforms: platformInfo.id,
        search: inputValue
      }).then(res => {
        const games = res.results;
        setGamesToShow(games);
        setRecievedData(res);
      });
    }
  };

  const selectChangeHandler = name => {
    let updatedOrdering = { ...ordering };
    updatedOrdering.name = name;
    setOrdering(updatedOrdering);
  };

  const directionChangeHandler = e => {
    let updatedOrdering = { ...ordering };
    updatedOrdering.direction = e.target.getAttribute('direction');
    setOrdering(updatedOrdering);
  };

  return (
    <div className={styles.GameSelector}>
      <div className={styles.Header}>
        <div className={styles.IconContainer}>
          <img src={images[platformInfo.name].gamepad.src} alt="platformImg" />
        </div>
        <div className={styles.PlatformInfo}>
          <div>
            <p>Chosen Platform : {platformInfo.name}</p>
          </div>
          <div>
            <p>Total Games Released : {platformInfo.games_count}</p>
          </div>
        </div>
        {/* <div className={styles.Desctiprion}>{platformDescription}</div> */}
        <SelectorControls
          gameSearchChange={gameSearchChangeHandler}
          selectChange={selectChangeHandler}
          directionChange={directionChangeHandler}
          sendRequest={sendRequestHandler}
          ordering={ordering}
          orderingOptions={orderingOptions}
        />
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
          gamesToShow.map(game => (
            <GameCard
              key={game.slug}
              gameInfo={game}
              openGameDetails={props.openGameDetails}
            />
          ))}
      </div>
    </div>
  );
}
