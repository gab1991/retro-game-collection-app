import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Paginator } from 'Components';

import { DotSpinner, SearchInput, SelectBox } from 'Components/UI';
import { appConfig, TPlatformNames } from 'Configs/appConfig';
import { setSearchInputValue } from 'Routes/GameSelector/reducer/actions';
import {
  selectGamesToShow,
  selectIsLoading,
  selectNoGamesFound,
  selectPageData,
  selectQuery,
  selectSearchInputValue,
} from 'Routes/GameSelector/reducer/selectors';
import {
  changePage,
  getGamesForPlatform,
  parseQueryParams,
  setNewOrdering,
  startNewSearch,
} from 'Routes/GameSelector/reducer/thunks';

import { GameCard } from './components';

import styles from './GameSelector.module.scss';

const orderingOptions = appConfig.GameSelector.ordering;

interface ISendReqEvent extends SyntheticEvent {
  key?: string;
}

export function GameSelector(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const gamesToShow = useSelector(selectGamesToShow);
  const pageData = useSelector(selectPageData);
  const searchInputValue = useSelector(selectSearchInputValue);
  const isLoading = useSelector(selectIsLoading);
  const noGamesFound = useSelector(selectNoGamesFound);
  const { platformName } = useParams<{ platformName: TPlatformNames }>();
  const { ordername, page: queryPage, search: searchQuery, direction } = query;

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
  const selectChangeHandler = (option: string) => {
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
