import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import arrayMove from 'array-move';

import { TPlatformNames } from 'Configs/appConfig';
import {
  GameBoxContainer,
  IGameBoxContainerProps,
} from 'Routes/Profile/components/CollictionList/components/GameBoxContainer';

interface IDroppableGameBoxContainer extends IGameBoxContainerProps {
  platform: TPlatformNames;
}

export function DroppableGameBoxContainer(props: IDroppableGameBoxContainer): JSX.Element {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={props.platform} direction={'horizontal'}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <GameBoxContainer>
              {props.children}
              {provided.placeholder}
            </GameBoxContainer>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
