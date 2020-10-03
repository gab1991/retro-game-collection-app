import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { getEbayItems } from '../../../Store/Actions/gameDetailedActions';
import EbaySwiper from './EbaySwiper/EbaySwiper';
import DotSpinner from '../../UI/LoadingSpinners/DotSpinner/DotSpinner';
import sliderArrow from '../../../Assets/images/ui/slider-arrow-left.svg';
import styles from './EbaySection.module.scss';

function EbaySection(props) {
  const { game, platform, isMobile, ebayItems, isLoading } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEbayItems(platform, game));
  }, [platform, game]);

  const swiperProps = {
    swiperOptions: {
      slidesPerView: 'auto',
      spaceBetween: 15,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    },
    navigation: isMobile ? false : true,

    prevButton: () => (
      <div className="swiper-button-prev">
        <img src={sliderArrow} alt="prev-btn" />
      </div>
    ),
    nextButton: () => (
      <div className="swiper-button-next">
        <img
          src={sliderArrow}
          alt="prev-btn"
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>
    ),
  };

  return (
    <div className={styles.EbaySection}>
      {!isLoading && ebayItems.length > 0 && (
        <EbaySwiper
          platform={platform}
          game={game}
          itemsToShow={ebayItems}
          swiperProps={swiperProps}
          numToShow={4}
        />
      )}
      {!isLoading && ebayItems.length === 0 && (
        <div className={styles.NoItems}>
          <h1>No lots have been found</h1>
        </div>
      )}
      {isLoading && (
        <div className={styles.LoadingSpinner}>
          <div className={styles.LoadingSvgWrapper}>
            <DotSpinner />
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.gameDetailed.uploadableElms.ebaySection.isLoading,
    ebayItems: state.gameDetailed.uploadableElms.ebaySection.items,
  };
}

export default connect(mapStateToProps)(EbaySection);
