import React from 'react';
import styles from './InfoModal.module.scss';
import InfoSvg from '../../LogoSvg/InfoSvg/InfoSvg';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import ButtonNeon from '../../../UI/Buttons/ButtonNeon/ButtonNeon';

export default function InfoModal(props) {
  const { message, btnTxtContent = 'OK', onBackdropClick, onBtnClick } = props;

  return (
    <div className={styles.InfoModal}>
      <Backdrop onClick={onBackdropClick} closeIcon={true} show />
      <div className={styles.InfoModalMain}>
        <div className={styles.InfoSvgContainer}>
          <InfoSvg />
        </div>
        <div className={styles.MessageSection}>
          <p>{message}</p>
          <ButtonNeon
            txtContent={btnTxtContent}
            onClick={onBtnClick}
            color={'red'}
          />
        </div>
      </div>
    </div>
  );
}
