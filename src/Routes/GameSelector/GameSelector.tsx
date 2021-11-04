import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Paginator } from 'Components';

import { GameCardSkeleton } from './components/GameCard/GameCard.skeleton';
import { SearchInput, SelectBox } from 'Components/UI';
import { appConfig, TPlatformNames } from 'Configs/appConfig';
import { flushGameSelectorStore, setSearchInputValue } from 'Routes/GameSelector/reducer/actions';
import {
  selectGamesToShow,
  selectIsLoading,
  selectNoGamesFound,
  selectPageData,
  selectSearchInputValue,
} from 'Routes/GameSelector/reducer/selectors';
import { getGamesForPlatformThunk } from 'Routes/GameSelector/reducer/thunks';

import { GameCard } from './components';
import { useGameSelectorUrl } from './hooks';

import styles from './GameSelector.module.scss';

const orderingOptions = appConfig.GameSelector.ordering;

interface ISendReqEvent extends SyntheticEvent {
  key?: string;
}

export function GameSelector(): JSX.Element {
  const { query, setOrdering, changeSearchStr, changePage } = useGameSelectorUrl();
  const { ordername, page: queryPage, search: searchQuery, direction } = query;
  const dispatch = useDispatch();
  const gamesToShow = useSelector(selectGamesToShow);
  const pageData = useSelector(selectPageData);
  const searchInputValue = useSelector(selectSearchInputValue);
  const noGamesFound = useSelector(selectNoGamesFound);
  const isLoading = useSelector(selectIsLoading);
  const { platformName } = useParams<{ platformName: TPlatformNames }>();

  console.log(isLoading);

  useEffect(() => {
    return () => {
      dispatch(flushGameSelectorStore());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGamesForPlatformThunk(platformName));
  }, [queryPage, searchQuery, ordername, direction, platformName, dispatch]);

  const gameSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchInputValue(e.target.value));

  const sendRequestHandler = (e: ISendReqEvent) => {
    if (e.key === 'Enter' || e.currentTarget.getAttribute('data-name') === 'searchBtn') {
      changeSearchStr(searchInputValue);
      changePage(1);
    }
  };

  return (
    <section className={styles.GameSelector}>
      <div className={styles.Header}>
        <div className={styles.ControlsContainer}>
          <SearchInput
            type='text'
            placeholder='Name of a game'
            onChange={gameSearchChangeHandler}
            onKeyPress={sendRequestHandler}
            onBtnClick={sendRequestHandler}
            value={searchInputValue}
            wrapperClassName={styles.InputWrapper}
          />
          {!!pageData.count && (
            <Paginator
              totalCount={pageData.count}
              itemsPerPage={appConfig.GameSelector.gamesPerRequest}
              currentPage={queryPage}
              changeCurrentPage={changePage}
              className={styles.Pagination}
            />
          )}
          <SelectBox
            selected={`${ordername} ${direction}`}
            options={orderingOptions}
            changedSelected={setOrdering}
            className={styles.SelectBoxWrapper}
          />
        </div>
      </div>
      <div className={styles.GamePicker}>
        {!isLoading &&
          gamesToShow.map((game) => (
            <div className={styles.GameCardWrapper} key={game.slug}>
              <GameCard {...game} platformName={platformName} key={game.slug} className={styles.GameCard} />
            </div>
          ))}
        {isLoading &&
          Array.from({ length: appConfig.GameSelector.gamesPerRequest }).map((_, ind) => (
            <div className={styles.GameCardWrapper} key={ind}>
              <GameCardSkeleton className={styles.GameCard} />
            </div>
          ))}
        {noGamesFound && <h1 className={styles.NoGamesFound}>No results have been found! Try to change the query</h1>}
      </div>
      {!!pageData.count && (
        <Paginator
          totalCount={pageData.count}
          itemsPerPage={appConfig.GameSelector.gamesPerRequest}
          currentPage={queryPage}
          changeCurrentPage={changePage}
          className={styles.BottomPagination}
        />
      )}
    </section>
  );
}
