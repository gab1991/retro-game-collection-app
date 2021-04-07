import React from 'react';
import cn from 'classnames';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { formSortableId } from 'Routes/Profile/components/CollictionList/sortableHelpers';
import { GameBox, IGameBoxProps } from 'Routes/Profile/components/GameBox';

import styles from './DraggableGameBox.module.scss';

interface IDraggableGameBox extends IGameBoxProps {
  index?: number;
}

export function DraggableGameBox(props: IDraggableGameBox): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, over } = useSortable({
    id: formSortableId(props.platform, props.game.slug),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || '',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn({ [styles.SortableContDragging]: isDragging })}
    >
      <GameBox {...props} className={cn({ [styles.Dragging]: isDragging })} />
    </div>
  );
}
