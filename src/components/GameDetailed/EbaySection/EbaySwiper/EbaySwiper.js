import React, { useState, useEffect } from 'react';
import EbayItemCard from '../../EbaySection/EbayItemCard/EbayItemCard';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';

export default function EbaySwiper(props) {
  const { platform, game, numToShow = 1, itemsToShow, swiperProps } = props;
  const [showedItems, setShowedItems] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [counter, setCounter] = useState({
    current: 0,
    initial: numToShow,
    last: null,
  });

  useEffect(() => {
    if (itemsToShow) {
      fillShowedItems(counter.current, counter.initial);
    }
  }, [itemsToShow]);

  const fillShowedItems = (current, numToAdd) => {
    if (current === counter.last) return;

    let updShowedItems = [...showedItems];
    for (let i = current; i < current + numToAdd; i++) {
      if (itemsToShow[i]) updShowedItems.push(itemsToShow[i]);
    }
    let updCounter = { ...counter };
    updCounter.current = current + numToAdd;
    updCounter.last = itemsToShow.length;
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
                itemId={item.itemId}
                addToWish={addEbayCardToWishList}
              />
            </Slide>
          ) : null
        )}
    </Swiper>
  );
}
