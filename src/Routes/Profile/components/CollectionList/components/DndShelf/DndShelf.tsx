import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import arrayMove from 'array-move';

import { IProfileGame } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import { GameBoxContainer } from '../GameBoxContainer';
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
import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { DraggableGameBox } from 'Routes/Profile/components/DraggableGameBox';
import { GameBox } from 'Routes/Profile/components/GameBox';
import { reorderGamesThunk } from 'Routes/Profile/reducer/thunks';

interface IDndShelfProps {
  games: DeepReadonly<IProfileGame[]>;
  platform: TPlatformNames;
}

export function DndShelf(props: IDndShelfProps): JSX.Element {
  const { games, platform } = props;
  const dispatch = useDispatch();
  const [draggingInd, setDraggingInd] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 20 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
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
        list: EAvailableLists.ownedList,
        newSortedGames,
        platform,
      })
    );
  };

  return (
    <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart} sensors={sensors} collisionDetection={closestCenter}>
      <SortableContext items={games.map((game) => game.slug)} strategy={rectSortingStrategy}>
        <GameBoxContainer>
          {games.map((game) => (
            <DraggableGameBox key={game.slug} game={game} platform={platform} />
          ))}
          <DragOverlay>{draggingInd !== null && <GameBox game={games[draggingInd]} platform={platform} />}</DragOverlay>
        </GameBoxContainer>
      </SortableContext>
    </DndContext>
  );
}
