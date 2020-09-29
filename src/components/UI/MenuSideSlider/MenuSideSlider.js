import React from 'react';
import styles from './MenuSideSlider.module.scss';

export default function MenuSideSlider(props) {
  const { slideLeft, slideRight, show, list } = props;

  return (
    <ul
      className={`
    ${styles.MenuSlider} 
    ${slideLeft && styles.MenuSliderLeft} 
    ${slideRight && styles.MenuSliderRight} 
    ${show && slideLeft && styles.SlideLeft} 
    ${show && slideRight && styles.SlideRight}`}>
      {list.map(({ option, onClick }) => {
        if (!option) return null;
        return (
          <li key={option} onClick={onClick}>
            {option}
          </li>
        );
      })}
    </ul>
  );
}
