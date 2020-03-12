import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.css';

export default function Slider(props) {
  const { images } = props;
  const sliderContainer = useRef();
  const [currentImg, setCurrentImg] = useState(0);
  const [btnOpcatity, setBtnOpcaticy] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [sliderDimensions, setSliderDimenstions] = useState();
  const [initialX, setInitialX] = useState();
  const [diffX, setdiffX] = useState();

  useEffect(() => {
    setSliderDimenstions(sliderContainer.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (Math.abs(diffX) > 40) {
    }
  }, [diffX]);

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
    setIsDown(false);
    setBtnOpcaticy(0);
  };

  const dragHandler = e => {
    if (e.type === 'mousedown') {
      if (sliderDimensions) {
        setInitialX(e.pageX - sliderDimensions.x);
        setIsDown(true);
        console.log(initialX);
      }
    }
    if (e.type === 'mouseup') setIsDown(false);
    if (e.type === 'mousemove' && isDown && sliderDimensions) {
      e.preventDefault();
      // setdiffX(initialX - (e.pageX - sliderDimensions.x));
    }
    console.log(
      e.type,
      isDown,
      initialX,
      diffX,
      sliderContainer.current.scrollLeft
    );
  };

  return (
    <div
      ref={sliderContainer}
      className={styles.Slider}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}>
      <div
        onMouseDown={dragHandler}
        onMouseMove={dragHandler}
        onMouseUp={dragHandler}
        className={styles.Images}
        style={{
          // transform: `translateX(-${currentImg * (100 / images.length)}%)`
          transform: `translateX(-${diffX}px)`
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
