import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import { images, appConfig } from '../../configs/appConfig';
import styles from './GameSelector.css';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';
import SelectorControls from './SelectorControls/SelectorControls';

export default function GameSelector(props) {
  const { match } = props;
  const platformName = match.params.platformName;
  const platformID = appConfig.platformIdList[platformName];
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
    Backend.getPlatformDetails(platformID).then(res => {
      setPlatformDescription(res);
    });

    Backend.getGamesForPlatform({
      page: currentPage,
      page_size: appConfig.GameSelector.gamesPerRequest,
      ordering: `${ordering.direction === 'desc' ? '-' : ''}${ordering.name}`,
      platforms: platformID
    }).then(res => {
      const games = res.results;
      setGamesToShow(games);
      setRecievedData(res);
    });
  }, [currentPage, ordering, platformID]);

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
        platforms: platformID,
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

  const openGameDetailsHandler = slug => {
    props.history.push({
      pathname: `/${platformName}/${slug}`,
      state: {
        from: props.location.pathname
      }
    });
  };

  return (
    <div className={styles.GameSelector}>
      <div className={styles.Header}>
        <div className={styles.IconContainer}>
          <img src={images[platformName].gamepad.src} alt="platformImg" />
        </div>
        <div className={styles.PlatformInfo}>
          <div>
            <p>Chosen Platform : {platformName}</p>
          </div>
          <div>
            <p>
              Total Games Released :{' '}
              {platformDescription ? platformDescription.games_count : null}
            </p>
          </div>
        </div>

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
              openGameDetails={openGameDetailsHandler}
            />
          ))}
      </div>
    </div>
  );
}
