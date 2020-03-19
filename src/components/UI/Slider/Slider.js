import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.css';
import sliderArrow from '../../../assets/images/ui/slider-arrow-left.svg';

export default function Slider(props) {
  const { images } = props;
  const imageWidth = props.imageWidth || 300;
  const totalWith = imageWidth * images.length;
  const sliderContainer = useRef();
  const [currentImg, setCurrentImg] = useState(0);
  const [activeClass, setActiveClass] = useState(0);
  const [btnOpcatity, setBtnOpcaticy] = useState(0);
  const [clickedClassPrev, setClickedClassPrev] = useState(false);
  const [clickedClassNext, setClickedClassNext] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const mouseStatsRef = useRef({
    offset: 0,
    initialX: null,
    initialOffset: null
  });

  const setToCurrent = () => {
    console.log('setting', currentImg);
    sliderContainer.current.style.transform = `translateX(-${(totalWith /
      images.length) *
      currentImg}px)`;
  };

  const transitionCss = {
    transition: `transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275`
  };
  useEffect(() => {
    mouseStatsRef.current.offset = -currentImg * imageWidth;
    setActiveClass(currentImg);
  }, [currentImg, imageWidth]);

  const onClickHandler = e => {
    const curAtrb = e.target.getAttribute('desc');
    if (curAtrb === 'prev') {
      if (currentImg === 0) {
        setCurrentImg(images.length - 1);
      } else setCurrentImg(currentImg - 1);
      setClickedClassPrev(true);
    }
    if (curAtrb === 'next') {
      if (currentImg === images.length - 1) {
        setCurrentImg(0);
      } else setCurrentImg(currentImg + 1);
      setClickedClassNext(true);
    }
  };

  const enterHandler = () => {
    setBtnOpcaticy(1);
  };

  const leaveHandler = () => {
    setIsDown(false);
    setBtnOpcaticy(0);
    setToCurrent();
  };

  const dragHandler = e => {
    if (!isDown) {
      return;
    }
    let currentOffset = e.clientX - mouseStatsRef.current.initialX;

    mouseStatsRef.current.initialX = e.clientX;
    mouseStatsRef.current.offset += currentOffset;

    sliderContainer.current.style.transform = `translateX(${mouseStatsRef.current.offset}px)`;

    let activeClassCalc = -Math.floor(
      mouseStatsRef.current.offset / imageWidth
    );

    if (activeClassCalc < 0) {
      setActiveClass(0);
    } else if (activeClassCalc > images.length - 1) {
      setActiveClass(images.length - 1);
    } else if (activeClassCalc < 0) {
      setActiveClass(0);
    } else {
      setActiveClass(activeClassCalc);
    }
  };

  const mouseDownHandler = e => {
    if (e.target.getAttribute('desc')) return;
    setIsDown(true);
    mouseStatsRef.current.initialX = e.clientX;
    mouseStatsRef.current.initialOffset = mouseStatsRef.current.offset;
  };

  const mouseUpHandler = e => {
    setCurrentImg(activeClass);

    setIsDown(false);
    setToCurrent();
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
          transform: `translateX(-${(totalWith / images.length) *
            currentImg}px)`,
          transition: `${!isDown ? transitionCss.transition : null}`
        }}>
        {images &&
          images.map((image, index) => (
            <div
              className={index === activeClass ? styles.Active : null}
              key={index}
              style={{ width: imageWidth }}>
              <img draggable="false" src={image} alt="Screenshot"></img>
            </div>
          ))}
      </div>
      <button
        style={{
          opacity: btnOpcatity ? '1' : null,
          display: isDown ? 'none' : 'block'
        }}
        className={`${styles.PrevButton} ${styles.Btn}`}
        desc="prev"
        onClick={onClickHandler}>
        <img
          src={sliderArrow}
          alt="arrowImg"
          desc="prev"
          onAnimationEnd={() => setClickedClassPrev(false)}
          className={clickedClassPrev ? styles.BtnClicked : null}
        />
      </button>

      <button
        style={{
          opacity: btnOpcatity ? '1' : null,
          display: isDown ? 'none' : 'block'
        }}
        className={`${styles.NextButton} ${styles.Btn}`}
        desc="next"
        onClick={onClickHandler}>
        <img
          src={sliderArrow}
          alt="arrowImg"
          desc="next"
          style={{ transform: `rotate(180deg)` }}
          onAnimationEnd={() => setClickedClassNext(false)}
          className={clickedClassNext ? styles.BtnClicked180 : null}
        />
      </button>
    </div>
  );
}