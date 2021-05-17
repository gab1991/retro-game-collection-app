import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ButtonNeon } from 'Components/UI';
import { hideCornerNotifier } from 'Store/appStateReducer/actions';

import styles from './CornerNotifier.module.scss';

export enum ECornerNotifierCorners {
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
  topLeft = 'topLeft ',
  topRight = 'topRight',
}

export interface ICornerNotifierProps {
  btnText?: string;
  corner?: ECornerNotifierCorners;
  linkDir?: string;
  linkText?: string;
  message?: string;
  onCancelClickCb?: () => void;
  removeTime?: number;
  show: boolean;
}

export function CornerNotifier(props: ICornerNotifierProps): JSX.Element {
  const {
    message,
    linkText,
    linkDir,
    btnText,
    onCancelClickCb,
    corner = ECornerNotifierCorners.bottomLeft,
    removeTime,
    show,
  } = props;
  const [showing, setShowing] = useState(false);
  const [grabbed, setGrabbed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowing(show);
  }, [show]);

  useEffect(() => {
    if (removeTime && show) {
      const interval = setTimeout(() => {
        setShowing(false);
        dispatch(hideCornerNotifier());
      }, removeTime);
      return () => clearInterval(interval);
    }
  }, [removeTime, show, dispatch]);

  const hide = () => {
    setShowing(false);
    setGrabbed(false);
  };

  const grab = (bool: boolean) => setGrabbed(bool);

  const onBtnClick = () => {
    onCancelClickCb && onCancelClickCb();
    hide();
  };

  return (
    <div
      className={cn(styles.CornerNotifier, styles[corner], { [styles.Showing]: showing || grabbed })}
      onMouseEnter={() => grab(true)}
      onMouseLeave={() => grab(false)}
    >
      <p>
        {message}
        {linkDir && <Link to={linkDir}>{linkText}</Link>}
        {btnText && <ButtonNeon txtContent={btnText} color='red' onClick={onBtnClick} />}
      </p>
    </div>
  );
}
