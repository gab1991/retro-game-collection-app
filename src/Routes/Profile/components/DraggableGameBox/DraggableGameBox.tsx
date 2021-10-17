import React from 'react';
import cn from 'classnames';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GameBox, IGameBoxProps } from 'Routes/Profile/components/GameBox';

import styles from './DraggableGameBox.module.scss';

type TDraggableGameBox = IGameBoxProps;

export function DraggableGameBox(props: TDraggableGameBox): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: props.game.slug,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || '',
  };

  const onDrag: React.DragEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn({ [styles.SortableContDragging]: isDragging })}
    >
      <GameBox
        {...props}
        className={cn({ [styles.Dragging]: isDragging, [styles.Sorting]: isSorting })}
        onDragStart={onDrag}
      />
    </div>
  );
}
