import React from 'react';
import { useDispatch } from 'react-redux';

import { Backdrop, ButtonNeon } from 'Components/UI';
import { FailureSvg } from 'Components/UI/LogoSvg';
import { hideErrModal } from 'Store/appStateReducer/actions';

import styles from './ErrorModal.module.scss';

export interface IErrorModalProps {
  btnTxtContent?: string;
  message?: string;
  onBackdropClick?: () => void;
  onBtnClick?: () => void;
}

export function ErrorModal(props: IErrorModalProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    message,
    btnTxtContent = 'OK',
    onBackdropClick = () => {
      dispatch(hideErrModal());
    },
    onBtnClick = () => {
      dispatch(hideErrModal());
    },
  } = props;

  return (
    <div className={styles.ErrorModal}>
      <Backdrop onClick={onBackdropClick} show />
      <div className={styles.ErrorModalMain}>
        <div className={styles.ErrorSvgContainer}>
          <FailureSvg />
        </div>
        <div className={styles.MessageSection}>
          <p>{message}</p>
          <ButtonNeon txtContent={btnTxtContent} onClick={onBtnClick} color={'red'} />
        </div>
      </div>
    </div>
  );
}
