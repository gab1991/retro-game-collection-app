import React from 'react';
import { useSelector } from 'react-redux';
import { EbaySwiper } from 'Components';

import { ChevronSvg, EscSvg } from 'Components/UI/Svg';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { selectEbaySection } from 'Routes/GameDetailed/reducer/selectors';

import styles from './EbaySection.module.scss';

export function EbaySection(): JSX.Element {
  const { gameDetails, platform, toggleBlockVisibilty } = useGameDetailedContext();
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
          {ebaySection.show ? <EscSvg /> : <ChevronSvg className={styles.ChevronSvg} />}
        </div>
        <hr></hr>
      </div>
      {gameDetails && ebaySection.show && (
        <EbaySwiper platform={platform} gameName={gameDetails.name} className={styles.EbaySectionContent} />
      )}
    </div>
  );
}
