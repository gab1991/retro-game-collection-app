import React from 'react';
import cn from 'classnames';

import { EbayLotSection, IEbayLotSectionProps } from '../EbayLotSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SixDots } from 'Components/UI/LogoSvg';

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
    <div ref={setNodeRef} style={style} className={cn({ [styles.SortableContDragging]: isDragging })}>
      <EbayLotSection {...props} className={cn({ [styles.Dragging]: isDragging, [styles.Sorting]: isSorting })}>
        <EbayLotSection.Controls className={cn(styles.Controls)}>
          <SixDots className={cn(styles.DragHandle)} {...listeners} {...attributes} />
        </EbayLotSection.Controls>
      </EbayLotSection>
    </div>
  );
}
