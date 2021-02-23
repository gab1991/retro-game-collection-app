import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { IRootState } from 'Store/types';

import EbayCardDesc from './EbayCardDescr/EbayCardDesc';
import { OvalSpinner, Slider } from 'Components/UI';
import { EbayLogo } from 'Components/UI/LogoSvg';
import { selectEbayCard } from 'Store/ebayItemsReducer/selectors';
import { getEbaySingleItemByIndex } from 'Store/ebayItemsReducer/thunks';

import styles from './EbayItemCard.module.scss';

function EbayItemCard(props) {
  const dispatch = useDispatch();
  const { isMobile, index, isVisible, platform, game, sortOrder = 'BestMatch' } = props;
  const card = useSelector((state: IRootState) => selectEbayCard(state, { game, index, platform, sortOrder }));
  const itemData = card?.itemData;
  // const { itemId } = itemData || {};

  // console.log({ ...props });
  console.log({ card });

  useEffect(() => {
    if (!isVisible) return;
    dispatch(getEbaySingleItemByIndex(platform, game, index, sortOrder));
  }, [index, isVisible, platform, game, dispatch]);

  return (
    <div className={styles.EbayItemCard}>
      {itemData && (
        <>
          <div className={styles.ImgArea}>
            <Slider
              transition='off'
              images={[...itemData.pictures]}
              imageWidth={isMobile ? 150 : 200}
              imageHeight={isMobile ? 190 : 220}
              navDots
              imgFit={'cover'}
            />
            <a className={styles.SvgWrapper} href={itemData.itemUrl} rel='noopener noreferrer' target='_blank'>
              <EbayLogo />
            </a>
          </div>
          <EbayCardDesc {...props} {...itemData} {...card} index={index} itemId={itemData.itemId} />
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

function mapStateToProps(state) {
  return {
    isMobile: state.appState.isMobile,
  };
}

export default connect(mapStateToProps)(EbayItemCard);
