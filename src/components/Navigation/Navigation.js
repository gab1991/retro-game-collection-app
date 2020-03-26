import React, { useState } from 'react';
import styles from './Navigation.css';
import { withRouter } from 'react-router-dom';
import Backdrop from '../UI/Backdrop/Backdrop';
import MenuSideSlider from '../UI/MenuSideSlider/MenuSideSlider';

function Navigation(props) {
  const [showMenuSlider, setShowMenuSlider] = useState(false);
  const [showProfileSlider, setProfileSlider] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const toggleMenuSlider = () => {
    if (showProfileSlider) {
      setShowBackdrop(true);
      setProfileSlider(false);
    } else {
      setShowBackdrop(prevState => !prevState);
    }
    setShowMenuSlider(prevState => !prevState);
  };

  const toggleProfileSlider = () => {
    if (showMenuSlider) {
      setShowBackdrop(true);
      setShowMenuSlider(false);
    } else {
      setShowBackdrop(prevState => !prevState);
    }
    setProfileSlider(prevState => !prevState);
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

  const toProfileMobile = () => {
    props.history.push('/profile');
    toggleProfileSlider();
  };

  return (
    <>
      <Backdrop onClick={hideMenu} show={showBackdrop} />
      <div className={styles.Navigation}>
        <nav>
          <ul>
            <li onClick={toggleMenuSlider}>MENU</li>
            <MenuSideSlider
              slideLeft
              show={showMenuSlider}
              list={[
                { option: 'Select Platform', onclick: toPlatformSelector }
              ]}
            />
            <li onClick={toggleProfileSlider} className={styles.ProfileMobile}>
              PROFILE
            </li>
            <MenuSideSlider
              slideRight
              show={showProfileSlider}
              list={[{ option: 'My Colletion', onclick: toProfileMobile }]}
            />
            <li onClick={toProfile} className={styles.ProfileDesctop}>
              PROFILE
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default withRouter(Navigation);
