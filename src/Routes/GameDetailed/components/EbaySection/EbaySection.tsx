import React from 'react';
import { useSelector } from 'react-redux';
import { EbaySwiper } from 'Components';

import { ArrowEsc } from 'Components/UI/LogoSvg';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { selectEbaySection } from 'Routes/GameDetailed/gameDetailedReducer/selectors';

import styles from './EbaySection.module.scss';

export function EbaySection(): JSX.Element {
  const { gameDetails, platformName, toggleBlockVisibilty } = useGameDetailedContext();
  const { ebaySection } = useSelector(selectEbaySection);

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
        <div className={styles.DropDownSvgContainer}>
          <ArrowEsc arrow={!ebaySection.show} />
        </div>
        <hr></hr>
      </div>
      {gameDetails && ebaySection.show && (
        <EbaySwiper
          platform={platformName}
          gameName={gameDetails.name}
          isLoading={ebaySection.isLoading}
          className={styles.EbaySectionContent}
        />
      )}
    </div>
  );
}
