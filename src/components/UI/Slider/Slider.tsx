import React, { useEffect, useRef, useState } from 'react';

import sliderArrow from '../../../Assets/images/ui/slider-arrow-left.svg';
import { Property } from 'csstype/index.d';

import styles from './Slider.module.scss';

const DEFAULT_WIDTH = 300;
const MAX_DOTS = 14;

interface ISlider {
  images: Array<any>;
  arrows: boolean;
  navDots: boolean;
  numberOfDots: number;
  imgFit: Property.ObjectFit;
  imageHeight: number;
  imageWidth: number;
  transition: number;
}

interface IMouseStats {
  offset: number;
  initialX: number;
  initialOffset: number;
}

export function Slider(props: ISlider): JSX.Element {
  const { images, arrows, navDots, numberOfDots, imgFit, imageHeight, transition, imageWidth = DEFAULT_WIDTH } = props;
  const totalWith = imageWidth * images.length;
  const sliderContainer = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [activeClass, setActiveClass] = useState(0);
  const [btnOpcatity, setBtnOpcaticy] = useState(0);
  const [clickedClassPrev, setClickedClassPrev] = useState(false);
  const [clickedClassNext, setClickedClassNext] = useState(false);
  const [navDynamic, setNavDynamic] = useState<Array<number>>([]);
  const [navActive, setNavActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const mouseStatsRef = useRef<IMouseStats>({
    offset: 0,
    initialX: 0,
    initialOffset: 0,
  });
  const transitionCss = {
    transition: transition ? '' : `transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275`,
  };

  useEffect(() => {
    if (images) {
      const dotsDynamicCalc = (numOfSlides: number, maxDots = MAX_DOTS) => {
        const dotIndex: Array<number> = [];
        if (numOfSlides > maxDots) {
          const fraction = numOfSlides / maxDots;
          for (let i = 1; i < maxDots; i++) {
            dotIndex.push(Math.ceil(fraction * i));
          }
          setNavDynamic([0, ...dotIndex]);
        } else {
          for (let i = 0; i < numOfSlides; i++) {
            dotIndex.push(i);
          }
          setNavDynamic([...dotIndex]);
        }
      };
      dotsDynamicCalc(images.length, numberOfDots);
    }
  }, [images, numberOfDots]);

  const setToCurrent = () => {
    if (sliderContainer.current?.style && !sliderContainer.current?.style.transform) {
      sliderContainer.current.style.transform = `translateX(-${(totalWith / images.length) * currentImg}px)`;
    }
  };

  useEffect(() => {
    mouseStatsRef.current.offset = -currentImg * imageWidth;
    setActiveClass(currentImg);
    if (navDynamic) {
      const ifMatch = navDynamic.indexOf(currentImg);
      if (ifMatch !== -1) setNavActive(ifMatch);
    }
  }, [currentImg, imageWidth, navDynamic]);

  const onClickHandler = (e) => {
    const curAtrb = e.target.getAttribute('data-desc');
    if (curAtrb === 'prev') {
      if (currentImg === 0) {
        setCurrentImg(images.length - 1);
      } else setCurrentImg(currentImg - 1);
      setClickedClassPrev(true);
    }
    if (curAtrb === 'next' || !arrows) {
      if (currentImg === images.length - 1) {
        setCurrentImg(0);
      } else setCurrentImg(currentImg + 1);
      setClickedClassNext(true);
    }
  };

  const onDotClickHandler = (e) => {
    const index = Number(e.target.getAttribute('data-val'));
    setCurrentImg(index);
  };

  const enterHandler = () => {
    setBtnOpcaticy(1);
  };

  const leaveHandler = () => {
    setIsDown(false);
    setBtnOpcaticy(0);
    setToCurrent();
  };

  const dragHandler = (e) => {
    if (!isDown) {
      return;
    }
    const currentOffset = e.clientX - mouseStatsRef.current.initialX;

    mouseStatsRef.current.initialX = e.clientX;
    mouseStatsRef.current.offset += currentOffset;

    if (sliderContainer.current?.style) {
      sliderContainer.current.style.transform = `translateX(${mouseStatsRef.current.offset}px)`;
    }

    const activeClassCalc = -Math.floor(mouseStatsRef.current.offset / imageWidth);

    if (activeClassCalc < 0) {
      setActiveClass(0);
    } else if (activeClassCalc > images.length - 1) {
      setActiveClass(images.length - 1);
    } else {
      setActiveClass(activeClassCalc);
    }
  };

  const mouseDownHandler = (e) => {
    if (e.target.getAttribute('data-desc')) return;
    setIsDown(true);
    mouseStatsRef.current.initialX = e.clientX;
    mouseStatsRef.current.initialOffset = mouseStatsRef.current.offset;
  };

  const mouseUpHandler = (e) => {
    setCurrentImg(activeClass);

    setIsDown(false);
    setToCurrent();
  };

  return (
    <div className={styles.SliderNavDotsWrapper}>
      <div
        className={styles.Slider}
        onMouseEnter={enterHandler}
        onMouseLeave={leaveHandler}
        onMouseDown={mouseDownHandler}
        onMouseMove={dragHandler}
        onMouseUp={mouseUpHandler}
      >
        <div
          ref={sliderContainer}
          className={styles.Images}
          style={{
            transform: `translateX(-${(totalWith / images.length) * currentImg}px)`,
            transition: `${!isDown ? transitionCss.transition : null}`,
          }}
        >
          {images &&
            images.map((image, index) => (
              <div
                className={index === activeClass ? styles.Active : ''}
                key={index}
                onClick={!arrows ? onClickHandler : undefined}
                style={{ width: imageWidth, height: imageHeight || '' }}
              >
                <img draggable='false' src={image} alt='screenshot' style={{ objectFit: imgFit || 'cover' }}></img>
              </div>
            ))}
        </div>
        {arrows && (
          <>
            <button
              style={{
                opacity: btnOpcatity ? '1' : '',
                display: isDown ? 'none' : 'block',
              }}
              className={`${styles.PrevButton} ${styles.Btn}`}
              data-desc='prev'
              onClick={onClickHandler}
            >
              <img
                src={sliderArrow}
                alt='arrowImg'
                data-desc='prev'
                onAnimationEnd={() => setClickedClassPrev(false)}
                className={clickedClassPrev ? styles.BtnClicked : ''}
              />
            </button>
            <button
              style={{
                opacity: btnOpcatity ? '1' : '',
                display: isDown ? 'none' : 'block',
              }}
              className={`${styles.NextButton} ${styles.Btn}`}
              data-desc='next'
              onClick={onClickHandler}
            >
              <img
                src={sliderArrow}
                alt='arrowImg'
                data-desc='next'
                style={{ transform: `rotate(180deg)` }}
                onAnimationEnd={() => setClickedClassNext(false)}
                className={clickedClassNext ? styles.BtnClicked180 : ''}
              />
            </button>
          </>
        )}
      </div>
      {navDots && (
        <div className={styles.NavDotsContainer}>
          {navDynamic &&
            navDynamic.map((val, index) => (
              <div
                key={index}
                className={`${styles.NavDot} 
                ${index === navActive ? styles.ActiveDot : null}`}
                data-val={val}
                onClick={onDotClickHandler}
              ></div>
            ))}
        </div>
      )}
    </div>
  );
}
