import React from 'react';

// import { Droppable } from 'react-beautiful-dnd';
import { useDroppable } from '@dnd-kit/core';
import { TPlatformNames } from 'Configs/appConfig';
import {
  GameBoxContainer,
  IGameBoxContainerProps,
} from 'Routes/Profile/components/CollictionList/components/GameBoxContainer';

interface IDroppableGameBoxContainer extends IGameBoxContainerProps {
  platform: TPlatformNames;
}

export function DroppableGameBoxContainer(props: IDroppableGameBoxContainer): JSX.Element {
  const { setNodeRef } = useDroppable({ id: props.platform });

  return (
    <div ref={setNodeRef}>
      <GameBoxContainer>{props.children}</GameBoxContainer>
    </div>
  );
}
