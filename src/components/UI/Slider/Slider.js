import React, { useState } from 'react';
import styles from './Slider.css';

export default function Slider(props) {
  const { images } = props;
  const [x, setX] = useState();
  const [currentImg, setCurrentImg] = useState(3);

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

  return (
    <div className={styles.Slider}>
      <div
        className={styles.Images}
        style={{
          transform: `translateX(-${currentImg * (100 / images.length)}%)`
        }}>
        {images &&
          images.map((image, index) => (
            <div
              className={index === currentImg ? styles.Active : null}
              key={index}>
              {index}
            </div>
          ))}
      </div>
      <button desc="prev" onClick={onClickHandler} style={{ left: 10 }}>
        {'<'}
      </button>
      <button desc="next" onClick={onClickHandler} style={{ left: 20 }}>
        {'>'}
      </button>
    </div>
  );
}
