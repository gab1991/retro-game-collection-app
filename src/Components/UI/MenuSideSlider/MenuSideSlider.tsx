import React from 'react';
import cx from 'classnames';

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
      className={cx(styles.MenuSlider, {
        [styles.MenuSliderLeft]: side === EMenuSliderSides.left,
        [styles.MenuSliderRight]: side === EMenuSliderSides.right,
        [styles.SlideRight]: show && side === EMenuSliderSides.left,
        [styles.SlideLeft]: show && side === EMenuSliderSides.right,
      })}
    >
      {list.map(({ option, onClick }) => {
        if (!option) {
          return null;
        }
        return (
          <li key={option} onClick={onClick} onKeyPress={onClick} role='treeitem'>
            {option}
          </li>
        );
      })}
    </ul>
  );
}
