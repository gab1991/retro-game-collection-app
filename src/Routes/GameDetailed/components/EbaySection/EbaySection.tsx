import React from 'react';
import { useSelector } from 'react-redux';
import { EbaySwiper } from 'Components';

import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { selectEbaySection } from 'Routes/GameDetailed/reducer/selectors';

import styles from './EbaySection.module.scss';

import { SectionHeader } from '..';

export function EbaySection(): JSX.Element {
  const { gameDetails, platform, toggleBlockVisibilty } = useGameDetailedContext();
  const { ebaySection } = useSelector(selectEbaySection);

  return (
    <div className={styles.EbaySection}>
      <SectionHeader
        isOpen={ebaySection.show}
        onClick={toggleBlockVisibilty}
        className={styles.EbayOffersBtn}
        data-elm='ebaySection'
      >
        Ebay Offers
      </SectionHeader>
      {gameDetails && ebaySection.show && (
        <EbaySwiper platform={platform} gameName={gameDetails.name} className={styles.EbaySectionContent} />
      )}
    </div>
  );
}
