import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EEbaySortOrder } from 'Backend/types';
import { IRootState } from 'Store/types';

import { OvalSpinner, Slider } from 'Components/UI';
import { EbayLogo } from 'Components/UI/LogoSvg';
import { TPlatformNames } from 'Configs/appConfig';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { selectEbayCard } from 'Store/ebayItemsReducer/selectors';
import { getEbaySingleItemByIndex } from 'Store/ebayItemsReducer/thunks';

import { EbayCardDesc } from './components';

import styles from './EbayItemCard.module.scss';

interface IEbayItemCardProps {
  game: string;
  index: number;
  isVisible: boolean;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

export function EbayItemCard(props: IEbayItemCardProps): JSX.Element {
  const dispatch = useDispatch();
  const { index, isVisible, platform, game, sortOrder = EEbaySortOrder.Relevance } = props;
  const isMobile = useSelector(selectIsMobile);
  const card = useSelector((state: IRootState) => selectEbayCard(state, { game, index, platform, sortOrder }));
  const itemData = card?.itemData;

  useEffect(() => {
    if (!isVisible) return;

    dispatch(getEbaySingleItemByIndex(platform, game, index, sortOrder));
  }, [index, isVisible, platform, game, dispatch]);

  return (
    <div className={styles.EbayItemCard}>
      {card && itemData && (
        <>
          <div className={styles.ImgArea}>
            <Slider
              transition='off'
              images={[...itemData.pictures]}
              imageWidth={isMobile ? MOBILE_DIMENSIONS.width : DESKTOP_DIMENSIONS.width}
              imageHeight={isMobile ? MOBILE_DIMENSIONS.height : DESKTOP_DIMENSIONS.height}
              navDots
              imgFit={'cover'}
            />
            <a className={styles.SvgWrapper} href={itemData.itemUrl} rel='noopener noreferrer' target='_blank'>
              <EbayLogo />
            </a>
          </div>
          <EbayCardDesc {...props} card={card} index={index} />
        </>
      )}
      {!itemData && (
        <div className={styles.CardSpinner}>
          <OvalSpinner />
        </div>
      )}
    </div>
  );
}

const MOBILE_DIMENSIONS = {
  height: 190,
  width: 150,
};

const DESKTOP_DIMENSIONS = {
  height: 220,
  width: 200,
};
