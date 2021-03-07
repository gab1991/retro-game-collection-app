import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { IProfileGame } from 'Store/profileReducer/types';
import { DeepReadonly } from 'utility-types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { removeGame, reorderGames } from 'Store/profileReducer/thunks';

import { EbayLotSection } from './components';

import styles from './GameLotContainer.module.scss';

const SortableList = SortableContainer(({ games, platform, isEbayShowedList }) => {
  return (
    <div className={styles.GameLotContainer}>
      <hr></hr>
      {games.map((game: IProfileGame, index: number) => {
        return (
          <SortableItem
            isEbayShowedList={isEbayShowedList}
            // ebayshowHandler={ebayshowHandler}
            // removeFromArrayHandler={removeFromArrayHandler}
            key={`${game.name}_${platform}`}
            index={index}
            // ind={index}
            game={game}
            platform={platform}
          />
        );
      })}
    </div>
  );
});

const SortableItem = SortableElement(({ game, platform, isEbayShowedList }) => (
  <div className={`${styles.GameLots} ${isEbayShowedList[game.name] ? styles.EbayShowing : ''}`}>
    <EbayLotSection gameData={game} platform={platform} />
  </div>
));

interface IGameLotContainerProps {
  games: DeepReadonly<Array<IProfileGame>>;
  platform: TPlatformNames;
}

export function GameLotContainer(props: IGameLotContainerProps): JSX.Element {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);
  const { games, platform } = props;
  const [gamesSort, setGamesSort] = useState(games || []);
  const [isEbayShowedList, setIsEbayShowedList] = useState({});

  //fix it later
  const ebayshowHandler = (game: string, bool: boolean) => {
    setIsEbayShowedList((prevList) => {
      const updList = { ...prevList };
      updList[game] = bool;
      return updList;
    });
  };

  const reorderSorted = ({ oldIndex, newIndex }: { newIndex: number; oldIndex: number }) => {
    const newSortedgames = arrayMove(gamesSort, oldIndex, newIndex);
    setGamesSort(newSortedgames);
    dispatch(reorderGames(newSortedgames as Array<IProfileGame>, platform, EAvailableLists.wishList));
  };

  //fix it later
  const removeFromArrayHandler = (index: number) => {
    const newSortedgames = [...gamesSort];
    const removedGame = newSortedgames.splice(index, 1)[0];

    setGamesSort(newSortedgames);
    dispatch(removeGame(removedGame.name, EAvailableLists.wishList, platform));
  };

  return (
    <SortableList
      isEbayShowedList={isEbayShowedList}
      // ebayshowHandler={ebayshowHandler}
      // removeFromArrayHandler={removeFromArrayHandler}
      onSortEnd={reorderSorted}
      games={gamesSort}
      platform={platform}
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      pressDelay={isMobile ? 200 : 0}
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      distance={isMobile ? 0 : 5}
      axis={'xy'}
    />
  );
}
