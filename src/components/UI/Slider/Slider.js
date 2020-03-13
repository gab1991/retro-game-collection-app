import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.css';

export default function Slider(props) {
  const { images } = props;
  const imageWidth = 300;
  const sliderContainer = useRef();
  const [currentImg, setCurrentImg] = useState(0);
  const [btnOpcatity, setBtnOpcaticy] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const mouseStatsRef = useRef({
    offset: 0,
    initialX: null,
    initialOffset: null
  });
  const [activeClass, setActiveClass] = useState(0);

  const transitionCss = {
    transition: `transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275`
  };
  useEffect(() => {
    mouseStatsRef.current.offset = -currentImg * imageWidth;
    setActiveClass(currentImg);
  }, [currentImg]);

  const onClickHandler = e => {
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

    console.log(sliderContainer.current.getBoundingClientRect().x - imageWidth);
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

    let classCalc = -Math.floor(mouseStatsRef.current.offset / imageWidth);

    if (classCalc < 0) {
      setActiveClass(0);
    } else if (classCalc > images.length - 1) {
      setActiveClass(images.length - 1);
    } else if (classCalc < 0) {
      setActiveClass(0);
    } else {
      setActiveClass(classCalc);
    }
  };

  const mouseDownHandler = e => {
    if (e.target.tagName === 'BUTTON') return;
    setIsDown(true);
    mouseStatsRef.current.initialX = e.clientX;
    mouseStatsRef.current.initialOffset = mouseStatsRef.current.offset;
  };

  const mouseUpHandler = e => {
    setCurrentImg(activeClass);
    setIsDown(false);

    sliderContainer.current.style.transform = `translateX(-${(1800 /
      images.length) *
      currentImg}px)`;
  };

  // console.log(
  //   { ...mouseStatsRef.current },
  //   sliderContainer.current.getBoundingClientRect()
  // );
  console.log(currentImg, activeClass);

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
          transform: `translateX(-${(1800 / images.length) * currentImg}px)`,
          transition: `${!isDown ? transitionCss.transition : null}`
        }}>
        {images &&
          images.map((image, index) => (
            <div
              className={index === activeClass ? styles.Active : null}
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
