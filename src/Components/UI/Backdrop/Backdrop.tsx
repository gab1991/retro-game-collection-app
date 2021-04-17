import React from 'react';

import styles from './Backdrop.module.scss';

interface IBackdropProps {
  onClick?: () => void;
  show: boolean;
}

export function Backdrop(props: IBackdropProps): JSX.Element {
  const { show, onClick } = props;

  return (
    <div
      onClick={onClick}
      onKeyPress={onClick}
      className={styles.Backdrop}
      style={{ display: `${show ? 'block' : 'none'}` }}
      role='button'
      tabIndex={0}
    ></div>
  );
}
