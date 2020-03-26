import React from 'react';
import styles from './MenuSideSlider.css';

export default function MenuSideSlider(props) {
  const { slideLeft, slideRight, show, list } = props;

  return (
    <div
      className={`
    ${styles.MenuSlider} 
    ${slideLeft && styles.MenuSliderLeft} 
    ${slideRight && styles.MenuSliderRight} 
    ${show && slideLeft && styles.SlideLeft} 
    ${show && slideRight && styles.SlideRight}`}>
      <ul>
        {list.map(item => (
          <li onClick={item.onclick}>
            <span></span>
            {item.option}
          </li>
        ))}
      </ul>
    </div>
  );
}
