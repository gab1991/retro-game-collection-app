import React, { useState, useEffect } from 'react';
import styles from './CornerNotifier.css';
import { Link } from 'react-router-dom';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import ButtonNeon from '../../../UI/Buttons/ButtonNeon/ButtonNeon';

export default function CornerNotifier(props) {
  const {
    message,
    linkText,
    linkDir,
    btnText,
    onCancelClick,
    corner,
    show
  } = props;
  const [showing, setShowing] = useState();
  const [grabbed, setGrabbed] = useState();

  useEffect(() => {
    setShowing(show);
  }, [show]);

  const hide = () => {
    setShowing(false);
    setGrabbed(false);
  };

  const grab = val => {
    setGrabbed(val);
  };

  return (
    <div
      className={`${styles.CornerNotifier} ${styles[corner]}  ${
        showing ? styles.Showing : null
      } ${grabbed ? styles.Showing : null}`}
      onMouseEnter={() => grab(true)}
      onMouseLeave={() => grab(false)}>
      <p>
        {message}
        {linkDir && <Link to={linkDir}>{linkText}</Link>}
        <ButtonNeon
          txtContent={btnText}
          color="red"
          onClick={() => {
            onCancelClick();
            hide();
          }}
        />
      </p>
    </div>
  );
}
