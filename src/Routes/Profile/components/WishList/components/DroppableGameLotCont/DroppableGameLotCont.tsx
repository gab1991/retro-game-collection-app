import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { GameLotContainer, IGameLotContainerProps } from '../GameLotContainer';
import { TPlatformNames } from 'Configs/appConfig';

interface IDroppableGameBoxContainer extends IGameLotContainerProps {
  platform: TPlatformNames;
}

export function DroppableGameLotCont(props: IDroppableGameBoxContainer): JSX.Element {
  return (
    <Droppable droppableId={props.platform} direction={'horizontal'}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <GameLotContainer>
            {props.children}
            {provided.placeholder}
          </GameLotContainer>
        </div>
      )}
    </Droppable>
  );
}
