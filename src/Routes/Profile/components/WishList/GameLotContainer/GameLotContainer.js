import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import EbyaLotSection from './EbayLotSection/EbyaLotSection';
import { removeGame, reorderGames } from 'Store/profileReducer/thunks';

import styles from './GameLotContainer.module.scss';

const SortableList = SortableContainer(
  ({ games, platform, removeFromArrayHandler, ebayshowHandler, isEbayShowedList }) => {
    return (
      <div className={styles.GameLotContainer}>
        <hr></hr>
        {games.map((game, index) => {
          return (
            <SortableItem
              isEbayShowedList={isEbayShowedList}
              ebayshowHandler={ebayshowHandler}
              removeFromArrayHandler={removeFromArrayHandler}
              key={`${game.name}_${platform}`}
              index={index}
              ind={index}
              game={game}
              platform={platform}
            />
          );
        })}
      </div>
    );
  }
);

const SortableItem = SortableElement(
  ({ game, platform, removeFromArrayHandler, ind, ebayshowHandler, isEbayShowedList }) => (
    <div className={`${styles.GameLots} ${isEbayShowedList[game.name] ? styles.EbayShowing : ''}`}>
      <EbyaLotSection
        showingEbay={ebayshowHandler}
        removeFromArray={removeFromArrayHandler}
        gameData={game}
        platform={platform}
        index={ind}
      />
    </div>
  )
);

function GameLotContainer(props) {
  const dispatch = useDispatch();
  const { games, platform, token, isMobile } = props;
  const [gamesSort, setGamesSort] = useState(games || []);
  const [isEbayShowedList, setIsEbayShowedList] = useState({});

  const ebayshowHandler = (game, bool) => {
    setIsEbayShowedList((prevList) => {
      const updList = { ...prevList };
      updList[game] = bool;
      return updList;
    });
  };

  const reorderSorted = ({ oldIndex, newIndex }) => {
    const newSortedgames = arrayMove(gamesSort, oldIndex, newIndex);
    setGamesSort(newSortedgames);
    dispatch(reorderGames(newSortedgames, platform, 'wish_list'));
  };

  const removeFromArrayHandler = (index) => {
    const newSortedgames = [...gamesSort];
    const removedGame = newSortedgames.splice(index, 1)[0];

    setGamesSort(newSortedgames);
    dispatch(removeGame(removedGame, 'wish_list', platform));
  };

  return (
    <SortableList
      isEbayShowedList={isEbayShowedList}
      ebayshowHandler={ebayshowHandler}
      removeFromArrayHandler={removeFromArrayHandler}
      onSortEnd={reorderSorted}
      games={gamesSort}
      platform={platform}
      pressDelay={isMobile ? 200 : 0}
      distance={isMobile ? 0 : 5}
      axis={'xy'}
    />
  );
}

function mapStateToProps(state) {
  return {
    isMobile: state.appState.isMobile,
    profileInfo: state.profile,
    token: state.logged.token,
  };
}

export default connect(mapStateToProps)(GameLotContainer);
