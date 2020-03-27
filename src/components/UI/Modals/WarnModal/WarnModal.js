import React from 'react';
import styles from './WarnModal.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import ButtonNeon from '../../../UI/Buttons/ButtonNeon/ButtonNeon';
import warnicon from '../../../../assets/images/ui/warning.svg';

export default function WarnModal(props) {
  const { message, onBackdropClick, onYesClick, onNoClick } = props;

  return (
    <div className={styles.WarnModal}>
      <Backdrop onClick={onBackdropClick} closeIcon={true} show />
      <div className={styles.WarnWindow}>
        <div className={styles.TxtWrapper}>
          <div className={styles.ImgContainer}>
            <img src={warnicon} alt="warning"></img>
          </div>
          <h2>{message}</h2>
        </div>

        <div className={styles.ButtonSection}>
          <ButtonNeon txtContent={'YES'} rectangular onClick={onYesClick} />
          <ButtonNeon txtContent={'NO'} rectangular onClick={onNoClick} />
        </div>
      </div>
    </div>
  );
}
