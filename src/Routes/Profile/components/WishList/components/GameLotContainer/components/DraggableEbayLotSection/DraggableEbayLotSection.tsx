import React from 'react';
import cn from 'classnames';

import { EbayLotSection, IEbayLotSectionProps } from '../EbayLotSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './DraggableEbatLotSection.module.scss';

type TDraggableEbayLotSectionProps = IEbayLotSectionProps;

export function DraggableEbayLotSection(props: TDraggableEbayLotSectionProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: props.game.slug,
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
      <EbayLotSection {...props} className={cn({ [styles.Dragging]: isDragging, [styles.Sorting]: isSorting })} />
    </div>
  );
}
