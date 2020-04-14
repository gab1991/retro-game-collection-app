import React from 'react';
import styles from './ErrorModal.module.scss';
import FailureSvg from '../../LogoSvg/FailureSvg/FailureSvg';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import ButtonNeon from '../../../UI/Buttons/ButtonNeon/ButtonNeon';

export default function ErrorModal(props) {
  const { message, btnTxtContent = 'OK', onBackdropClick, onBtnClick } = props;

  return (
    <div className={styles.ErrorModal}>
      <Backdrop onClick={onBackdropClick} closeIcon={true} show />
      <div className={styles.ErrorModalMain}>
        <div className={styles.ErrorSvgContainer}>
          <FailureSvg />
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
