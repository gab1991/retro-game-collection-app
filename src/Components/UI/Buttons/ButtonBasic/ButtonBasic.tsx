import React from 'react';

import styles from './ButtonBasic.module.scss';

export interface IButtonBasic {
  name?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  txtContent: string;
}

export function ButtonBasic(props: IButtonBasic): JSX.Element {
  const { txtContent, onClick, name } = props;

  return (
    <button name={name} onClick={onClick} className={`${styles.ButtonBasic}`}>
      {txtContent}
    </button>
  );
}
