import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.css';
import _ from 'underscore';
import { diff } from 'semver';

export default function Slider(props) {
  const { images } = props;
  const sliderContainer = useRef();
  const [currentImg, setCurrentImg] = useState(0);
  const [btnOpcatity, setBtnOpcaticy] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const mouseStatsRef = useRef({ offset: 0, initialX: null });

  const transitionCss = {
    transition: `transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275`
  };

  const onClickHandler = e => {
    console.log('there');
    const curAtrb = e.target.getAttribute('desc');
    if (curAtrb === 'prev') {
      if (currentImg === 0) {
        setCurrentImg(images.length - 1);
      } else setCurrentImg(currentImg - 1);
    }
    if (curAtrb === 'next') {
      if (currentImg === images.length - 1) {
        setCurrentImg(0);
      } else setCurrentImg(currentImg + 1);
    }
  };

  const enterHandler = () => {
    setBtnOpcaticy(1);
  };

  const leaveHandler = () => {
    setIsDown(false);
    setBtnOpcaticy(0);
  };

  const dragHandler = e => {
    if (!isDown) {
      return;
    }

    let currentOffset = e.clientX - mouseStatsRef.current.initialX;

    mouseStatsRef.current.initialX = e.clientX;
    mouseStatsRef.current.offset += currentOffset;

    sliderContainer.current.style.transform = `translateX(${mouseStatsRef.current.offset}px)`;
  };

  const mouseDownHandler = e => {
    if (e.target.tagName === 'BUTTON') return;
    setIsDown(true);
    mouseStatsRef.current.initialX = e.clientX;
  };

  const mouseUpHandler = e => {
    setIsDown(false);
  };

  return (
    <div
      className={styles.Slider}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      onMouseDown={mouseDownHandler}
      onMouseMove={dragHandler}
      onMouseUp={mouseUpHandler}>
      <div
        ref={sliderContainer}
        className={styles.Images}
        style={{
          transform: `translateX(-${currentImg * (100 / images.length)}%)`,
          transition: `${!isDown ? transitionCss.transition : null}`
        }}>
        {images &&
          images.map((image, index) => (
            <div
              className={index === currentImg ? styles.Active : null}
              key={index}>
              <img draggable="false" src={image}></img>
            </div>
          ))}
      </div>
      <button
        style={{
          opacity: btnOpcatity ? '1' : null,
          display: isDown ? 'none' : 'block'
        }}
        className={styles.PrevButton}
        desc="prev"
        onClick={onClickHandler}>
        {'<'}
      </button>
      <button
        style={{
          opacity: btnOpcatity ? '1' : null,
          display: isDown ? 'none' : 'block'
        }}
        className={styles.NextButton}
        desc="next"
        onClick={onClickHandler}>
        {'>'}
      </button>
    </div>
  );
}
