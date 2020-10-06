import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import SearchInput from '../../Components/UI/Inputs/SearchInput/SearchInput';
import {
  parseQueryParams,
  getGamesForPlatform,
  setNewOrdering,
  changePage,
  setSearchInputValue,
  startNewSearch,
} from '../../Store/Actions/gameSelectorActions';
import { appConfig } from '../../Сonfigs/appConfig';
import SelectBox from '../UI/SelectBox/SelectBox';
import GameCard from '../GameSelector/GameCard/GameCard';
import Paginator from '../Paginator/Paginator.js';
import DotSpinner from '../UI/LoadingSpinners/DotSpinner/DotSpinner';
import styles from './GameSelector.module.scss';

const orderingOptions = appConfig.GameSelector.ordering;

function GameSelector(props) {
  const {
    gamesToShow,
    isLoading,
    noGamesFound,
    searchQuery,
    pageData,
    queryPage,
    ordername,
    direction,
    searchInputValue,
    history,
  } = props;
  const { platformName } = props?.match?.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(parseQueryParams(history.location.search));

    const unlisten = history.listen((location) => {
      dispatch(parseQueryParams(location.search));
    });
    return () => unlisten();
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(getGamesForPlatform(platformName));
  }, [queryPage, searchQuery, ordername, direction, platformName, dispatch]);

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
  };

  return (
    <section className={styles.GameSelector}>
      <div className={styles.Header}>
        <div className={styles.ControlsContainer}>
          <SearchInput
            type="text"
            placeholder="Name of a game"
            name="gameSearch"
            onChange={gameSearchChangeHandler}
            onKeyPress={sendRequestHandler}
            onBtnClick={sendRequestHandler}
            value={searchInputValue}
            isFocused={searchInputValue}
            className={styles.InputWrapper}
          />
          {pageData && (
            <Paginator
              totalCount={pageData.count}
              itemsPerPage={appConfig.GameSelector.gamesPerRequest}
              currentPage={queryPage}
              changeCurrentPage={pageChangeHandler}
              className={styles.Pagination}
            />
          )}
          <SelectBox
            selected={`${ordername} ${direction}`}
            options={orderingOptions}
            changedSelected={selectChangeHandler}
            className={styles.SelectBoxWrapper}
          />
        </div>
      </div>
      <div className={styles.GamePicker}>
        {isLoading && !gamesToShow.length && (
          <div className={styles.DotSpinnerWrapper}>
            <DotSpinner />
          </div>
        )}
        {!!gamesToShow.length &&
          gamesToShow.map((game) => (
            <div className={styles.GameCardWrapper} key={game.slug}>
              <GameCard {...game} platformName={platformName} key={game.slug} />
            </div>
          ))}
        {noGamesFound && (
          <h1 className={styles.NoGamesFound}>
            No results have been found! Try to change the query
          </h1>
        )}
      </div>
      {pageData && (
        <Paginator
          totalCount={pageData.count}
          itemsPerPage={appConfig.GameSelector.gamesPerRequest}
          currentPage={queryPage}
          changeCurrentPage={pageChangeHandler}
          className={styles.BottomPagination}
        />
      )}
    </section>
  );
}

function mapStateToProps(state) {
  return {
    gamesToShow: state.gameSelector.gamesToShow,
    isLoading: state.gameSelector.isLoading,
    noGamesFound: state.gameSelector.noGamesFound,
    pageData: state.gameSelector.pageData,
    queryPage: state.gameSelector.query.page,
    searchQuery: state.gameSelector.query.search,
    ordername: state.gameSelector.query.ordername,
    direction: state.gameSelector.query.direction,
    searchInputValue: state.gameSelector.searchInputValue,
  };
}

export default connect(mapStateToProps)(GameSelector);
