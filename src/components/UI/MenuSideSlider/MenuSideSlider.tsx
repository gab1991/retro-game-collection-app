import React from 'react';

import styles from './MenuSideSlider.module.scss';

interface IMenuSideSliderProps {
  slideLeft: boolean;
  slideRight: boolean;
  show: boolean;
  list: Array<IMenuSideSliderList>;
}

interface IMenuSideSliderList {
  option: string;
  onClick: () => void;
}
export function MenuSideSlider(props: IMenuSideSliderProps): JSX.Element {
  const { slideLeft, slideRight, show, list } = props;

  return (
    <ul
      className={`
    ${styles.MenuSlider} 
    ${slideLeft && styles.MenuSliderLeft} 
    ${slideRight && styles.MenuSliderRight} 
    ${show && slideLeft && styles.SlideLeft} 
    ${show && slideRight && styles.SlideRight}`}
    >
      {list.map(({ option, onClick }) => {
        if (!option) return null;
        return (
          <li key={option} onClick={onClick} onKeyPress={onClick} role='treeitem'>
            {option}
          </li>
        );
      })}
    </ul>
  );
}
