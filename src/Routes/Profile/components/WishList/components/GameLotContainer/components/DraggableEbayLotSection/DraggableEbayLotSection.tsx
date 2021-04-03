import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { EbayLotSection, IEbayLotSectionProps } from '../EbayLotSection';

interface IDraggableEbayLotSectionProps extends IEbayLotSectionProps {
  index: number;
}

export function DraggableEbayLotSection(props: IDraggableEbayLotSectionProps): JSX.Element {
  const { index, ...gameLotProps } = props;

  return (
    <Draggable draggableId={props.game.slug} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <EbayLotSection {...gameLotProps} />
        </div>
      )}
    </Draggable>
  );
}
