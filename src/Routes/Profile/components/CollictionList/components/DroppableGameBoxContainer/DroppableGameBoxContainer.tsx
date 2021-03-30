import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { TPlatformNames } from 'Configs/appConfig';
import {
  GameBoxContainer,
  IGameBoxContainerProps,
} from 'Routes/Profile/components/CollictionList/components/GameBoxContainer';

interface IDroppableGameBoxContainer extends IGameBoxContainerProps {
  platform: TPlatformNames;
}

export function DroppableGameBoxContainer(props: IDroppableGameBoxContainer): JSX.Element {
  const onDragEnd = () => {
    console.log('drag end');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GameBoxContainer>
        <Droppable droppableId={props.platform}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </GameBoxContainer>
    </DragDropContext>
  );
}
