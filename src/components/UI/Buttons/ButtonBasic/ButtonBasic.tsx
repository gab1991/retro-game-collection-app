import React from 'react';

import styles from './ButtonBasic.module.scss';

export interface IButtonBasic {
  txtContent: string;
  onClick?: () => void;
  name?: string;
}

export function ButtonBasic(props: IButtonBasic): JSX.Element {
  const { txtContent, onClick, name } = props;

  return (
    <button name={name} onClick={onClick} className={`${styles.ButtonBasic}`}>
      {txtContent}
    </button>
  );
}
