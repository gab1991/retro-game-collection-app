import React, { useState } from 'react';
import styles from './Navigation.css';
import { withRouter } from 'react-router-dom';

function Navigation(props) {
  const [showMenuSlider, setShowMenuSlider] = useState(false);

  const toggleMenuSlider = () => {
    setShowMenuSlider(prevState => !prevState);
  };

  const toPlatformSelector = () => {
    props.history.push('/');
  };

  return (
    <div className={styles.Navigation}>
      <nav>
        <ul>
          <li onClick={toggleMenuSlider}>MENU</li>
          <div
            className={`${styles.MenuSlider} ${showMenuSlider &&
              styles.Active}`}
            onMouseLeave={toggleMenuSlider}>
            <ul>
              <li onClick={toPlatformSelector}>
                <span></span>
                Select Platform
              </li>
            </ul>
          </div>
          <li
            onClick={() => {
              props.history.push('/profile');
            }}>
            PROFILE
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default withRouter(Navigation);
