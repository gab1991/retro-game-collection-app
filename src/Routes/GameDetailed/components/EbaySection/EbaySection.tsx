import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EbaySwiper } from 'Components';

import { isToggleableElms } from 'Store/gameDetailedReducer/types';

import { ArrowEsc } from 'Components/UI/LogoSvg';
import { TPlatformNames } from 'Configs/appConfig';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { toggleElmVisibility } from 'Store/gameDetailedReducer/actions';
import { selectEbaySection, selectGameDetails } from 'Store/gameDetailedReducer/selectors';

import styles from './EbaySection.module.scss';

export function EbaySection(): JSX.Element {
  const isMobile = useSelector(selectIsMobile);
  const { ebaySection } = useSelector(selectEbaySection);
  const gameDetails = useSelector(selectGameDetails);
  const { platformName } = useParams<{ platformName: TPlatformNames }>();
  const dispatch = useDispatch();

  const toggleBlockVisibilty = (e: SyntheticEvent) => {
    const elm = e.currentTarget.getAttribute('data-elm');
    // analyze later
    if (elm && isToggleableElms(elm)) {
      dispatch(toggleElmVisibility(elm));
    }
  };

  return (
    <div className={styles.EbaySection}>
      <div
        tabIndex={0}
        role='button'
        className={styles.EbayLabel}
        data-elm='ebaySection'
        onClick={toggleBlockVisibilty}
        onKeyPress={toggleBlockVisibilty}
      >
        <h2>Ebay Offers</h2>
        {isMobile && (
          <div className={styles.DropDownSvgContainer}>
            <ArrowEsc arrow={!ebaySection.show} />
          </div>
        )}
        <hr></hr>
      </div>
      {gameDetails && ebaySection.show && (
        <EbaySwiper
          platform={platformName}
          game={gameDetails.name}
          isLoading={ebaySection.isLoading}
          className={styles.EbaySectionContent}
        />
      )}
    </div>
  );
}
