import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { EbayLotSection, IEbayLotSectionProps } from '../EbayLotSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SixDots } from 'Components/UI/Svg';
import { EAvailableLists } from 'Configs/appConfig';
import { removeGame } from 'Routes/GameDetailed/reducer/thunks';

import estyles from '../EbayLotSection/EbayLotSection.module.scss';
import styles from './DraggableEbatLotSection.module.scss';

type TDraggableEbayLotSectionProps = IEbayLotSectionProps;

export function DraggableEbayLotSection(props: TDraggableEbayLotSectionProps): JSX.Element {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: props.game.slug,
  });
  const [removing, setRemoving] = useState(false);

  const removeFromWishHandler = () => {
    setRemoving(true);
  };

  const removeOnAnimtaionEnd = () => {
    dispatch(removeGame(props.game.name, EAvailableLists.wishList, props.platform));
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || '',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn({ [styles.SortableContDragging]: isDragging }, { [styles.Removing]: removing })}
      onAnimationEnd={removeOnAnimtaionEnd}
    >
      <EbayLotSection
        {...props}
        className={cn({ [styles.Dragging]: isDragging, [styles.Sorting]: isSorting })}
        onRemoveModalConfirm={removeFromWishHandler}
      >
        <SixDots className={cn(estyles.sixDotsSvg)} {...listeners} {...attributes} />
      </EbayLotSection>
    </div>
  );
}
