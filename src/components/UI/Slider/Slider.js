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
  const [sliderDimensions, setSliderDimenstions] = useState();
  const [initialX, setInitialX] = useState();
  const [leftShift, setLeftShift] = useState(0);
  const [walk, setWalk] = useState(0);

  useEffect(() => {
    setSliderDimenstions(sliderContainer.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    // console.log(leftShift);
  }, [leftShift]);

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
  };

  const enterHandler = () => {
    setBtnOpcaticy(1);
  };

  const leaveHandler = () => {
    if (
      leftShift >
      sliderDimensions.width - sliderDimensions.width / images.length
    ) {
      console.log('bigger');
      setLeftShift(
        sliderDimensions.width - 2 * (sliderDimensions.width / images.length)
      );
    }
    if (leftShift < -sliderDimensions.width / images.length / 2) {
      console.log('here');
      setLeftShift(0);
    }

    setIsDown(false);
    setBtnOpcaticy(0);
  };
  const throttle = _.throttle(function(e) {
    console.log(e.pageX);
    let cur = e.pageX;
    let curShift = cur - initialX;
    console.log({ leftShift, curShift, initialX });

    setLeftShift(leftShift - curShift / 50);
  }, 10000);

  const dragHandler = e => {
    if (e.target.tagName !== 'BUTTON') {
      if (e.type === 'mousedown') {
        console.log(e.target.tagName, 'down');
        setInitialX(e.pageX);
        setIsDown(true);
      }
      if (e.type === 'mouseup') {
        console.log('up');
        setIsDown(false);
        if (leftShift < -sliderDimensions.width / images.length / 2) {
          console.log('here');
          setLeftShift(0);
        }
        if (
          leftShift >
          sliderDimensions.width - 2 * (sliderDimensions.width / images.length)
        ) {
          console.log('bigger');
          setLeftShift(
            sliderDimensions.width -
              2 * (sliderDimensions.width / images.length)
          );
        }
      }

      if (e.type === 'mousemove' && isDown) {
        throttle(e);
      }
    }
  };

  return (
    <div
      className={styles.Slider}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      onMouseDown={dragHandler}
      onMouseMove={dragHandler}
      onMouseUp={dragHandler}>
      <div
        ref={sliderContainer}
        className={styles.Images}
        style={{
          transform: `translateX(-${currentImg * (100 / images.length)}%)`
          // transform: `translateX(${-leftShift}px)`
          // left: -diffX * 3
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
