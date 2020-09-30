import React, { useEffect, useState } from 'react';
import Backend from '../../Backend/Backend';
import SearchInput from '../../Components/UI/Inputs/SearchInput/SearchInput';
import { cacheGameSelector } from '../../Store/Actions/actions';
import {
  parseQueryParams,
  getGamesForPlatform,
  getHistoryObj,
  setNewOrdering,
  changePage,
  setSearchInputValue,
  startNewSearch,
} from '../../Store/Actions/gameSelectorActions';
import { connect, useDispatch } from 'react-redux';
import { parseQueryString } from '../../Utils/queryStrUtils';
import SelectBox from '../UI/SelectBox/SelectBox';
import { appConfig } from '../../Сonfigs/appConfig';
import DotSpinner from '../UI/LoadingSpinners/DotSpinner/DotSpinner';
import styles from './GameSelector.module.scss';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';

function GameSelector(props) {
  const {
    gamesToShow,
    isLoading,
    noGamesFound,
    searchQuery,
    pageData,
    queryPage,
    ordering,
    ordername,
    direction,
    searchInputValue,
  } = props;
  const { platformName } = props?.match?.params;
  const dispatch = useDispatch();
  // const url = `${props.history.location.pathname}${props.history.location.search}`;
  const cache = props?.gameSelector?.gameSelectorCache || {
    url: 'not loaded yet',
  };
  // const params = parseQueryString(props.location.search);
  // const searchQuery = params.search;
  // const defaultOrdering = appConfig.GameSelector.defaultOrdering;
  // const platformID = appConfig.platformIdList[platformName];
  const orderingOptions = appConfig.GameSelector.ordering;
  // const [gamesToShow, setGamesToShow] = useState(cache ? cache.results : []);
  // const [pageData, setRecievedData] = useState(cache);
  // const [searchInputValue, setInputValue] = useState(searchQuery);
  // const [noGamesFound, setNoGamesFound] = useState();
  // const ordering = {
  //   name: params.ordername ? params.ordername : defaultOrdering.name,
  //   direction: params.direction ? params.direction : defaultOrdering.direction,
  // };
  // const [isLoading, setLoading] = useState();

  // useEffect(() => {
  //   if (url !== cache.url) sendReq();
  // }, [ordering, platformID, params]);

  useEffect(() => {
    dispatch(parseQueryParams({ match: props.match, history: props.history }));
  }, []);

  useEffect(() => {
    // if (url === cache.url) return;
    console.log(ordering);
    dispatch(getGamesForPlatform(platformName));
  }, [queryPage, searchQuery, ordering]);

  const pageChangeHandler = (pageNumber) => dispatch(changePage(pageNumber));

  const gameSearchChangeHandler = (e) =>
    dispatch(setSearchInputValue(e.target.value));

  const sendRequestHandler = (e) => {
    if (e.key === 'Enter' || e.currentTarget.name === 'searchBtn') {
      dispatch(startNewSearch(searchInputValue));
    }
  };

  const selectChangeHandler = (option) => {
    dispatch(setNewOrdering(option));
    // const [name, direction] = option.split(' ');
    // const stringified = updateQueryStr([
    //   ['direction', direction],
    //   ['ordername', name],
    // ]);
    // props.history.push(`${props.history.location.pathname}?${stringified}`);
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
              value={searchInputValue}
              isFocused={searchInputValue}
            />
          </div>
          <div className={styles.Pagination}>
            {pageData && (
              <Paginator
                totalCount={pageData.count}
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
        {isLoading && !gamesToShow?.length && (
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
      <div className={styles.BottomPagination}>
        {pageData && (
          <Paginator
            totalCount={pageData.count}
            itemsPerPage={appConfig.GameSelector.gamesPerRequest}
            currentPage={queryPage}
            changeCurrentPage={pageChangeHandler}
          />
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    gamesToShow: state.gameSelector.gamesToShow,
    isLoading: state.gameSelector.isLoading,
    noGamesFound: state.gameSelector.noGamesFound,
    pageData: state.gameSelector.cache,
    queryPage: state.gameSelector.query.params.page,
    searchQuery: state.gameSelector.query.params.search,
    searchOrdering: state.gameSelector.query.params.search,
    ordername: state.gameSelector.query.params.ordername,
    direction: state.gameSelector.query.params.direction,
    searchInputValue: state.gameSelector.searchInputValue,
    ordering: state.gameSelector.ordering,
  };
}

export default connect(mapStateToProps)(GameSelector);
