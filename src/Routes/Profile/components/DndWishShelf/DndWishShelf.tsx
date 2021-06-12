import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import arrayMove from 'array-move';

import { IProfileGame } from 'Routes/Profile/reducer/types';
import { DeepReadonly } from 'utility-types';

import {
  closestCenter,
  DndContext,
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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { reorderGamesThunk } from 'Routes/Profile/reducer/thunks';

interface IDndShelfProps {
  games: DeepReadonly<IProfileGame[]>;
  list: EAvailableLists;
  platform: TPlatformNames;
}

export function DndWishShelf(props: IDndShelfProps): JSX.Element {
  const { games } = props;
  const [draggingInd, setDraggingInd] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 0 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 0 },
    }),
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

  return (
    <DndContext
      onDragEnd={() => console.log('end')}
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragStart={onDragStart}
    >
      <SortableContext items={games.map((game) => game.slug)} strategy={horizontalListSortingStrategy}>
        {games.map((game, ind) => (
          <FakeElm key={game.name} game={game} ind={ind} />
        ))}
      </SortableContext>
      {createPortal(
        draggingInd ? (
          <DragOverlay adjustScale={false}>
            <FakeElm key={'sdf'} game={games[draggingInd]} ind={draggingInd} />
          </DragOverlay>
        ) : null,
        document.body
      )}
    </DndContext>
  );
}

const FakeElm = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.game.slug,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || '',
  };

  console.log(transform);

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'lightgray',
          color: 'black',
          display: 'flex',
          height: 300,
          justifyContent: 'center',
          margin: 10,
          width: props.ind * 20 + 50,
        }}
      >
        {props.ind}
      </div>
    </div>
  );
};
