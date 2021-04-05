import React, { useState } from 'react';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import arrayMove from 'array-move';
import { PlatformBadge } from 'Components';

import { GameBox } from '../GameBox';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ButtonNeon } from 'Components/UI';
import { EAvailableLists, isPlatformName, TPlatformNames } from 'Configs/appConfig';
import { DraggableGameBox } from 'Routes/Profile/components';
import { selectOwnedPlatforms } from 'Routes/Profile/reducer/selectors';
import { reorderGamesThunk } from 'Routes/Profile/reducer/thunks';
import { Routes } from 'Routes/routes';

import { DroppableGameBoxContainer, GameBoxContainer } from './components';
import { formSortableId, SORTABLE_ID_DELIMETER } from './sortableHelpers';

import styles from './CollectionList.module.scss';

interface IDraggingItem {
  platform: TPlatformNames;
  slug: string;
}

export function CollectionList(): JSX.Element {
  const dispatch = useDispatch();
  const ownedPlatforms = useSelector(selectOwnedPlatforms) || [];
  const [draggingItem, setDraggingItem] = useState<IDraggingItem | null>(null);
  const [draggingInd, setDraggingInd] = useState<number | null>(null);
  const history = useHistory();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 20 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toPlatfromSelecor = () => {
    history.push(Routes.PlatformSelector.makePath());
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    const [platform, slug] = active.id.split(SORTABLE_ID_DELIMETER);

    if (isPlatformName(platform)) {
      setDraggingItem({ platform, slug });

      const ind = ownedPlatforms.find((pl) => pl.name === platform);
      if (ind) {
        const index = ind.games.findIndex((game) => game.slug === slug);
        if (index < 0) {
          return;
        }
        setDraggingInd(index);
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const [activePlatform, activeSlug] = active.id.split(SORTABLE_ID_DELIMETER);
    const [, overSlug] = over.id.split(SORTABLE_ID_DELIMETER);
    const updPlatformInd = ownedPlatforms.findIndex(({ name }) => name === activePlatform);
    const activeInd = ownedPlatforms[updPlatformInd].games.findIndex(({ slug }) => slug === activeSlug);
    const overInd = ownedPlatforms[updPlatformInd].games.findIndex(({ slug }) => slug === overSlug);
    if (activeInd < 0 || overInd < 0) {
      return;
    }
    const changedPlatform = ownedPlatforms[updPlatformInd];
    const newOrderGames = arrayMove(changedPlatform.games, activeInd, overInd);
    dispatch(
      reorderGamesThunk({
        list: EAvailableLists.ownedList,
        newSortedGames: newOrderGames,
        platform: changedPlatform.name,
      })
    );
  };

  return (
    <div className={styles.CollectionList}>
      <h1 className={styles.SectionName}>My Collection</h1>
      <div className={styles.ShelvesContainer}>
        {ownedPlatforms.map(({ name: platformName, games }) => (
          <div key={platformName} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platform={platformName} />
            <DndContext
              onDragEnd={onDragEnd}
              onDragStart={onDragStart}
              sensors={sensors}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={games.map((game) => formSortableId(platformName, game.slug))}
                strategy={rectSortingStrategy}
              >
                <GameBoxContainer>
                  {games.map((game) => (
                    <DraggableGameBox key={game.slug} game={game} platform={platformName} />
                  ))}
                  <DragOverlay>
                    {draggingInd !== null && <GameBox game={games[draggingInd]} platform={platformName} />}
                  </DragOverlay>
                </GameBoxContainer>
              </SortableContext>
            </DndContext>
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
