import React from 'react';
import styles from './Layout.module.scss';
import { connect } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import AuthModal from '../AuthModal/AuthModal';
import Background from '../UI/Background/Background';
import ErrorModal from '../../components/UI/Modals/ErrorModal/ErrorModal';

function Layout(props) {
  const { showAuth, showErr } = props;

  return (
    <div className={styles.Layout}>
      <Navigation />
      {props.children}
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    showAuth: state.showAuth,
    showErr: state.showErr,
  };
}

export default connect(mapStateToProps)(Layout);
