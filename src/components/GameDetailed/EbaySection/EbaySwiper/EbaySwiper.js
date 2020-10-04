import React, { useState, useEffect, useRef } from 'react';
import EbayItemCard from '../../EbaySection/EbayItemCard/EbayItemCard';
import Swiper from '../../../UI/SwiperConfigured/SwiperConfigured';

export default function EbaySwiper(props) {
  const {
    platform,
    game,
    numToShow = 1,
    itemsToShow,
    stopWatchCallBack,
    swiperProps,
  } = props;
  const [showedItems, setShowedItems] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const counterInitial = {
    current: 0,
    initial: numToShow,
    last: null,
  };
  const counter = useRef(counterInitial);

  useEffect(() => {
    if (itemsToShow) {
      fillShowedItems(counter.current.current, counter.current.initial, true);
    }
  }, [itemsToShow]);

  const fillShowedItems = (current, numToAdd, initialFill) => {
    if (initialFill) {
      counter.current = counterInitial;
      current = 0;
      numToAdd = counterInitial.initial;
    }
    if (current === counter.current.last) return;
    let updShowedItems = initialFill ? [] : [...showedItems];
    for (let i = current; i < current + numToAdd; i++) {
      if (itemsToShow[i])
        updShowedItems.push(
          <EbayItemCard
            platform={platform}
            game={game}
            stopWatchCallBack={stopWatchCallBack}
            itemId={itemsToShow[i].itemId[0]}
          />
        );
    }
    let updCounter = { ...counter.current };
    updCounter.current = current + numToAdd;
    updCounter.last = itemsToShow.length;
    counter.current = { ...updCounter };

    setShowedItems(updShowedItems);
  };

  const appendSlide = (swiper) => {
    let newlIndex = swiper.realIndex;

    if (swiperIndex < newlIndex) {
      fillShowedItems(counter.current.current, 1);
      setSwiperIndex(newlIndex);
    }
  };

  return (
    <Swiper
      customSwiperProps={swiperProps}
      reactElms={showedItems}
      onActive={(swiper) => {
        appendSlide(swiper);
      }}
    />
  );
}
