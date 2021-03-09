import React from 'react';

import styles from './MenuSideSlider.module.scss';

export enum EMenuSliderSides {
  left,
  right,
}

interface IMenuSideSliderProps {
  list: Array<IMenuSideSliderList>;
  show: boolean;
  side?: EMenuSliderSides;
}

interface IMenuSideSliderList {
  onClick: () => void;
  option: string;
}
export function MenuSideSlider(props: IMenuSideSliderProps): JSX.Element {
  const { side = EMenuSliderSides.left, show, list } = props;

  return (
    <ul
      className={`
    ${styles.MenuSlider} 
    ${side === EMenuSliderSides.left ? styles.MenuSliderLeft : styles.MenuSliderRight} 
    ${show && (side === EMenuSliderSides.left ? styles.SlideRight : styles.SlideLeft)}
     `}
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
