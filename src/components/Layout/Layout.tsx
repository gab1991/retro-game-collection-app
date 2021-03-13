import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { AuthModal, Header } from 'Components';

import { CornerNotifier, ErrorModal, InfoModal } from 'Components/UI/Modals';
import {
  selectAuthModalShowState,
  selectCornerNotifier,
  selectErrorModal,
  selectInfoModal,
} from 'Store/appStateReducer/selectors';

import styles from './Layout.module.scss';

interface ILayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: ILayoutProps): JSX.Element {
  const showAuth = useSelector(selectAuthModalShowState);
  const { show: showErr, ...restErrModalProps } = useSelector(selectErrorModal);
  const { show: showInfo, ...restInfoModalProps } = useSelector(selectInfoModal);
  const { show: showCornNotifier, ...restCornNotifierProps } = useSelector(selectCornerNotifier);

  return (
    <div className={styles.Layout}>
      <Header />
      <main>{children}</main>
      <footer className={styles.Footer}>
        <p>
          <a href='https://rawg.io/' rel='noopener noreferrer' target='_blank'>
            RAWG
          </a>
          {'  is the source of the data and screenshots / boxarts are provided by '}
          <a href='https://emumovies.com/' rel='noopener noreferrer' target='_blank'>
            emumovies.com
          </a>
        </p>
      </footer>
      {/* {showAuth && <AuthModal />} */}
      <AuthModal />
      {showErr && <ErrorModal {...restErrModalProps} />}
      {showInfo && <InfoModal {...restInfoModalProps} />}
      <CornerNotifier show={showCornNotifier} {...restCornNotifierProps} />
    </div>
  );
}
