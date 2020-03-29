import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import { images, appConfig } from '../../configs/appConfig';
import styles from './GameSelector.css';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';
import SelectorControls from './SelectorControls/SelectorControls';
import queryString from 'query-string';

export default function GameSelector(props) {
  const { platformName } = props.match.params;
  const params = queryString.parse(props.location.search);
  const queryPage = Number(params.page);
  const queryOrdering = { name: params.ordername, direction: params.direction };
  const defaultOrdering = appConfig.GameSelector.defaultOrdering;
  const platformID = appConfig.platformIdList[platformName];
  const orderingOptions = appConfig.GameSelector.ordering;
  const [platformDescription, setPlatformDescription] = useState();
  const [gamesToShow, setGamesToShow] = useState();
  const [recievedData, setRecievedData] = useState();
  const [inputValue, setInputValue] = useState();
  const [currentPage, setCurrentPage] = useState(queryPage || 1);
  const [ordering, setOrdering] = useState(
    queryOrdering.name ? queryOrdering : defaultOrdering
  );

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
    const updParams = { ...params };
    updParams.page = pageNumber;
    const stringified = queryString.stringify(updParams);
    props.history.push(`${props.history.location.pathname}?${stringified}`);
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
        ordering: `${ordering.direction === 'desc' ? '-' : ''}${ordering.name}`,
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
    const updParams = { ...params };
    updParams.ordername = name;
    const stringified = queryString.stringify(updParams);
    props.history.push(`${props.history.location.pathname}?${stringified}`);

    let updatedOrdering = { ...ordering };
    updatedOrdering.name = name;
    setOrdering(updatedOrdering);
  };

  const directionChangeHandler = e => {
    const direction = e.target.getAttribute('direction');
    const updParams = { ...params };
    updParams.direction = direction;
    const stringified = queryString.stringify(updParams);
    props.history.push(`${props.history.location.pathname}?${stringified}`);

    let updatedOrdering = { ...ordering };
    updatedOrdering.direction = direction;
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
            Chosen Platform : <span>{platformName}</span>
          </div>
          <div>
            Total Games Released :{' '}
            <span>
              {platformDescription ? platformDescription.games_count : ''}
            </span>
          </div>
        </div>
        <div className={styles.Settings}>
          <SelectorControls
            gameSearchChange={gameSearchChangeHandler}
            selectChange={selectChangeHandler}
            directionChange={directionChangeHandler}
            sendRequest={sendRequestHandler}
            ordering={ordering}
            orderingOptions={orderingOptions}
          />
        </div>
        <div className={styles.Pagination}>
          {recievedData && (
            <Paginator
              totalCount={recievedData.count}
              itemsPerPage={appConfig.GameSelector.gamesPerRequest}
              currentPage={currentPage}
              changeCurrentPage={pageChangeHandler}
            />
          )}
        </div>
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
