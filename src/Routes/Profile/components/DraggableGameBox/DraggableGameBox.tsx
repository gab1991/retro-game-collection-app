import React from 'react';
import cn from 'classnames';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GameBox, IGameBoxProps } from 'Routes/Profile/components/GameBox';

import styles from './DraggableGameBox.module.scss';

interface IDraggableGameBox extends IGameBoxProps {
  index?: number;
}

export function DraggableGameBox(props: IDraggableGameBox): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.game.slug });

  // console.log(isDragging, props.game.slug);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || '',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <GameBox {...props} className={cn({ [styles.Dragging]: isDragging })} />
    </div>
  );
}
