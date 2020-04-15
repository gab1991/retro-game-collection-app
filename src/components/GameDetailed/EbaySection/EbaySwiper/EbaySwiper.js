import React, { useState, useEffect, useRef } from 'react';
import EbayItemCard from '../../EbaySection/EbayItemCard/EbayItemCard';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';

export default function EbaySwiper(props) {
  const { platform, game, numToShow = 1, itemsToShow, swiperProps } = props;
  const [showedItems, setShowedItems] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const counterInitial = {
    current: 0,
    initial: numToShow,
    last: null,
  };
  const counter = useRef(counterInitial);

  console.log({ itemsToShow });
  useEffect(() => {
    if (itemsToShow) {
      counter.current = counterInitial;
      fillShowedItems(counter.current.current, counter.current.initial, true);
      console.log({ itemsToShow }, counter.current);
    }
  }, [itemsToShow]);

  const fillShowedItems = (current, numToAdd, initialFill) => {
    if (current === counter.current.last) return;

    let updShowedItems = initialFill ? [] : [...showedItems];
    for (let i = current; i < current + numToAdd; i++) {
      if (itemsToShow[i]) updShowedItems.push(itemsToShow[i]);
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

  const addEbayCardToWishList = (itemId) => {
    console.log(platform, game, itemId);
  };

  return (
    <Swiper {...swiperProps}>
      {showedItems &&
        showedItems.map((item, index) =>
          item ? (
            <Slide onActive={(swiper) => appendSlide(swiper)} key={index}>
              <EbayItemCard
                platform={platform}
                game={game}
                itemId={item.itemId[0]}
                addToWish={addEbayCardToWishList}
              />
            </Slide>
          ) : null
        )}
    </Swiper>
  );
}
