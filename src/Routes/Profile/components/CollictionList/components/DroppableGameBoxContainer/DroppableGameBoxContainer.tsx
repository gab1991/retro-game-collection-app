import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { TPlatformNames } from 'Configs/appConfig';
import {
  GameBoxContainer,
  IGameBoxContainerProps,
} from 'Routes/Profile/components/CollictionList/components/GameBoxContainer';

interface IDroppableGameBoxContainer extends IGameBoxContainerProps {
  platform: TPlatformNames;
}

export function DroppableGameBoxContainer(props: IDroppableGameBoxContainer): JSX.Element {
  return (
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
  );
}
