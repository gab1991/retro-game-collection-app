import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { logOut, showAuthModal } from '../../actions/actions';
import Backdrop from '../UI/Backdrop/Backdrop';
import MenuSideSlider from '../UI/MenuSideSlider/MenuSideSlider';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';
import styles from './Navigation.module.scss';

function Navigation(props) {
  const { userData } = props;
  const [showMenuSlider, setShowMenuSlider] = useState(false);
  const [showProfileSlider, setProfileSlider] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const dispatch = useDispatch();

  const toggleMenuSlider = () => {
    if (showProfileSlider) {
      setShowBackdrop(true);
      setProfileSlider(false);
    } else {
      setShowBackdrop((prevState) => !prevState);
    }
    setShowMenuSlider((prevState) => !prevState);
  };

  const hideMenu = () => {
    setShowMenuSlider(false);
    setProfileSlider(false);
    setShowBackdrop(false);
  };

  const toPlatformSelector = () => {
    props.history.push('/');
    toggleMenuSlider();
  };

  const toProfile = () => {
    props.history.push('/profile');
  };

  const loggingOut = () => {
    toPlatformSelector();
    hideMenu();
    localStorage.removeItem('token');
    dispatch(logOut());
  };

  const showAuth = () => {
    dispatch(showAuthModal(true));
  };

  return (
    <>
      <Backdrop onClick={hideMenu} show={showBackdrop} />
      <nav className={styles.Navigation}>
        <ul>
          <li onClick={toggleMenuSlider}>MENU</li>
          <MenuSideSlider
            slideLeft
            show={showMenuSlider}
            list={[
              { option: 'SELECT PLATFORM', onClick: toPlatformSelector },
              userData && { option: 'LOG OUT', onClick: loggingOut },
            ]}
          />
          {userData && (
            <li onClick={toProfile} className={styles.ProfileDesctop}>
              PROFILE
            </li>
          )}
          {!userData && (
            <div className={styles.BtnSection}>
              <ButtonNeon
                txtContent="Login"
                color={'green'}
                rectangular
                onClick={showAuth}
              />
            </div>
          )}
        </ul>
      </nav>
    </>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile,
  };
}
export default connect(mapStateToProps)(withRouter(Navigation));
