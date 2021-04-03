import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import arrayMove from 'array-move';
import { PlatformBadge } from 'Components';
import { produce } from 'immer';

import { IProfilePlatform } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { ButtonNeon } from 'Components/UI';
import { EAvailableLists } from 'Configs/appConfig';
import { DraggableGameBox } from 'Routes/Profile/components';
import { selectOwnedPlatforms } from 'Routes/Profile/reducer/selectors';
import { reorderGamesThunk } from 'Routes/Profile/reducer/thunks';
import { Routes } from 'Routes/routes';

import { DroppableGameBoxContainer } from './components';

import styles from './CollectionList.module.scss';

export function CollectionList(): JSX.Element {
  const ownedPlatforms = useSelector(selectOwnedPlatforms);
  const history = useHistory();
  const [ownedList, setOwnedList] = useState<DeepReadonly<Array<IProfilePlatform>>>([]);

  useEffect(() => {
    setOwnedList(ownedPlatforms || []);
  }, [ownedPlatforms]);

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.makePath());
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    const updPlatformInd = ownedList.findIndex(({ name }) => name === source.droppableId);

    if (!destination || updPlatformInd < 0) {
      return;
    }

    const changedPlatform = ownedList[updPlatformInd];

    const newOrderGames = arrayMove(changedPlatform.games, source.index, destination.index);

    const updState = produce(ownedList, (draft) => {
      draft[updPlatformInd].games = newOrderGames;
    });

    reorderGamesThunk({
      list: EAvailableLists.ownedList,
      newSortedGames: newOrderGames,
      platform: changedPlatform.name,
    });

    setOwnedList(updState);
  };

  return (
    <div className={styles.CollectionList}>
      <h1 className={styles.SectionName}>My Collection</h1>
      <div className={styles.ShelvesContainer}>
        {ownedList.map(({ name: platformName, games }) => (
          <div key={platformName} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platformName} />
            <DragDropContext onDragEnd={onDragEnd}>
              <DroppableGameBoxContainer platform={platformName}>
                {games.map((game, index) => (
                  <DraggableGameBox key={game.slug} index={index} game={game} platform={platformName} />
                ))}
              </DroppableGameBoxContainer>
            </DragDropContext>
          </div>
        ))}
        <div className={styles.EmptyList}>
          <h1>Wanna add some?</h1>
          <ButtonNeon txtContent={'Start Adding Games'} onClick={toPlatfromSelecor} />
        </div>
      </div>
    </div>
  );
}
