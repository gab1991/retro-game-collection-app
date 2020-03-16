import React from 'react';
import styles from './Navigation.css';
import { withRouter } from 'react-router-dom';

function Navigation(props) {
  console.log(props);
  return (
    <div className={styles.Navigation}>
      <nav>
        <ul>
          <li>MENU</li>
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
