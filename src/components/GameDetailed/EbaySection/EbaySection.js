import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { getEbayItems } from '../../../Store/Actions/gameDetailedActions';
import SwiperConfigured from '../../UI/SwiperConfigured/SwiperConfigured';
import EbayItemCard from '../EbaySection/EbayItemCard/EbayItemCard';
import DotSpinner from '../../UI/LoadingSpinners/DotSpinner/DotSpinner';
import styles from './EbaySection.module.scss';

function EbaySection(props) {
  const { game, platform, ebayItems, isLoading, isMobile } = props;
  const [slides, setSlides] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEbayItems(platform, game));
  }, [platform, game, dispatch]);

  useEffect(() => {
    setSlides(
      ebayItems.map((item, index) => ({ isVisible }) => (
        <EbayItemCard
          platform={platform}
          game={game}
          isVisible={isVisible}
          index={index}></EbayItemCard>
      ))
    );
  }, [ebayItems, game, platform]);

  return (
    <div className={styles.EbaySection}>
      <SwiperConfigured
        className={`${isLoading ? styles.SwiperHidden : ''} ${styles.Swiper}`}
        slides={slides}
        isMobile={isMobile}
      />
      {!isLoading && ebayItems.length === 0 && (
        <h3 className={styles.NoItems}>No lots have been found</h3>
      )}
      {isLoading && (
        <div className={styles.LoadingSvgWrapper}>
          <DotSpinner />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.gameDetailed.uploadableElms.ebaySection.isLoading,
    ebayItems: state.ebayItems,
    isMobile: state.appState.isMobile,
  };
}

export default connect(mapStateToProps)(EbaySection);
