import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import arrayMove from 'array-move';

import { IProfileGame } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { DraggableGameBox } from 'Routes/Profile/components/DraggableGameBox';
import { GameBox } from 'Routes/Profile/components/GameBox';
import {
  DraggableEbayLotSection,
  EbayLotSection,
} from 'Routes/Profile/components/WishList/components/GameLotContainer/components';
import { reorderGamesThunk } from 'Routes/Profile/reducer/thunks';

interface IDndShelfProps {
  games: DeepReadonly<IProfileGame[]>;
  list: EAvailableLists;
  platform: TPlatformNames;
}

export function DndShelf(props: IDndShelfProps): JSX.Element {
  const { games, platform, list } = props;
  const dispatch = useDispatch();
  const [draggingInd, setDraggingInd] = useState<number | null>(null);
  const isOwnedList = list === EAvailableLists.ownedList;

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 20 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    const ind = games.findIndex((game) => game.slug === active.id);

    if (ind < 0) {
      return;
    }

    setDraggingInd(ind);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeInd = games.findIndex(({ slug }) => slug === active.id);
    const overInd = games.findIndex(({ slug }) => slug === over.id);

    if (activeInd < 0 || overInd < 0) {
      return;
    }

    const newSortedGames = arrayMove(games, activeInd, overInd);

    dispatch(
      reorderGamesThunk({
        list,
        newSortedGames,
        platform,
      })
    );
  };

  const DraggableElm = isOwnedList ? DraggableGameBox : DraggableEbayLotSection;

  const DraggableOverlay = isOwnedList ? GameBox : EbayLotSection;

  return (
    <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart} sensors={sensors} collisionDetection={closestCenter}>
      <SortableContext
        items={games.map((game) => game.slug)}
        strategy={isOwnedList ? rectSortingStrategy : horizontalListSortingStrategy}
      >
        {games.map((game) => (
          <DraggableElm key={game.slug} game={game} platform={platform} />
        ))}
      </SortableContext>
      {createPortal(
        draggingInd !== null ? (
          <DragOverlay adjustScale={false}>
            <DraggableOverlay game={games[draggingInd]} platform={platform} />
          </DragOverlay>
        ) : null,
        document.body
      )}
    </DndContext>
  );
}
