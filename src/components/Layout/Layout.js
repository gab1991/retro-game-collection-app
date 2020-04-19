import React from 'react';
import styles from './Layout.module.scss';
import { useDispatch, connect } from 'react-redux';
import { showAuthModal } from '../../actions/actions';
import Navigation from '../Navigation/Navigation';
import AuthModal from '../AuthModal/AuthModal';

function Layout(props) {
  const { showAuth } = props;
  const dispatch = useDispatch();

  const handleAuth = () => {
    dispatch(showAuthModal(true));
  };

  return (
    <div className={styles.Layout}>
      <Navigation />
      {props.children}
      <footer className={styles.Footer}>
        <button onClick={handleAuth}>asd</button>
        <p>
          <a href="https://rawg.io/" target="_blank">
            RAWG
          </a>
          {
            '  is the source of the data and screenshots / boxarts are provided by '
          }
          <a href="https://emumovies.com/" target="_blank">
            emumovies.com
          </a>
        </p>
      </footer>
      {showAuth && <AuthModal />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    showAuth: state.showAuth,
  };
}

export default connect(mapStateToProps)(Layout);
