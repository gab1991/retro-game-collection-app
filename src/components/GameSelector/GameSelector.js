import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import SearchInput from '../../components/UI/Inputs/SearchInput/SearchInput';
import { cacheGameSelector } from '../../actions/actions';
import { connect, useDispatch } from 'react-redux';
import SelectBox from '../UI/SelectBox/SelectBox';
import { appConfig } from '../../configs/appConfig';
import DotSpinner from '../UI/LoadingSpinners/DotSpinner/DotSpinner';
import styles from './GameSelector.module.scss';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';
import queryString from 'query-string';

function GameSelector(props) {
  const dispatch = useDispatch();
  const url = `${props.history.location.pathname}${props.history.location.search}`;
  const cache = props.dataCache.gameSelectorCache || {
    url: 'not loaded yet',
  };
  const { platformName } = props.match.params;
  const params = queryString.parse(props.location.search);
  const queryPage = Number(params.page) || 1;
  const searchQuery = params.search;
  const defaultOrdering = appConfig.GameSelector.defaultOrdering;
  const platformID = appConfig.platformIdList[platformName];
  const orderingOptions = appConfig.GameSelector.ordering;
  const [gamesToShow, setGamesToShow] = useState(cache ? cache.results : []);
  const [recievedData, setRecievedData] = useState(cache);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [noGamesFound, setNoGamesFound] = useState();
  const ordering = {
    name: params.ordername ? params.ordername : defaultOrdering.name,
    direction: params.direction ? params.direction : defaultOrdering.direction,
  };
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (url !== cache.url) sendReq();
  }, [ordering, platformID, params]);

  const sendReq = () => {
    setLoading(true);
    Backend.getGamesForPlatform({
      page: queryPage ? queryPage : 1,
      page_size: appConfig.GameSelector.gamesPerRequest,
      ordering: `${ordering.direction === '↓' ? '-' : ''}${ordering.name}`,
      platforms: platformID,
      search: `${searchQuery || ' '}`,
    })
      .then((res) => {
        dispatch(cacheGameSelector({ ...res, url: url }));
        setLoading(false);
        const games = res.results;
        if (games.length > 0) {
          setNoGamesFound(false);
        } else {
          setNoGamesFound(true);
        }
        setGamesToShow(games);
        setRecievedData(res);
      })
      .catch((err) => setLoading(false));
  };

  const updateQueryStr = (arr) => {
    const updParams = { ...params };
    arr.forEach((el) => {
      const key = el[0];
      const value = el[1];
      updParams[key] = value;
    });
    return queryString.stringify(updParams);
  };

  const pageChangeHandler = (pageNumber) => {
    const stringified = updateQueryStr([['page', pageNumber]]);
    props.history.push(`${props.history.location.pathname}?${stringified}`);
  };

  const gameSearchChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const sendRequestHandler = (e) => {
    if (e.key === 'Enter' || e.currentTarget.name === 'searchBtn') {
      const stringified = updateQueryStr([
        ['search', inputValue],
        ['page', 1],
      ]);
      props.history.push(`${props.history.location.pathname}?${stringified}`);
    }
  };

  const selectChangeHandler = (option) => {
    const [name, direction] = option.split(' ');
    const stringified = updateQueryStr([
      ['direction', direction],
      ['ordername', name],
    ]);
    props.history.push(`${props.history.location.pathname}?${stringified}`);
  };

  const openGameDetailsHandler = (slug) => {
    props.history.push({
      pathname: `/${platformName}/${slug}`,
      state: {
        from: `${props.history.location.pathname}${props.history.location.search}`,
      },
    });
  };

  return (
    <div className={styles.GameSelector}>
      <div className={styles.Header}>
        <div className={styles.ControlsContainer}>
          <div className={styles.InputWrapper}>
            <SearchInput
              type="text"
              placeholder="Name of a game"
              name="gameSearch"
              onChange={gameSearchChangeHandler}
              onKeyPress={sendRequestHandler}
              onBtnClick={sendRequestHandler}
              value={inputValue || ''}
              isFocused={inputValue}
            />
          </div>
          <div className={styles.Pagination}>
            {recievedData && (
              <Paginator
                totalCount={recievedData.count}
                itemsPerPage={appConfig.GameSelector.gamesPerRequest}
                currentPage={queryPage}
                changeCurrentPage={pageChangeHandler}
              />
            )}
          </div>
          <div className={styles.SelectBoxWrapper}>
            <SelectBox
              selected={`${ordering.name} ${ordering.direction}`}
              options={orderingOptions}
              changedSelected={selectChangeHandler}
            />
          </div>
        </div>
      </div>
      <div className={styles.GamePicker}>
        {loading && !gamesToShow && (
          <div className={styles.DotSpinnerWrapper}>
            <DotSpinner />
          </div>
        )}
        {gamesToShow &&
          gamesToShow.map((game) => (
            <div className={styles.GameCardWrapper} key={game.slug}>
              <GameCard
                gameInfo={game}
                openGameDetails={openGameDetailsHandler}
              />
            </div>
          ))}
        {noGamesFound && (
          <div className={styles.NoGamesFound}>
            <h1>No results have been found! Try to change the query</h1>
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dataCache: state.dataCache,
  };
}

export default connect(mapStateToProps)(GameSelector);
