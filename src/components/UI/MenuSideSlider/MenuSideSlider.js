import React from 'react';
import styles from './MenuSideSlider.module.scss';

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
        {list.map(({ option, onClick }) => {
          if (!option) return null;
          return (
            <li key={option} onClick={onClick}>
              <span></span>
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
