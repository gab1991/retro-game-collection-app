import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { getEbayItems } from '../../../Store/Actions/gameDetailedActions';
import EbayItemCard from '../EbaySection/EbayItemCard/EbayItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Lazy } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/lazy/lazy.scss';
import 'swiper/components/pagination/pagination.scss';
import './EbaySectionSwiper.scss';
import DotSpinner from '../../UI/LoadingSpinners/DotSpinner/DotSpinner';
import styles from './EbaySection.module.scss';

SwiperCore.use([Navigation, Pagination, Lazy]);

function EbaySection(props) {
  const { game, platform, ebayItems, isLoading } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEbayItems(platform, game));
  }, [platform, game]);

  return (
    <div className={styles.EbaySection}>
      <Swiper
        className={`${isLoading ? styles.SwiperHidden : ''} ${styles.Swiper}`}
        spaceBetween={15}
        slidesPerView={'auto'}
        watchSlidesVisibility
        navigation
        pagination={{
          clickable: true,
          dynamicMainBullets: true,
          dynamicBullets: 4,
        }}>
        {ebayItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isVisible }) => (
              <EbayItemCard
                platform={platform}
                game={game}
                isVisible={isVisible}
                index={index}></EbayItemCard>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
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
  };
}

export default connect(mapStateToProps)(EbaySection);
