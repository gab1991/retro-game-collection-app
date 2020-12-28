import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { History } from 'history';

import { IGameSelectorQuery } from 'Store/gameSelectorReducer/types';

import Paginator from '../../Components/Paginator/Paginator.js';
import { appConfig } from '../../Сonfigs/appConfig';
import GameCard from './GameCard/GameCard';
import { DotSpinner, SearchInput, SelectBox } from 'Components/UI';
import { setSearchInputValue } from 'Store/gameSelectorReducer/actions';
import { getGamesToShow, getPageData, getStore } from 'Store/gameSelectorReducer/selectors';
import {
  changePage,
  getGamesForPlatform,
  parseQueryParams,
  setNewOrdering,
  startNewSearch,
} from 'Store/gameSelectorReducer/thunks';
import { IRawgGame, IRawgPageData } from 'Typings/RawgData';

import styles from './GameSelector.module.scss';

const orderingOptions = appConfig.GameSelector.ordering;

interface IGameSelectorProps {
  gamesToShow: Array<IRawgGame>;
  history: History;
  isLoading: boolean;
  match: match<IGameSelecorMatchParams>;
  noGamesFound: boolean;
  pageData: IRawgPageData;
  query: IGameSelectorQuery;
  searchInputValue: string;
}

interface IGameSelecorMatchParams {
  platformName: string;
}

interface ISendReqEvent extends SyntheticEvent {
  key?: string;
}

function _GameSelector(props: IGameSelectorProps) {
  const { isLoading, noGamesFound, query, searchInputValue, history, match } = props;
  const { platformName } = match.params;
  const { ordername, page: queryPage, search: searchQuery, direction } = query;
  const dispatch = useDispatch();

  const gamesToShow = useSelector(getGamesToShow);
  const pageData = useSelector(getPageData);

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

  const pageChangeHandler = (pageNumber: number) => dispatch(changePage(pageNumber));

  const gameSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchInputValue(e.target.value));

  const sendRequestHandler = (e: ISendReqEvent) => {
    if (e.key === 'Enter' || e.currentTarget.getAttribute('name') === 'searchBtn') {
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
            type='text'
            placeholder='Name of a game'
            name='gameSearch'
            onChange={gameSearchChangeHandler}
            onKeyPress={sendRequestHandler}
            onBtnClick={sendRequestHandler}
            value={searchInputValue}
            //isFocused={searchInputValue} accessibility isseues
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
        {noGamesFound && <h1 className={styles.NoGamesFound}>No results have been found! Try to change the query</h1>}
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
    // gamesToShow: state.gameSelector.gamesToShow,
    isLoading: state.gameSelector.isLoading,
    noGamesFound: state.gameSelector.noGamesFound,
    pageData: state.gameSelector.pageData,
    query: state.gameSelector.query,
    searchInputValue: state.gameSelector.searchInputValue,
  };
}

export const GameSelector = connect(mapStateToProps)(_GameSelector);
