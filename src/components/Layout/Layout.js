import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import AuthModal from '../AuthModal/AuthModal';
import Background from '../UI/Background/Background';
import ErrorModal from '../../Components/UI/Modals/ErrorModal/ErrorModal';
import InfoModal from '../../Components/UI/Modals/InfoModal/InfoModal';
import CornerNotifier from '../UI/Modals/CornerNotifier/CornerNotifier';
import styles from './Layout.module.scss';

function Layout(props) {
  const { showAuth, showErr, showInfo, showCornNotifier } = props;

  return (
    <div className={styles.Layout}>
      <Header />
      <main> {props.children}</main>
      <footer className={styles.Footer}>
        <p>
          <a href="https://rawg.io/" rel="noopener noreferrer" target="_blank">
            RAWG
          </a>
          {
            '  is the source of the data and screenshots / boxarts are provided by '
          }
          <a
            href="https://emumovies.com/"
            rel="noopener noreferrer"
            target="_blank">
            emumovies.com
          </a>
        </p>
      </footer>
      <Background />
      {showAuth && <AuthModal />}
      {showErr && <ErrorModal {...showErr} />}
      {showInfo && <InfoModal {...showInfo} />}
      {showCornNotifier && <CornerNotifier {...showCornNotifier} />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    showAuth: state.showAuth,
    showErr: state.showErr,
    showInfo: state.showInfo,
    showCornNotifier: state.showCornNotifier,
  };
}

export default connect(mapStateToProps)(Layout);
