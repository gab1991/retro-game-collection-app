import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { GameBox, IGameBoxProps } from 'Routes/Profile/components/GameBox';

interface IDraggableGameBox extends IGameBoxProps {
  index: number;
}

export function DraggableGameBox(props: IDraggableGameBox): JSX.Element {
  const { index, ...gameBoxProps } = props;

  return (
    <Draggable draggableId={props.game.slug} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <GameBox {...gameBoxProps} />
        </div>
      )}
    </Draggable>
  );
}
