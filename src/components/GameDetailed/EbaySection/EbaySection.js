import React, { useState, useEffect } from 'react';
import styles from './EbaySection.module.scss';
import Backend from '../../../Backend/Backend';
import EbayItemCard from '../EbaySection/EbayItemCard/EbayItemCard';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';

export default function EbaySection(props) {
  const { platform, game, uploadNum = 4 } = props;
  const [ebayItems, setEbayItems] = useState();
  const [showedItems, setShowedItems] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [counter, setCounter] = useState({
    current: 0,
    initial: uploadNum,
    last: null,
  });

  useEffect(() => {
    Backend.getEbayItems(platform, game).then((res) => {
      setEbayItems(res[0].item);
    });
  }, []);

  useEffect(() => {
    if (ebayItems) {
      fillShowedItems(counter.current, counter.initial);
    }
  }, [ebayItems]);

  const fillShowedItems = (current, numToAdd) => {
    if (current === counter.last) return;

    let updShowedItems = [...showedItems];
    for (let i = current; i < current + numToAdd; i++) {
      updShowedItems.push(ebayItems[i]);
    }
    let updCounter = { ...counter };
    updCounter.current = current + numToAdd;
    updCounter.last = ebayItems.length;
    setCounter({ ...updCounter });

    setShowedItems(updShowedItems);
  };

  const appendSlide = (swiper) => {
    let newlIndex = swiper.realIndex;

    if (swiperIndex < newlIndex) {
      fillShowedItems(counter.current, 1);
      setSwiperIndex(newlIndex);
    }
  };
  const SliderSettings = {
    slidesPerView: 'auto',
    spaceBetween: 15,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    // containerModifierClass: ,
  };

  return (
    <div className={styles.EbaySection} atr={'kek'}>
      <Swiper swiperOptions={{ ...SliderSettings }} navigation={false}>
        {showedItems &&
          showedItems.map((item, index) =>
            item ? (
              <Slide onActive={(swiper) => appendSlide(swiper)} key={index}>
                <EbayItemCard itemId={item.itemId} />
              </Slide>
            ) : null
          )}
      </Swiper>
    </div>
  );
}
