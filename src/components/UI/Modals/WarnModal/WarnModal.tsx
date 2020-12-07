import React from 'react';

import warnicon from '../../../../Assets/images/ui/warning.svg';
import { Backdrop, ButtonNeon } from 'Components/UI';

import styles from './WarnModal.module.scss';

interface IWarnModal {
  message: string;
  onBackdropClick: () => void;
  onYesClick: () => void;
  onNoClick: () => void;
}

export function WarnModal(props: IWarnModal): JSX.Element {
  const { message, onBackdropClick, onYesClick, onNoClick } = props;

  return (
    <div className={styles.WarnModal}>
      <Backdrop onClick={onBackdropClick} show />
      <div className={styles.WarnWindow}>
        <div className={styles.TxtWrapper}>
          <div className={styles.ImgContainer}>
            <img src={warnicon} alt='warning'></img>
          </div>
          <p>{message}</p>
        </div>

        <div className={styles.ButtonSection}>
          <ButtonNeon txtContent={'YES'} rectangular onClick={onYesClick} />
          <ButtonNeon txtContent={'NO'} rectangular onClick={onNoClick} />
        </div>
      </div>
    </div>
  );
}
